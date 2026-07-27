import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("renders the default state correctly", () => {
    render(<SettingsForm />);

    expect(screen.getByRole("heading", { name: /settings/i })).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const themeSelect = screen.getByLabelText(/theme preference/i);
    const notificationsToggle = screen.getByLabelText(/email notifications/i);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(themeSelect).toHaveValue("system");
    expect(notificationsToggle).toBeChecked();

    expect(screen.getByRole("button", { name: /save changes/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /reset form/i })).toBeEnabled();

    // No error messages or success banner should be present initially
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText(/settings saved successfully/i)).not.toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const nameError = await screen.findByText(/full name is required/i);
    const emailError = await screen.findByText(/email address is required/i);

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "fullName-error");
    expect(emailInput).toHaveAttribute("aria-describedby", "email-error");

    // The form should not show a success banner since it never submitted
    expect(screen.queryByText(/settings saved successfully/i)).not.toBeInTheDocument();
  });

  it("submits successfully with valid inputs", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.selectOptions(screen.getByLabelText(/theme preference/i), "dark");

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitButton);

    // Loading state should appear while submitting
    expect(await screen.findByRole("button", { name: /saving/i })).toBeDisabled();

    // Success banner should appear once submission resolves
    await waitFor(() =>
      expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument()
    );

    expect(screen.getByRole("button", { name: /save changes/i })).toBeEnabled();
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email address is required/i)).not.toBeInTheDocument();
  });
});
