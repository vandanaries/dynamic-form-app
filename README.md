# Dynamic Form Renderer

A small Angular standalone-component app that renders forms from a JSON schema and validates input.

## Features

**Schema-Driven** - Define forms in JSON, not code
**Dynamic Rendering** - Generate UI on the fly
**Built-in Validation** - Required fields, min/max length, email validation
**Professional Styling** - SCSS
**Component Reusable** - One form renderer, infinite forms
**No Dependencies** - Just Angular, no extra bloat

### Prerequisites

- Node.js v16+
- Angular CLI (`npm install -g @angular/cli`)

### Installation

git clone https://github.com/vandanaries/dynamic-form-app.git

## Quick start

1. Install dependencies

```sh
npm install
```

2. Run dev server

```sh
npm start
```

The app serves at http://localhost:4200 by default (Angular CLI).

3. Build for production

```sh
npm run build
```

(These scripts are defined in [package.json](package.json).)

## JSON schema format

The app expects a schema matching the [`FormSchema`](src/app/models/form.model.ts) interface:

- FormSchema

  - title: string
  - fields: FormField[]

- FormField (key properties)

  - label: string — field label shown to user
  - name: string — property used in form data object
  - type: "text" | "date" | "dropdown" | "multiselect" | "checkbox" | "textarea"
  - required?: boolean
  - validation?: ValidationRule
  - options?: string[] — used for `dropdown` and `multiselect`
  - placeholder?: string
  - disabled?: boolean
  - readonly?: boolean
  - hidden?: boolean

- ValidationRule
  - pattern?: string — regex as string
  - message?: string — override error message
  - minLength?, maxLength?, min?, max?

See the declared types here: [`FormSchema`, `FormField`, `ValidationRule`](src/app/models/form.model.ts).

## Example schema

```json
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
    },
    {
      "label": "Hobbies",
      "name": "hobbies",
      "type": "multiselect",
      "options": ["Reading", "Sports", "Music"]
    },
    {
      "label": "Subscribe",
      "name": "subscribe",
      "type": "checkbox"
    }
  ]
}
```

Use this shape when passing a schema to [`FormRendererComponent`](src/app/components/form-renderer/form-renderer.component.ts).

## Example output

When a submission passes validation, the renderer logs and emits the prepared data:

Console output example (from [`FormRendererComponent.submitForm()`](src/app/components/form-renderer/form-renderer.component.ts)):

```
Form Submission Successful: { "fullName": "John Doe", "email": "johndoe@example.com", "hobbies": ["Reading","Music"], "subscribe": true }
```

Then the app-level handler in [`AppComponent.onFormSubmit`](src/app/app.component.ts) logs:

```
Form submitted: { "fullName": "John Doe", "email": "johndoe@example.com", "hobbies": ["Reading","Music"], "subscribe": true }
```

## Notes / pointers

- Field rendering and events: see [`FormFieldComponent`](src/app/components/form-field/form-field.component.ts).
- Validation rules applied by [`ValidationService`](src/app/services/validation.service.ts).
- To customize initial form values or schema selection, update [`AppComponent`](src/app/app.component.ts).
