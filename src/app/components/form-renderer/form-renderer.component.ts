import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormSchema, FormValue, FieldError } from "../../models/form.model";
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

  getVisibleFields() {
    return this.schema.fields.filter((field) => !field.hidden);
  }
}
