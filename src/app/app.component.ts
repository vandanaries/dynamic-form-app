import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { FormRendererComponent } from "./components/form-renderer/form-renderer.component";
import { FormSchema } from "./models/form.model";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormRendererComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  selectedForm!: "registration" | "feedback"; // = "registration";
  registrationSchema!: FormSchema;
  feedbackSchema!: FormSchema;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFormData();
  }

  getFormData() {
    this.http.get<any>("assets/form-data.json").subscribe((data) => {
      this.registrationSchema = data.registrationSchema;
      this.feedbackSchema = data.feedbackSchema;
      this.selectedForm = "registration";
    });
  }

  onFormSubmit(data: any) {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for details.");
  }
}
