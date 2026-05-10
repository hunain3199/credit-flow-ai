"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";
import { API_BASE } from "@/lib/api";
import { US_STATES } from "@/app/dashboard/_lib/us-states";
import { SensitiveField, inputClass, labelClass } from "@/app/dashboard/_components/sensitive-field";

export default function AddClientPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const [mfsnUser, setMfsnUser] = useState("");
  const [mfsnPass, setMfsnPass] = useState("");
  const [reportPartner, setReportPartner] = useState("epic");
  const [accessToken, setAccessToken] = useState("");

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
  const [manualHtml, setManualHtml] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [ssnDocument, setSsnDocument] = useState<File | null>(null);
  const [addressDocument, setAddressDocument] = useState<File | null>(null);
  const [otherDocument, setOtherDocument] = useState<File | null>(null);
  const [otherDocument2, setOtherDocument2] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setLoading(false);
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);

    const token = getStoredToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const first = firstName.trim();
    const last = lastName.trim();
    const emailTrim = email.trim();
    const name = `${first} ${last}`.trim();

    if (!first || !last || !emailTrim) {
      setSubmitError(a.requiredMissing);
      return;
    }

    if (portalPass && portalPass2 && portalPass !== portalPass2) {
      setSubmitError(a.passwordMismatch);
      return;
    }

    const dateOfBirth =
      dobYear && dobMonth && dobDay ? `${dobYear}-${dobMonth}-${dobDay}` : "";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firstName", first);
    formData.append("lastName", last);
    formData.append("email", emailTrim);

    if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth);
    if (ssn.trim()) formData.append("ssn", ssn.trim());
    if (phone.trim()) formData.append("phone", phone.trim());
    if (street.trim()) formData.append("streetAddress", street.trim());
    if (city.trim()) formData.append("city", city.trim());
    if (stateCode.trim()) formData.append("state", stateCode.trim());
    if (zip.trim()) formData.append("zip", zip.trim());
    if (country.trim()) formData.append("country", country.trim());
    if (portalUser.trim()) formData.append("portalUsername", portalUser.trim());
    if (portalPass) formData.append("portalPassword", portalPass);
    if (portalPass2) formData.append("confirmPortalPassword", portalPass2);
    if (clientNotes.trim()) formData.append("notes", clientNotes.trim());
    if (reportNotes.trim()) formData.append("reportNotes", reportNotes.trim());
    if (manualHtml.trim()) formData.append("manualCreditReportHtml", manualHtml);
    if (mfsnUser.trim()) formData.append("mfsnEmail", mfsnUser.trim());
    if (mfsnPass) formData.append("mfsnPassword", mfsnPass);

    if (idDocument) formData.append("idDocument", idDocument);
    if (ssnDocument) formData.append("ssnDocument", ssnDocument);
    if (addressDocument) formData.append("addressDocument", addressDocument);
    if (otherDocument) formData.append("otherDocument", otherDocument);
    if (otherDocument2) formData.append("otherDocument", otherDocument2);

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/clients`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;

      if (!res.ok) {
        const msg = (data?.message as string) || (data?.error as string) || a.submitError;
        setSubmitError(typeof msg === "string" ? msg : a.submitError);
        return;
      }

      router.push("/dashboard/clients");
    } catch {
      setSubmitError(a.submitError);
    } finally {
      setSubmitting(false);
    }
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
  const a = t.clientsAdd;

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/clients/add"
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
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/dashboard/clients"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                {a.backToClients}
              </Link>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  checked={showHidden}
                  onChange={(e) => setShowHidden(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  aria-label={a.showHiddenFieldsAria}
                />
                <span className="select-none font-medium">{a.showHiddenFields}</span>
              </label>
            </div>

            <h1 className="mb-6 text-2xl font-semibold text-gray-900">{a.pageTitle}</h1>

            <div className="space-y-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <section>
                  <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900">{a.sectionReport}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 sm:max-w-md">
                      <label htmlFor="mfsn-user" className={labelClass}>
                        {a.mfsnUsername}
                      </label>
                      <input id="mfsn-user" value={mfsnUser} onChange={(e) => setMfsnUser(e.target.value)} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2 sm:max-w-md">
                      <SensitiveField
                        id="mfsn-pass"
                        label={a.mfsnPassword}
                        value={mfsnPass}
                        onChange={setMfsnPass}
                        revealAria={a.revealSensitiveAria}
                        concealAria={a.concealSensitiveAria}
                        autoComplete="new-password"
                      />
                    </div>
                    {showHidden && (
                      <div className="sm:col-span-2 sm:max-w-md">
                        <label htmlFor="report-partner" className={labelClass}>
                          {a.reportPartnerLabel}
                        </label>
                        <select
                          id="report-partner"
                          value={reportPartner}
                          onChange={(e) => setReportPartner(e.target.value)}
                          className={inputClass}
                        >
                          <option value="epic">{a.optionEpicPro}</option>
                        </select>
                      </div>
                    )}
                    {showHidden && (
                      <div className="sm:col-span-2 sm:max-w-md">
                        <SensitiveField
                          id="report-access-token"
                          label={a.hiddenReportAccessToken}
                          value={accessToken}
                          onChange={setAccessToken}
                          revealAria={a.revealSensitiveAria}
                          concealAria={a.concealSensitiveAria}
                          autoComplete="off"
                        />
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900">{a.sectionPersonal}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={labelClass}>
                      {a.firstName}
                    </label>
                    <input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelClass}>
                      {a.lastName}
                    </label>
                    <input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <span className={labelClass}>{a.dob}</span>
                    <div className="mt-1 flex max-w-md flex-wrap gap-2">
                      <select
                        aria-label={a.monthPlaceholder}
                        value={dobMonth}
                        onChange={(e) => setDobMonth(e.target.value)}
                        className={`${inputClass} min-w-[5.5rem]`}
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
                        className={`${inputClass} min-w-[5.5rem]`}
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
                        className={`${inputClass} min-w-[6.5rem] flex-1`}
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
                  <div className="sm:col-span-2 sm:max-w-md">
                    <SensitiveField
                      id="ssn"
                      label={a.ssn}
                      value={ssn}
                      onChange={setSsn}
                      revealAria={a.revealSensitiveAria}
                      concealAria={a.concealSensitiveAria}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      {a.phone}
                    </label>
                    <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {a.email}
                    </label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className={labelClass}>
                      {a.streetAddress}
                    </label>
                    <input id="street" value={street} onChange={(e) => setStreet(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>
                      {a.city}
                    </label>
                    <input id="city" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="state" className={labelClass}>
                      {a.state}
                    </label>
                    <select id="state" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className={inputClass}>
                      <option value="">{a.selectState}</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code} — {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zip" className={labelClass}>
                      {a.zipCode}
                    </label>
                    <input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="country" className={labelClass}>
                      {a.country}
                    </label>
                    <input id="country" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2 sm:max-w-md">
                    <label htmlFor="portal-user" className={labelClass}>
                      {a.clientPortalUsername}
                    </label>
                    <input id="portal-user" value={portalUser} onChange={(e) => setPortalUser(e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2 sm:max-w-md">
                    <SensitiveField
                      id="portal-pass"
                      label={a.clientPortalPassword}
                      value={portalPass}
                      onChange={setPortalPass}
                      revealAria={a.revealSensitiveAria}
                      concealAria={a.concealSensitiveAria}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="sm:col-span-2 sm:max-w-md">
                    <SensitiveField
                      id="portal-pass2"
                      label={a.confirmPortalPassword}
                      value={portalPass2}
                      onChange={setPortalPass2}
                      revealAria={a.revealSensitiveAria}
                      concealAria={a.concealSensitiveAria}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="client-notes" className={labelClass}>
                      {a.aboutClientNotes}
                    </label>
                    <textarea
                      id="client-notes"
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="report-notes" className={labelClass}>
                      {a.aboutReportNotes}
                    </label>
                    <textarea
                      id="report-notes"
                      rows={3}
                      value={reportNotes}
                      onChange={(e) => setReportNotes(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="manual-html" className={labelClass}>
                      {a.manualCreditReportHtml}
                    </label>
                    <textarea
                      id="manual-html"
                      rows={6}
                      value={manualHtml}
                      onChange={(e) => setManualHtml(e.target.value)}
                      className={`${inputClass} font-mono text-xs`}
                    />
                  </div>

                  <div className="sm:col-span-2 border-t border-gray-100 pt-6">
                    <h3 className="mb-3 text-base font-semibold text-gray-900">{a.uploadsHeading}</h3>
                    <p className="mb-4 text-sm text-gray-600">{a.uploadDocumentsHere}</p>
                    <div className="space-y-6">
                      <div>
                        <p className="mb-2 text-sm text-gray-700">{a.photoIdInstructions}</p>
                        <input
                          type="file"
                          onChange={(e) => setIdDocument(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-800 hover:file:bg-emerald-100"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-gray-700">{a.legalIdInstructions}</p>
                        <input
                          type="file"
                          onChange={(e) => setSsnDocument(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-800 hover:file:bg-emerald-100"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-gray-700">{a.addressProofInstructions}</p>
                        <input
                          type="file"
                          onChange={(e) => setAddressDocument(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-800 hover:file:bg-emerald-100"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-gray-700">{a.otherDocumentInstructions}</p>
                        <input
                          type="file"
                          onChange={(e) => setOtherDocument(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-800 hover:file:bg-emerald-100"
                        />
                      </div>
                      {showHidden && (
                        <div>
                          <p className="mb-2 text-sm text-gray-700">{a.hiddenSecondaryUploadLabel}</p>
                          <input
                            type="file"
                            onChange={(e) => setOtherDocument2(e.target.files?.[0] ?? null)}
                            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-800 hover:file:bg-emerald-100"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    {submitError && (
                      <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                        {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? a.submitting : a.addClientSubmit}
                    </button>
                  </div>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
