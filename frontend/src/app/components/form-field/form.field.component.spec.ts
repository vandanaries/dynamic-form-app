import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormFieldComponent } from "./form-field.component";
import { FormField } from "../../models/form.model";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe("FormFieldComponent", () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  const mockField: FormField = {
    name: "subscribe",
    label: "Subscribe to newsletter",
    type: "checkbox",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.field = mockField;
    component.value = false;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should emit value change on checkbox toggle", () => {
    spyOn(component.onChange, "emit");
    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
    expect(component.onChange.emit).toHaveBeenCalledWith(true);
  });

  it("should emit blur event on field blur", () => {
    spyOn(component.onBlur, "emit");
    component.onFieldBlur();
    expect(component.onBlur.emit).toHaveBeenCalled();
  });

  it("should emit updated values for multiselect", () => {
    component.field = {
      name: "colors",
      label: "Choose colors",
      type: "multiselect",
      options: ["Red", "Green", "Blue"],
    };
    component.value = ["Red"];
    fixture.detectChanges();

    spyOn(component.onChange, "emit");

    // Directly call the handler
    const event = { target: { checked: true } } as unknown as Event;
    component.onMultiselectChange("Green", event);

    expect(component.onChange.emit).toHaveBeenCalledWith(["Red", "Green"]);
  });

  it("should correctly detect selected multiselect option", () => {
    component.value = ["Red", "Blue"];
    expect(component.isOptionSelected("Red")).toBeTrue();
    expect(component.isOptionSelected("Green")).toBeFalse();
  });
});
