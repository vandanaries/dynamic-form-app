export interface ValidationRule {
  pattern?: string;
  message?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface FormField {
  label: string;
  name: string;
  type: "text" | "date" | "dropdown" | "multiselect" | "checkbox" | "textarea";
  required?: boolean;
  validation?: ValidationRule;
  options?: string[];
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}

export interface FormValue {
  [key: string]: any;
}

export interface FieldError {
  [key: string]: string;
}
