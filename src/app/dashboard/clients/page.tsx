"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

export default function ManageClientsPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

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
        currentPath="/dashboard/clients"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Manage clients content */}
        <main className={`flex-1 overflow-y-auto px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">{t.clients.pageTitle}</h2>

            {/* Stats bar */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-800 sm:mb-6 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">👥</span>
                <span className="font-medium">{t.clients.statsTotalClients}</span>
                <span className="ml-1 text-lg font-semibold">1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">💳</span>
                <span className="font-medium">{t.clients.statsCreditsUsed}</span>
                <span className="ml-1 text-lg font-semibold">0</span>
              </div>
            </div>

            {/* Tabs + controls */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full justify-center rounded-full border border-emerald-500 bg-emerald-50 p-1 text-sm sm:w-auto sm:justify-start">
                <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  {t.clients.tabsAllClients}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <button className="rounded border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 sm:px-4 sm:py-2">
                  ⬇ {t.clients.exportCsv}
                </button>
                <button className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2">
                  {t.clients.addNewClient}
                </button>
                <button className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2">
                  {t.clients.importClient}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-3 flex justify-end">
              <div className="relative w-full min-w-0 max-w-full sm:max-w-xs">
                <input
                  type="text"
                  className="w-full min-w-0 rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder={t.clients.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Table – desktop and larger */}
            <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-gray-200 text-sm">
                  <thead className="bg-emerald-600 text-xs font-semibold uppercase tracking-wide text-white">
                    <tr>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableFullName}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableAddedBy}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableEmail}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableDateAdded}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {/* Example row to mirror screenshot */}
                    <tr>
                      <td className="px-2 py-2 sm:px-4 sm:py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-900 sm:px-4 sm:py-3">
                        {t.clients.sampleClient}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-800 sm:px-4 sm:py-3">
                        {userName}
                      </td>
                      <td className="min-w-[140px] px-2 py-2 text-gray-700 sm:px-4 sm:py-3">
                        <span className="break-all">{t.clients.sampleEmail}</span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-700 sm:px-4 sm:py-3">
                        {t.clients.sampleDateAdded}
                      </td>
                      <td className="px-2 py-2 sm:px-4 sm:py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100 sm:p-1.5"
                            aria-label={t.clients.actionEditClientAria}
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100 sm:p-1.5"
                            aria-label={t.clients.actionViewClientAria}
                          >
                            👁️
                          </button>
                          <button
                            type="button"
                            className="rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-3"
                          >
                            {t.clients.uploadReport}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile card layout */}
            <div className="mt-4 space-y-3 md:hidden">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="font-semibold text-gray-900">{t.clients.sampleClient}</div>
                  <span className="text-xs text-gray-500">{t.clients.sampleDateAdded}</span>
                </div>
                <p className="mb-2 text-xs text-gray-700">
                  {t.clients.mobileAddedBy} <span className="font-medium">{userName}</span>
                </p>
                <p className="mb-3 break-all text-xs text-gray-700">
                  {t.clients.sampleEmail}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100"
                    aria-label={t.clients.actionEditClientAria}
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100"
                    aria-label={t.clients.actionViewClientAria}
                  >
                    👁️
                  </button>
                  <button
                    type="button"
                    className="rounded bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600"
                  >
                    {t.clients.uploadReport}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

