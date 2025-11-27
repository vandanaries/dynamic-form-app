import { TestBed } from "@angular/core/testing";
import { ValidationService } from "./validation.service";
import { FormField, ValidationRule } from "../models/form.model";

describe("ValidationService", () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService],
    });
    service = TestBed.inject(ValidationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("validateField", () => {
    it("should return error if required field is empty", () => {
      const field: FormField = {
        name: "username",
        label: "Username",
        type: "text",
        required: true,
      };
      const result = service.validateField(field, "");
      expect(result).toBe("Username is required");
    });

    it("should return null if non-required field is empty", () => {
      const field: FormField = {
        name: "nickname",
        label: "Nickname",
        type: "text",
        required: false,
      };
      const result = service.validateField(field, "");
      expect(result).toBeNull();
    });

    it("should validate regex pattern", () => {
      const field: FormField = {
        name: "email",
        label: "Email",
        type: "text",
        required: true,
        validation: {
          pattern: "^[^@]+@[^@]+\\.[^@]+$",
          message: "Invalid email format",
        },
      };
      const result = service.validateField(field, "invalidEmail");
      expect(result).toBe("Invalid email format");
    });

    it("should validate minLength and maxLength for strings", () => {
      const field: FormField = {
        name: "password",
        label: "Password",
        type: "text",
        required: true,
        validation: { minLength: 6, maxLength: 10 },
      };
      expect(service.validateField(field, "123")).toBe(
        "Password must be at least 6 characters"
      );
      expect(service.validateField(field, "12345678901")).toBe(
        "Password must not exceed 10 characters"
      );
    });

    it("should validate min and max for numbers", () => {
      const field: FormField = {
        name: "age",
        label: "Age",
        type: "text",
        required: true,
        validation: { min: 18, max: 60 },
      };
      expect(service.validateField(field, 15)).toBe("Age must be at least 18");
      expect(service.validateField(field, 65)).toBe("Age must not exceed 60");
    });

    it("should return null if value passes all validations", () => {
      const field: FormField = {
        name: "username",
        label: "Username",
        type: "text",
        required: true,
        validation: { minLength: 3 },
      };
      const result = service.validateField(field, "Vandana");
      expect(result).toBeNull();
    });
  });

  describe("validateForm", () => {
    it("should return errors for multiple invalid fields", () => {
      const fields: FormField[] = [
        { name: "username", label: "Username", type: "text", required: true },
        {
          name: "age",
          label: "Age",
          type: "text",
          required: true,
          validation: { min: 18 },
        },
      ];
      const formData = { username: "", age: 15 };

      const errors = service.validateForm(fields, formData);
      expect(errors["username"]).toBe("Username is required");
      expect(errors["age"]).toBe("Age must be at least 18");
    });

    it("should return empty errors object if all fields are valid", () => {
      const fields: FormField[] = [
        { name: "username", label: "Username", type: "text", required: true },
        {
          name: "age",
          label: "Age",
          type: "text",
          required: true,
          validation: { min: 18 },
        },
      ];
      const formData = { username: "Vandana", age: 25 };

      const errors = service.validateForm(fields, formData);
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
