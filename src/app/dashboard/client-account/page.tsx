"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { SensitiveField, inputClass, labelClass } from "@/app/dashboard/_components/sensitive-field";
import { US_STATES } from "@/app/dashboard/_lib/us-states";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

const tableHeadClass =
  "border-b border-teal-700/30 bg-teal-600 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white";

function EyeSlashIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

function EyeOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UploadSlot({
  label,
  placeholder,
  ariaUpload,
  ariaDownload,
  ariaRemove,
}: {
  label: string;
  placeholder: string;
  ariaUpload: string;
  ariaDownload: string;
  ariaRemove: string;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-xs leading-snug text-gray-800">{label}</p>
      <div className="flex items-stretch overflow-hidden rounded border border-gray-300 bg-white">
        <span className="flex min-h-[40px] min-w-0 flex-1 items-center truncate px-2 text-sm text-gray-400">{placeholder}</span>
        <label
          className="inline-flex cursor-pointer items-center justify-center border-l border-gray-200 px-2 text-amber-600 hover:bg-amber-50"
          title={ariaUpload}
        >
          <span className="sr-only">{ariaUpload}</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 16h8v2H8v-2zm6-12h-4V4h4v2zm4 2v6c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h2l2-2h4l2 2h2c1.1 0 2 .9 2 2zm-2 0H8v6h8V8z" />
          </svg>
          <input type="file" accept=".jpg,.jpeg,.png,.gif" className="sr-only" />
        </label>
        <button
          type="button"
          className="inline-flex items-center justify-center border-l border-gray-200 px-2 text-gray-500 hover:bg-gray-50"
          aria-label={ariaDownload}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center border-l border-gray-200 px-2 text-red-600 hover:bg-red-50"
          aria-label={ariaRemove}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3H21l-1 14H4L3 6h4.5m3.5 0V4a2 2 0 114 0v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ColMenu() {
  return (
    <span className="ml-1 inline text-white/70" aria-hidden>
      ⋮
    </span>
  );
}

export default function ClientAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("");
  const [portalUser, setPortalUser] = useState("");
  const [portalPass, setPortalPass] = useState("");
  const [portalPass2, setPortalPass2] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [reportNotes, setReportNotes] = useState("");

  const a = t.clientAccount;
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")), []);
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")), []);
  const years = useMemo(() => {
    const y: string[] = [];
    for (let yr = new Date().getFullYear(); yr >= 1920; yr--) y.push(String(yr));
    return y;
  }, []);

  useEffect(() => {
    const u = getStoredUser();
    const token = getStoredToken();
    if (!u || !token) {
      router.push("/login");
      return;
    }
    setUser(u);
    const raw = (u.name ?? "").trim();
    if (raw) {
      const parts = raw.split(/\s+/);
      setFirstName(parts[0] ?? "");
      setLastName(parts.slice(1).join(" ") || "");
    }
    setEmail(u.email ?? "");
    setLoading(false);
  }, [router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a]">
        <p className="text-sm text-blue-200">{t.dashboard.loading}</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = getDisplayName(user);
  const revealSensitiveValues = showHidden;

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/client-account"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className={`flex-1 overflow-y-auto px-4 py-6 md:px-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-7xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline"
                >
                  {a.backToDashboard}
                </Link>
                <h1 className="text-lg font-semibold text-gray-900 md:text-xl">{a.editProfileTitle}</h1>
              </div>
              <button
                type="button"
                onClick={() => setShowHidden((v) => !v)}
                className="inline-flex items-center gap-2 self-start text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline sm:self-auto"
                aria-expanded={showHidden}
                aria-label={a.showHiddenFieldsAria}
              >
                {showHidden ? a.hideHiddenFields : a.showHiddenFields}
                {showHidden ? <EyeOpenIcon /> : <EyeSlashIcon />}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <h2 className="mb-4 text-base font-semibold text-gray-900">{a.personalInformationHeading}</h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <SensitiveField
                    id="ca-first"
                    label={a.firstName}
                    value={firstName}
                    onChange={setFirstName}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="given-name"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-last"
                    label={a.lastName}
                    value={lastName}
                    onChange={setLastName}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="family-name"
                    revealValues={revealSensitiveValues}
                  />
                  <div className="xl:col-span-1">
                    <span className={labelClass}>{a.dateOfBirth}</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <select
                        aria-label={a.monthPlaceholder}
                        value={dobMonth}
                        onChange={(e) => setDobMonth(e.target.value)}
                        className={`${inputClass} min-w-[4.5rem] flex-1`}
                      >
                        <option value="">{a.monthPlaceholder}</option>
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select
                        aria-label={a.dayPlaceholder}
                        value={dobDay}
                        onChange={(e) => setDobDay(e.target.value)}
                        className={`${inputClass} min-w-[4.5rem] flex-1`}
                      >
                        <option value="">{a.dayPlaceholder}</option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <select
                        aria-label={a.yearPlaceholder}
                        value={dobYear}
                        onChange={(e) => setDobYear(e.target.value)}
                        className={`${inputClass} min-w-[5rem] flex-1`}
                      >
                        <option value="">{a.yearPlaceholder}</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <SensitiveField
                    id="ca-ssn"
                    label={a.socialSecurityNumber}
                    value={ssn}
                    onChange={setSsn}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="off"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-phone"
                    label={a.phone}
                    value={phone}
                    onChange={setPhone}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="tel"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-street"
                    label={a.streetNumberAndName}
                    value={street}
                    onChange={setStreet}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="street-address"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-city"
                    label={a.city}
                    value={city}
                    onChange={setCity}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="address-level2"
                    revealValues={revealSensitiveValues}
                  />
                  <div>
                    <label htmlFor="ca-state" className={labelClass}>
                      {a.state}
                    </label>
                    <select id="ca-state" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className={inputClass}>
                      <option value="">{a.selectState}</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code} — {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <SensitiveField
                    id="ca-zip"
                    label={a.zip}
                    value={zip}
                    onChange={setZip}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="postal-code"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-country"
                    label={a.country}
                    value={country}
                    onChange={setCountry}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="country-name"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-email"
                    label={a.emailAddress}
                    value={email}
                    onChange={setEmail}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="email"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-portal-user"
                    label={a.clientPortalUsername}
                    value={portalUser}
                    onChange={setPortalUser}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="username"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-portal-pass"
                    label={a.clientPortalPassword}
                    value={portalPass}
                    onChange={setPortalPass}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="new-password"
                    revealValues={revealSensitiveValues}
                  />
                  <SensitiveField
                    id="ca-portal-pass2"
                    label={a.confirmClientPortalPassword}
                    value={portalPass2}
                    onChange={setPortalPass2}
                    revealAria={a.revealSensitiveAria}
                    concealAria={a.concealSensitiveAria}
                    autoComplete="new-password"
                    revealValues={revealSensitiveValues}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="ca-notes-client" className={labelClass}>
                    {a.aboutClientNotes}
                  </label>
                  <textarea
                    id="ca-notes-client"
                    rows={5}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="ca-notes-report" className={labelClass}>
                    {a.aboutReportNotes}
                  </label>
                  <textarea
                    id="ca-notes-report"
                    rows={5}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </section>

              <section>
                <h2 className="sr-only">{a.mfsnReportSectionHeading}</h2>
                <div className="overflow-hidden rounded-md border border-teal-700/20">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className={tableHeadClass}>
                          {a.mfsnTableColSection}
                          <ColMenu />
                        </th>
                        <th className={tableHeadClass}>
                          {a.mfsnTableColUsername}
                          <ColMenu />
                        </th>
                        <th className={`${tableHeadClass} w-32 text-right`}>
                          {a.mfsnTableColActions}
                          <ColMenu />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-600">
                          {a.noMonitoringCompanyAdded}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-teal-600 text-lg font-semibold text-teal-700 hover:bg-teal-50"
                    aria-label={a.addMonitoringRowAria}
                  >
                    +
                  </button>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold text-gray-900">{a.uploadDocumentsHeading}</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <UploadSlot
                    label={a.uploadDocPhotoId}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                  <UploadSlot
                    label={a.uploadDocLegalId}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                  <UploadSlot
                    label={a.uploadDocAddress}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                  <UploadSlot
                    label={a.otherDocumentUpload}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                  <UploadSlot
                    label={a.otherDocumentUpload}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                  <UploadSlot
                    label={a.otherDocumentUpload}
                    placeholder={a.uploadSlotPlaceholder}
                    ariaUpload={a.ariaUploadFile}
                    ariaDownload={a.ariaDownload}
                    ariaRemove={a.ariaRemove}
                  />
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-base font-semibold text-gray-900">{a.viewReportHeading}</h2>
                <div className="overflow-hidden rounded-md border border-teal-700/20">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className={tableHeadClass}>
                          {a.tableColMonitoringCompany}
                          <ColMenu />
                        </th>
                        <th className={tableHeadClass}>
                          {a.tableColCreditReportDate}
                          <ColMenu />
                        </th>
                        <th className={tableHeadClass}>
                          {a.tableColReport}
                          <ColMenu />
                        </th>
                        <th className={`${tableHeadClass} w-28 text-right`}>
                          {a.tableColActions}
                          <ColMenu />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-600">
                          {a.noReportAdded}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded bg-teal-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm hover:bg-teal-700"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {a.saveButton}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
