import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormRendererComponent } from "./components/form-renderer/form-renderer.component";
import { FormSchema } from "./models/form.model";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormRendererComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  selectedForm: "registration" | "feedback" = "registration";

  registrationSchema: FormSchema = {
    title: "User Registration",
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        label: "Email",
        name: "email",
        type: "text",
        required: true,
        validation: {
          pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
          message: "Invalid email address",
        },
        placeholder: "you@example.com",
      },
      {
        label: "Date of Birth",
        name: "dob",
        type: "date",
        required: false,
      },
      {
        label: "Gender",
        name: "gender",
        type: "dropdown",
        options: ["Male", "Female", "Other"],
        required: true,
      },
      {
        label: "Hobbies",
        name: "hobbies",
        type: "multiselect",
        options: ["Reading", "Sports", "Music", "Travel", "Gaming", "Cooking"],
        required: false,
      },
      {
        label: "Subscribe to newsletter",
        name: "subscribe",
        type: "checkbox",
        required: false,
      },
      {
        label: "About Yourself",
        name: "about",
        type: "textarea",
        required: false,
        placeholder: "Tell us about yourself...",
      },
    ],
  };

  feedbackSchema: FormSchema = {
    title: "Product Feedback",
    fields: [
      {
        label: "Your Name",
        name: "name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        label: "Your Email",
        name: "feedbackEmail",
        type: "text",
        required: true,
        validation: {
          pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
          message: "Please provide a valid email",
        },
        placeholder: "john@example.com",
      },
      {
        label: "Product Rating",
        name: "rating",
        type: "dropdown",
        options: ["Excellent", "Good", "Average", "Poor"],
        required: true,
      },
      {
        label: "Feedback Category",
        name: "category",
        type: "multiselect",
        options: [
          "Bug Report",
          "Feature Request",
          "UI/UX",
          "Performance",
          "Other",
        ],
        required: true,
      },
      {
        label: "Your Feedback",
        name: "message",
        type: "textarea",
        required: true,
        placeholder: "Please share your detailed feedback...",
      },
      {
        label: "Would you recommend us?",
        name: "recommend",
        type: "checkbox",
        required: false,
      },
    ],
  };

  onFormSubmit(data: any) {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for details.");
  }
}
