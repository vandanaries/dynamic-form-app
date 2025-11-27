import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { AppComponent } from "./app.component";
import { FormRendererComponent } from "./components/form-renderer/form-renderer.component";
import { HttpService } from "./services/http.service";
import { FormSchema } from "./models/form.model";

// Create a mock HttpService
class MockHttpService {
  getForms() {
    return of([
      { title: "Form A", fields: [] },
      { title: "Form B", fields: [] },
    ] as FormSchema[]);
  }
}

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormRendererComponent],
      providers: [{ provide: HttpService, useClass: MockHttpService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should load form schemas on init", () => {
    expect(component.formSchemas.length).toBe(2);
    expect(component.selectedForm.title).toBe("Form A");
  });

  it("should set submittedData and showModal on form submit", () => {
    const mockData = { name: "Test User" };
    component.onFormSubmit(mockData);
    expect(component.submittedData).toEqual(mockData);
    expect(component.showModal).toBeTrue();
  });

  it("should close modal when closeModal is called", () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
