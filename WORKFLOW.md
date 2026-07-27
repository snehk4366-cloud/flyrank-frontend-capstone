# FE-03 Workflow Drill: Vague Prompting vs. Precise Directing

## Overview
This drill evaluates the qualitative and operational differences between using **vague AI prompting** (Round 1) and **structured, precise AI directing with Plan Mode** (Round 2) when building a React UI component (`SettingsForm`).

---

## 1. Correctness, Validation & Accessibility (a11y)

### Round 1: Vague Prompt (`feature/round-1-vague`)
* **Form Validation:** The initial code relied on basic HTML5 validation or simple React state without schema validation. Edge cases like whitespace-only inputs or invalid email structures were either unhandled or broke silently.
* **Accessibility:** Form fields lacked explicit `<label>` bindings, screen-reader attributes (`aria-invalid`, `aria-describedby`), and keyboard navigation focus management.
* **Error Handling:** Errors were shown inconsistently, without accessible alert tags or dynamic inline clear-on-focus behaviors.

### Round 2: Precise Prompt (`feature/round-2-precise`)
* **Form Validation:** Integrated `react-hook-form` paired with a strict `zod` schema (`Settingsschema.js`). This guaranteed type-safe client-side validation, custom field constraints (e.g., minimum character length, email regex), and deterministic reset behavior.
* **Accessibility:** Input elements explicitly mapped to label IDs, included `aria-invalid={!!errors.field}`, and pointed `aria-describedby` to dynamic error message IDs for screen readers.
* **Error Handling:** Standardized error components rendered conditionally below each field upon blur or submission, providing immediate, clear feedback.

---

## 2. Time, Effort & Friction Saved

* **Debugging & Iteration:** 
  * In **Round 1**, significant manual effort was spent resolving missing imports, unhandled state edge cases, and unexpected component crashes due to missing dependencies.
  * In **Round 2**, by forcing the AI to enter **Plan Mode** before generating code, all dependencies (`zod`, `react-hook-form`, `@hookform/resolvers`) were identified and installed upfront.
* **Verification Efficiency:** 
  * Round 2 included an automated test suite (`SettingsForm.test.jsx`). Running automated component tests allowed instant verification of rendering, validation error states, and submission logic without requiring repeated manual browser testing.

---

## 3. AI Mistakes & Oversights Caught

During the Round 2 implementation loop, the following AI oversights were identified and corrected:

1. **Dependency Resolution:** The AI generated code referencing `@hookform/resolvers/zod` without automatically updating `package.json`. The resolution adapter had to be installed manually to allow Vite to build successfully.
2. **Test Environment Mocks:** In `SettingsForm.test.jsx`, the initial test draft failed to mock the submission handlers correctly, causing false positives on form reset actions until explicit `userEvent` async waits were added.

---

## Conclusion

Structuring AI prompts with explicit stack requirements, validation rules, accessibility constraints, and plan-first execution dramatically reduces developer revision cycles and produces production-ready, testable code on the first attempt.