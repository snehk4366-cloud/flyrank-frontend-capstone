import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  theme: z.enum(["light", "dark", "system"], {
    errorMap: () => ({ message: "Choose a theme preference" }),
  }),
  emailNotifications: z.boolean(),
});

export const defaultSettingsValues = {
  fullName: "",
  email: "",
  theme: "system",
  emailNotifications: true,
};