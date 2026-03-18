"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

export default function ManageCroAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/manage"
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
          <div className="mx-auto max-w-6xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {t.manage.companyTitle}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {t.manage.companySubtitle}
                </p>
              </div>
              <button className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                {t.manage.changePasswordButton}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Profile image + upload */}
            <div className="space-y-4 lg:col-span-1">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {t.manage.profileImageLabel}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl">
                  <span role="img" aria-label={t.manage.profileAriaLabel}>
                    👤
                  </span>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                  {t.manage.uploadButtonLabel}
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* Personal info fields */}
            <div className="space-y-6 lg:col-span-3">
              <p className="text-sm font-semibold text-gray-800">
                {t.manage.personalInfoLabel}
              </p>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.firstLastNameLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.fullNamePlaceholder}
                    defaultValue={user.name ?? ""}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.dobLabel}
                  </label>
                  <input
                    type="date"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.ssnLabel}
                  </label>
                  <input
                    type="password"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.ssnPlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.phonePlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.streetLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.streetPlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.cityLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.cityPlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.stateLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.statePlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.zipLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder={t.manage.zipPlaceholder}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    {t.manage.emailLabel}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    defaultValue={user.email}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload sections */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-800">
              {t.manage.verificationDocumentsLabel}
            </p>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  {t.manage.photoIdPromptPrefix}{" "}
                  <span className="font-medium">
                    {t.manage.photoIdentificationLabel}
                  </span>{" "}
                  {t.manage.photoIdPromptSuffix}
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t.manage.uploadFileLabel}</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  {t.manage.legalIdPromptPrefix}{" "}
                  <span className="font-medium">
                    {t.manage.legalIdentificationLabel}
                  </span>{" "}
                  {t.manage.legalIdPromptSuffix}
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t.manage.uploadFileLabel}</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  {t.manage.addressPromptPrefix}{" "}
                  <span className="font-medium">{t.manage.addressLabel}</span>{" "}
                  {t.manage.addressPromptSuffix}
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t.manage.uploadFileLabel}</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium uppercase text-gray-500">
                {t.manage.otherDocumentUploadLabel}
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span>{t.manage.uploadFileLabel}</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center rounded bg-emerald-500 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              {t.manage.updateInformationButton}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</div>
  );
}

