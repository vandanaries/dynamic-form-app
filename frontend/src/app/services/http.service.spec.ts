import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpService } from "./http.service";

describe("HttpService", () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch forms via GET", () => {
    const mockForms = [
      { title: "Form A", fields: [] },
      { title: "Form B", fields: [] },
    ];

    service.getForms().subscribe((forms) => {
      expect(forms.length).toBe(2);
      expect(forms).toEqual(mockForms);
    });

    const req = httpMock.expectOne("http://localhost:3000/api/forms");
    expect(req.request.method).toBe("GET");
    req.flush(mockForms);
  });

  it("should add a form via POST", () => {
    const newForm = { title: "Form C", fields: [] };

    service.addForm(newForm).subscribe((response) => {
      expect(response).toEqual(newForm);
    });

    const req = httpMock.expectOne("http://localhost:3000/api/forms");
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(newForm);
    req.flush(newForm);
  });
});
