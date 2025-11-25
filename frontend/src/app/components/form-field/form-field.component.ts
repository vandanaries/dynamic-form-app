import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormField } from "../../models/form.model";

@Component({
  selector: "app-form-field",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./form-field.component.html",
  styleUrls: ["./form-field.component.scss"],
})
export class FormFieldComponent {
  @Input() field!: FormField;
  @Input() value: any;
  @Input() error: string | undefined;
  @Input() submitted = false;
  @Output() onChange = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<void>();

  onValueChange(newValue: string) {
    this.onChange.emit(newValue);
  }

  onFieldBlur() {
    this.onBlur.emit();
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.checked);
  }

  onMultiselectChange(option: string, event: Event) {
    const target = event.target as HTMLInputElement;
    let selectedValues = Array.isArray(this.value) ? [...this.value] : [];
    if (target.checked) {
      selectedValues.push(option);
    } else {
      selectedValues = selectedValues.filter((v) => v !== option);
    }
    this.onChange.emit(selectedValues);
  }

  isOptionSelected(option: string): boolean {
    return Array.isArray(this.value) && this.value.includes(option);
  }
}
