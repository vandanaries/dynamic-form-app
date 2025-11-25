import { Injectable } from "@angular/core";
import { FormField, ValidationRule, FieldError } from "../models/form.model";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  validateField(field: FormField, value: any): string | null {
    // Check required
    if (field.required && this.isEmpty(value)) {
      return `${field.label} is required`;
    }

    // Skip further validation if field is empty and not required
    if (this.isEmpty(value) && !field.required) {
      return null;
    }

    // Check validation rules
    if (field.validation) {
      const error = this.validateWithRules(field, value, field.validation);
      if (error) return error;
    }

    return null;
  }

  private isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    return false;
  }

  private validateWithRules(
    field: FormField,
    value: any,
    rules: ValidationRule
  ): string | null {
    // Pattern validation (regex)
    if (rules.pattern) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(String(value))) {
        return rules.message || `${field.label} format is invalid`;
      }
    }

    // Min/Max length for strings
    if (typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        return `${field.label} must be at least ${rules.minLength} characters`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${field.label} must not exceed ${rules.maxLength} characters`;
      }
    }

    // Min/Max for numbers
    if (typeof value === "number") {
      if (rules.min !== undefined && value < rules.min) {
        return `${field.label} must be at least ${rules.min}`;
      }
      if (rules.max !== undefined && value > rules.max) {
        return `${field.label} must not exceed ${rules.max}`;
      }
    }

    return null;
  }

  validateForm(fields: FormField[], formData: any): FieldError {
    const errors: FieldError = {};

    fields.forEach((field) => {
      const error = this.validateField(field, formData[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });

    return errors;
  }
}
