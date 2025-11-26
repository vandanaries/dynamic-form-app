import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  FormSchema,
  FormValue,
  FieldError,
  FormField,
} from "../../models/form.model";
import { ValidationService } from "../../services/validation.service";
import { FormFieldComponent } from "../form-field/form-field.component";

@Component({
  selector: "app-form-renderer",
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent],
  templateUrl: "./form-renderer.component.html",
  styleUrls: ["./form-renderer.component.scss"],
})
export class FormRendererComponent {
  @Input() schema!: FormSchema;
  @Output() onSubmit = new EventEmitter<FormValue>();

  formData: FormValue = {};
  errors: FieldError = {};
  submitted = false;

  constructor(private validationService: ValidationService) {}

  ngOnInit() {
    this.initializeFormData();
  }

  initializeFormData() {
    this.formData = {};
    this.errors = {};
    this.submitted = false;

    if (this.schema && this.schema.fields) {
      this.schema.fields.forEach((field) => {
        if (field.type === "checkbox") {
          this.formData[field.name] = false;
        } else if (field.type === "multiselect") {
          this.formData[field.name] = [];
        } else {
          this.formData[field.name] = "";
        }
      });
    }
  }

  onFieldChange(fieldName: string, value: any) {
    this.formData[fieldName] = value;

    // Clear error for this field when user modifies it
    if (this.errors[fieldName]) {
      delete this.errors[fieldName];
    }
  }

  /**
   * Validates a form field when it loses focus.
   * Runs only after submission and updates the errors object.
   */
  onFieldBlur(fieldName: string) {
    if (this.submitted) {
      const field = this.schema.fields.find((f) => f.name === fieldName);
      if (field) {
        const error = this.validationService.validateField(
          field,
          this.formData[fieldName]
        );
        if (error) {
          this.errors[fieldName] = error;
        }
      }
    }
  }

  submitForm() {
    this.submitted = true;
    this.errors = this.validationService.validateForm(
      this.schema.fields,
      this.formData
    );

    if (Object.keys(this.errors).length === 0) {
      const submittedData = this.prepareSubmitData();
      console.log("Form Submission Successful:", submittedData);
      this.onSubmit.emit(submittedData);
      this.resetForm();
    } else {
      console.log("Form has validation errors:", this.errors);
    }
  }

  /**
   * Builds a cleaned submission payload from form data.
   * This avoids sending unnecessary empty fields to the backend.
   *
   * @returns FormValue object containing validated submission data.
   */
  private prepareSubmitData(): FormValue {
    const data: FormValue = {};
    this.schema.fields.forEach((field) => {
      const value = this.formData[field.name];
      // Only include non-empty values
      if (field.type === "checkbox") {
        data[field.name] = value;
      } else if (field.type === "multiselect") {
        if (Array.isArray(value) && value.length > 0) {
          data[field.name] = value;
        }
      } else if (value) {
        data[field.name] = value;
      }
    });
    return data;
  }

  resetForm() {
    this.initializeFormData();
  }

  /**
   * Determines which form fields should be rendered based on schema rules and current form data.
   *
   * Logic flow:
   * 1. Excludes fields explicitly marked as `hidden`.
   * 2. Includes fields without any conditional rules.
   * 3. Evaluates compound conditions:
   *    - `all`: field is visible only if all specified conditions are satisfied (logical AND).
   *    - `any`: field is visible if at least one condition is satisfied (logical OR).
   * 4. Evaluates simple condition: { field, value } → visible if the target field matches the expected value.
   *
   */
  getVisibleFields() {
    const visibleFields = this.schema.fields.filter((field) => {
      // 1. If explicitly hidden → never show
      if (field.hidden) {
        return false;
      }

      // 2. If no conditional rule → always show
      if (!field.conditional) {
        return true;
      }

      // 3. Compound conditional: support "all" and "any"
      if (field.conditional.all) {
        return field.conditional.all.every(
          (cond) => this.formData[cond.field] === cond.value
        );
      }

      if (field.conditional.any) {
        return field.conditional.any.some(
          (cond) => this.formData[cond.field] === cond.value
        );
      }

      // 4. Simple conditional: { field: "subscribe", value: true }
      if (field.conditional.field) {
        const targetValue = this.formData[field.conditional.field];
        return targetValue === field.conditional.value;
      }

      // 5. Fallback → not visible
      return false;
    });

    // 🔹 Reset values of fields that are NOT visible
    this.schema.fields.forEach((field) => {
      if (!visibleFields.includes(field)) {
        this.formData[field.name] = this.getDefaultValue(field);
      }
    });

    return visibleFields;
  }

  /**
   * Returns a default/reset value for a field based on its type
   */
  getDefaultValue(field: FormField): any {
    switch (field.type) {
      case "text":
      case "textarea":
      case "date":
        return "";
      case "dropdown":
        return null;
      case "multiselect":
        return [];
      case "checkbox":
        return false;
      default:
        return null;
    }
  }
}
