# AI Toolchain Conventions



# Project Rules & Guidelines

1. **Form Validation Standard:** All form components must use `react-hook-form` paired with `zod` schemas for client-side type-safe validation. Uncontrolled or raw state forms are strictly prohibited.
2. **Accessibility (a11y) Compliance:** Every form field must explicitly include `aria-invalid` and `aria-describedby` attributes linked directly to their dynamic error message elements for screen-reader support.
3. **Automated Testing Requirement:** Every new UI feature component must include a corresponding `.test.jsx` file covering initial rendering, validation failure edge cases, and successful submission handling.