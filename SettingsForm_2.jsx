import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { settingsSchema, defaultSettingsValues } from "../schema/settingsSchema";

// Simulates a network call. Swap this out for a real API request.
function saveSettings(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email.trim().toLowerCase() === "fail@example.com") {
        reject(new Error("Something went wrong. Try again."));
      } else {
        resolve(values);
      }
    }, 700);
  });
}

export default function SettingsForm() {
  const [successVisible, setSuccessVisible] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const successTimeoutRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettingsValues,
    mode: "onBlur",
  });

  useEffect(() => {
    return () => clearTimeout(successTimeoutRef.current);
  }, []);

  const onSubmit = async (values) => {
    setSubmitError(null);
    setSuccessVisible(false);
    try {
      await saveSettings(values);
      setSuccessVisible(true);
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => setSuccessVisible(false), 4000);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Try again.");
    }
  };

  const handleReset = () => {
    reset(defaultSettingsValues);
    setSuccessVisible(false);
    setSubmitError(null);
    clearTimeout(successTimeoutRef.current);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your profile details and notification preferences.
          </p>
        </div>

        {/* Success banner */}
        {successVisible && (
          <div
            role="status"
            aria-live="polite"
            className="mb-5 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 animate-[fadeIn_0.2s_ease-out]"
          >
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        {/* Submission error banner (e.g. network failure) */}
        {submitError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-slate-900 shadow-sm
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                ${
                  errors.fullName
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-slate-300 focus-visible:ring-indigo-500"
                }`}
              placeholder="Jane Doe"
            />
            {errors.fullName && (
              <p id="fullName-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-slate-900 shadow-sm
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                ${
                  errors.email
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-slate-300 focus-visible:ring-indigo-500"
                }`}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Theme preference */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-slate-700">
              Theme preference
            </label>
            <div className="relative mt-1">
              <select
                id="theme"
                aria-invalid={errors.theme ? "true" : "false"}
                aria-describedby={errors.theme ? "theme-error" : undefined}
                {...register("theme")}
                className={`block w-full appearance-none rounded-md border bg-white px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                  ${
                    errors.theme
                      ? "border-red-400 focus-visible:ring-red-400"
                      : "border-slate-300 focus-visible:ring-indigo-500"
                  }`}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
            </div>
            {errors.theme && (
              <p id="theme-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.theme.message}
              </p>
            )}
          </div>

          {/* Email notifications toggle */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <label htmlFor="emailNotifications" className="block text-sm font-medium text-slate-700">
                Email notifications
              </label>
              <p className="text-xs text-slate-500">Get updates about account activity by email.</p>
            </div>
            <label
              htmlFor="emailNotifications"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center"
            >
              <input
                id="emailNotifications"
                type="checkbox"
                {...register("emailNotifications")}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-slate-300 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2"
              />
              <span
                aria-hidden="true"
                className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm
                transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1
                disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700
                transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1
                disabled:cursor-not-allowed disabled:opacity-70"
            >
              Reset form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
