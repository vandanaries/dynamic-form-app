export interface ValidationRule {
  pattern?: string;
  message?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface ConditionalRule {
  field?: string;
  value?: any;
  all?: { field: string; value: any }[];
  any?: { field: string; value: any }[];
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
  ariaLabel?: string;
  ariaDescribedBy?: string;
  helperText?: string;
  conditional?: ConditionalRule;
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
