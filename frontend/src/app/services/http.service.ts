import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class HttpService {
  private apiUrl = "http://localhost:3000/api/forms";
  // private apiUrl = "assets/form-data.json";

  constructor(private http: HttpClient) {}

  getForms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addForm(form: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, form);
  }
}
