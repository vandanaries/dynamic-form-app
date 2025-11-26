# Dynamic Form Renderer

A small Angular standalone-component app that renders forms from a JSON schema and validates input.

## ✨ Features

- **Schema-Driven** – Define forms in JSON, not code  
- **Dynamic Rendering** – Generate UI on the fly  
- **Multiple Forms** – Render any number of forms based on schema objects  
- **Built-in Validation** – Required fields, min/max length, email validation  
- **Success Modal** – Popup confirmation after successful submission  
- **Accessibility-First** – ARIA labels, described-by attributes, screen reader compatibility  
- **Professional Styling** – SCSS  
- **Reusable Component** – One form renderer, infinite forms  
- **No Dependencies** – Just Angular, no extra bloat  

## 🔧 Prerequisites

- Node.js v16+  
- Angular CLI (`npm install -g @angular/cli`)  

## 🚀 Installation

```sh
git clone https://github.com/vandanaries/dynamic-form-app.git
```

## 🚀 Quick Start
### Frontend (Angular)
```sh
cd frontend
npm install
npm start # or ng serve
```
Runs Angular app at **http://localhost:4200**

### Backend (API)
```sh
cd api
npm install
node server.js
```

Runs Express server at **http://localhost:3000**

Endpoints:

- GET /api/forms → returns forms.json
- POST /api/forms → add a new form (JSON body)

## 🛠 Development Workflow
Run both frontend and backend together (optional):
- npm install -g concurrently
- concurrently "cd frontend && npm start" "cd api && node server.js"

## 📦 Build for Production
```sh
cd frontend
npm run build
```

Angular build output will be in frontend/dist/.

## 📑 JSON Schema Format
The app expects a schema matching the FormSchema interface:

- FormSchema
- title: string
- fields: FormField[]
- FormField (key properties)
- label: string
- name: string
- type: "text" | "date" | "dropdown" | "multiselect" | "checkbox" | "textarea"
- required?: boolean
- validation?: ValidationRule
- options?: string[]
- placeholder?: string
- disabled?: boolean
- readonly?: boolean
- hidden?: boolean
- ValidationRule
- pattern?: string
- message?: string
- minLength?, maxLength?, min?, max?

## 📋 Example Schema
```js
{
"title": "Example Form",
"fields": [
{
"label": "Full Name",
"name": "fullName",
"type": "text",
"required": true,
"placeholder": "Enter your full name"
},
{
"label": "Email",
"name": "email",
"type": "text",
"required": true,
"validation": {
"pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
"message": "Invalid email address"
},
"placeholder": "you@example.com"
}
]
}
```

## 📊 Example Output
On successful submission, the app shows a modal popup with submitted data:
```js
{
"fullName": "John Doe",
"email": "johndoe@example.com",
"hobbies": ["Reading","Music"],
"subscribe": true
}
```
## 📌 Notes

- Field rendering: FormFieldComponent
- Validation rules: ValidationService
- API integration: FormService
- Backend JSON source: forms.json
