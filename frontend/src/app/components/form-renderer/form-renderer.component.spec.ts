import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormRendererComponent } from "./form-renderer.component";
import { ValidationService } from "../../services/validation.service";
import { FormSchema } from "../../models/form.model";
import { of } from "rxjs";

// Mock ValidationService
class MockValidationService {
  validateField(field: any, value: any) {
    if (field.required && !value) {
      return "This field is required";
    }
    return null;
  }

  validateForm(fields: any[], formData: any) {
    const errors: any = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = "This field is required";
      }
    });
    return errors;
  }
}

describe("FormRendererComponent", () => {
  let component: FormRendererComponent;
  let fixture: ComponentFixture<FormRendererComponent>;

  const mockSchema: FormSchema = {
    title: "Test Form",
    fields: [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Subscribe", name: "subscribe", type: "checkbox" },
      {
        label: "Email",
        name: "email",
        type: "text",
        conditional: { field: "subscribe", value: true },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRendererComponent],
      providers: [
        { provide: ValidationService, useClass: MockValidationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;
    component.schema = mockSchema;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize formData with default values", () => {
    expect(component.formData).toEqual({
      name: "",
      subscribe: false,
      email: "",
    });
  });

  it("should update formData and clear error on field change", () => {
    component.errors["name"] = "This field is required";
    component.onFieldChange("name", "Vandana");
    expect(component.formData["name"]).toBe("Vandana");
    expect(component.errors["name"]).toBeUndefined();
  });

  it("should validate field on blur after submission", () => {
    component.submitted = true;
    component.formData["name"] = "";
    component.onFieldBlur("name");
    expect(component.errors["name"]).toBe("This field is required");
  });

  it("should emit form data on successful submission", () => {
    spyOn(component.onSubmit, "emit");
    component.formData["name"] = "Vandana";
    component.submitForm();
    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      name: "Vandana",
      subscribe: false,
    });
  });

  it("should not emit if validation errors exist", () => {
    spyOn(component.onSubmit, "emit");
    component.formData["name"] = "";
    component.submitForm();
    expect(component.errors["name"]).toBe("This field is required");
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it("should return visible fields based on conditional logic", () => {
    component.formData["subscribe"] = true;
    const visible = component.getVisibleFields().map((f) => f.name);
    expect(visible).toContain("email");

    component.formData["subscribe"] = false;
    const hidden = component.getVisibleFields().map((f) => f.name);
    expect(hidden).not.toContain("email");
  });
});
