import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Camera,
  Check,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-teal-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

// ---------------------------------------------------------------------------
// Section content
// ---------------------------------------------------------------------------

function ProfileSection({ data, update }) {
  return (
    <div>
      <SectionHeader
        title="Profile"
        description="This is how others see you across the app."
      />

      <div className="mb-8 flex items-center gap-5">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-lg font-medium text-teal-700 ring-1 ring-inset ring-teal-100">
            {data.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <button
            type="button"
            aria-label="Change photo"
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-teal-700"
          >
            <Camera size={13} />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">Profile photo</p>
          <p className="text-sm text-slate-500">JPG or PNG, up to 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name">
          <input
            className={inputClass}
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>
        <Field label="Email address">
          <input
            type="email"
            className={inputClass}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label="Username">
          <input
            className={inputClass}
            value={data.username}
            onChange={(e) => update("username", e.target.value)}
          />
        </Field>
        <Field label="Time zone">
          <select
            className={inputClass}
            value={data.timezone}
            onChange={(e) => update("timezone", e.target.value)}
          >
            <option>Pacific Time (US)</option>
            <option>Mountain Time (US)</option>
            <option>Central Time (US)</option>
            <option>Eastern Time (US)</option>
            <option>Greenwich Mean Time</option>
            <option>Indian Standard Time</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Bio" hint="Shown on your public profile.">
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={data.bio}
              onChange={(e) => update("bio", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection({ data, update }) {
  return (
    <div>
      <SectionHeader
        title="Notifications"
        description="Choose what you want to hear about, and how."
      />
      <div className="divide-y divide-slate-100">
        <Row label="Email notifications" description="Product updates and account activity.">
          <Toggle
            checked={data.email}
            onChange={(v) => update("email", v)}
            label="Email notifications"
          />
        </Row>
        <Row label="Push notifications" description="Real-time alerts on this device.">
          <Toggle
            checked={data.push}
            onChange={(v) => update("push", v)}
            label="Push notifications"
          />
        </Row>
        <Row label="Weekly summary" description="A digest of activity every Monday.">
          <Toggle
            checked={data.weeklyDigest}
            onChange={(v) => update("weeklyDigest", v)}
            label="Weekly summary"
          />
        </Row>
        <Row label="Mentions" description="When someone tags you in a comment.">
          <Toggle
            checked={data.mentions}
            onChange={(v) => update("mentions", v)}
            label="Mentions"
          />
        </Row>
        <Row label="Marketing emails" description="Occasional news about new features.">
          <Toggle
            checked={data.marketing}
            onChange={(v) => update("marketing", v)}
            label="Marketing emails"
          />
        </Row>
      </div>
    </div>
  );
}

function AppearanceSection({ data, update }) {
  const themes = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" },
  ];
  const densities = [
    { id: "comfortable", label: "Comfortable" },
    { id: "compact", label: "Compact" },
  ];

  return (
    <div>
      <SectionHeader title="Appearance" description="Adjust how the app looks for you." />

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-slate-700">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => update("theme", t.id)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                data.theme === t.id
                  ? "border-teal-600 bg-teal-50 text-teal-800"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Density</p>
        <div className="grid grid-cols-2 gap-3">
          {densities.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => update("density", d.id)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                data.density === d.id
                  ? "border-teal-600 bg-teal-50 text-teal-800"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacySection({ data, update }) {
  return (
    <div>
      <SectionHeader
        title="Privacy and security"
        description="Control who can see your activity and how your account is protected."
      />
      <div className="divide-y divide-slate-100">
        <Row label="Public profile" description="Anyone can view your profile page.">
          <Toggle
            checked={data.publicProfile}
            onChange={(v) => update("publicProfile", v)}
            label="Public profile"
          />
        </Row>
        <Row label="Show activity status" description="Let others see when you're active.">
          <Toggle
            checked={data.activityStatus}
            onChange={(v) => update("activityStatus", v)}
            label="Show activity status"
          />
        </Row>
        <Row label="Two-factor authentication" description="Add an extra step when signing in.">
          <Toggle
            checked={data.twoFactor}
            onChange={(v) => update("twoFactor", v)}
            label="Two-factor authentication"
          />
        </Row>
      </div>

      <div className="mt-8 rounded-lg border border-red-100 bg-red-50/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-red-800">Delete account</p>
            <p className="mt-0.5 text-sm text-red-600/80">
              Permanently remove your account and all of its data.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy and security", icon: Shield },
];

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const [dirty, setDirty] = useState(false);

  const [profile, setProfile] = useState({
    name: "Jordan Blake",
    email: "jordan.blake@example.com",
    username: "jblake",
    timezone: "Pacific Time (US)",
    bio: "Building things, one release at a time.",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
    mentions: true,
    marketing: false,
  });

  const [appearance, setAppearance] = useState({
    theme: "system",
    density: "comfortable",
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    activityStatus: true,
    twoFactor: false,
  });

  function makeUpdater(setter) {
    return (key, value) => {
      setter((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
      setSaveState("idle");
    };
  }

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setDirty(false);
      setTimeout(() => setSaveState("idle"), 2000);
    }, 700);
  }

  return (
    <div className="mx-auto flex min-h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Sidebar navigation */}
      <nav className="w-56 shrink-0 border-r border-slate-100 bg-slate-50/60 p-3">
        <p className="px-3 pb-3 pt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Settings
        </p>
        <ul className="space-y-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-white font-medium text-teal-800 shadow-sm ring-1 ring-inset ring-slate-200"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-800"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-teal-700" : "text-slate-400"} />
                  <span className="truncate">{tab.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-teal-600" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {activeTab === "profile" && (
            <ProfileSection data={profile} update={makeUpdater(setProfile)} />
          )}
          {activeTab === "notifications" && (
            <NotificationsSection
              data={notifications}
              update={makeUpdater(setNotifications)}
            />
          )}
          {activeTab === "appearance" && (
            <AppearanceSection data={appearance} update={makeUpdater(setAppearance)} />
          )}
          {activeTab === "privacy" && (
            <PrivacySection data={privacy} update={makeUpdater(setPrivacy)} />
          )}
        </div>

        {/* Save bar */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-8 py-4">
          <span className="text-xs text-slate-400">
            {dirty ? "You have unsaved changes." : "All changes saved."}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty && saveState !== "saved"}
            className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && (
              <>
                <Check size={15} /> Saved
              </>
            )}
            {saveState === "idle" && "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
