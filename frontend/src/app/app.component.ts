import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { FormRendererComponent } from "./components/form-renderer/form-renderer.component";
import { FormSchema } from "./models/form.model";
import { HttpService } from "./services/http.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormRendererComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  formSchemas!: any;
  selectedForm!: FormSchema;

  showModal = false;
  submittedData: any = null;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getFormData();
  }

  /**
   * Loads form schema data from a local JSON file.
   * Sets all available schemas and selects the first form by default.
   */
  getFormData() {
    this.httpService.getForms().subscribe((data) => {
      this.formSchemas = data;
      this.selectedForm = data[0];
    });
  }

  onFormSubmit(data: any) {
    this.submittedData = data;
    this.showModal = true; // open modal
  }

  closeModal() {
    this.showModal = false;
  }
}
