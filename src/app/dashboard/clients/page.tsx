"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import {
  getStoredUser,
  getStoredToken,
  clearAuth,
  getDisplayName,
} from "@/lib/auth-client";
import { API_BASE } from "@/lib/api";
import {
  type ClientListItem,
  clientAddedBy,
  clientDateAdded,
  clientDisplayName,
  clientEmail,
  parseClientsListResponse,
} from "@/lib/clients-list";

const PAGE_SIZE = 10;

function formatPageIndicator(template: string, current: number, total: number) {
  return template.replace("{current}", String(current)).replace("{total}", String(total));
}

export default function ManageClientsPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [rows, setRows] = useState<ClientListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setListLoading(true);
    setListError(null);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      if (statusFilter.trim()) qs.set("status", statusFilter.trim());

      const res = await fetch(`${API_BASE}/api/v1/clients?${qs.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;

      if (!res.ok) {
        const msg =
          (typeof data?.message === "string" && data.message) ||
          (typeof data?.error === "string" && data.error) ||
          t.clients.listLoadError;
        setListError(msg);
        setRows([]);
        setTotalCount(0);
        return;
      }

      const parsed = parseClientsListResponse(data);
      setRows(parsed.items);
      const count =
        parsed.total > 0 ? parsed.total : parsed.items.length > 0 ? parsed.items.length : 0;
      setTotalCount(count);
    } catch {
      setListError(t.clients.listLoadError);
      setRows([]);
      setTotalCount(0);
    } finally {
      setListLoading(false);
    }
  }, [page, statusFilter, router, t.clients.listLoadError]);

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

  useEffect(() => {
    if (!user) return;
    void fetchClients();
  }, [user, fetchClients]);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const name = clientDisplayName(row).toLowerCase();
      const email = clientEmail(row).toLowerCase();
      const by = clientAddedBy(row).toLowerCase();
      return name.includes(q) || email.includes(q) || by.includes(q);
    });
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const canPrev = page > 1 && !listLoading;
  const canNext =
    totalCount > 0
      ? page < totalPages
      : rows.length >= PAGE_SIZE;

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

      <div className="flex flex-1 flex-col">
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className={`flex-1 overflow-y-auto px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">{t.clients.pageTitle}</h2>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-800 sm:mb-6 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">👥</span>
                <span className="font-medium">{t.clients.statsTotalClients}</span>
                <span className="ml-1 text-lg font-semibold">{totalCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">💳</span>
                <span className="font-medium">{t.clients.statsCreditsUsed}</span>
                <span className="ml-1 text-lg font-semibold">—</span>
              </div>
            </div>

            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full justify-center rounded-full border border-emerald-500 bg-emerald-50 p-1 text-sm sm:w-auto sm:justify-start">
                <button type="button" className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  {t.clients.tabsAllClients}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="client-status-filter" className="text-xs font-medium text-gray-700">
                    {t.clients.statusFilterLabel}
                  </label>
                  <select
                    id="client-status-filter"
                    value={statusFilter}
                    onChange={(e) => {
                      setPage(1);
                      setStatusFilter(e.target.value);
                    }}
                    className="rounded border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">{t.clients.statusAll}</option>
                    <option value="ACTIVE">{t.clients.statusActive}</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="rounded border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 sm:px-4 sm:py-2"
                >
                  ⬇ {t.clients.exportCsv}
                </button>
                <Link
                  href="/dashboard/clients/add"
                  className="inline-flex items-center justify-center rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2"
                >
                  {t.clients.addNewClient}
                </Link>
                <button
                  type="button"
                  className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2"
                >
                  {t.clients.importClient}
                </button>
              </div>
            </div>

            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
              {listError && (
                <p className="text-sm text-red-600" role="alert">
                  {listError}
                </p>
              )}
            </div>

            <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-gray-200 text-sm">
                  <thead className="bg-emerald-600 text-xs font-semibold uppercase tracking-wide text-white">
                    <tr>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableFullName}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableAddedBy}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableEmail}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableDateAdded}</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">{t.clients.tableActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {listLoading ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          {t.dashboard.loading}
                        </td>
                      </tr>
                    ) : filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          {t.clients.listEmpty}
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, idx) => (
                        <tr key={row.id != null ? String(row.id) : `row-${idx}`}>
                          <td className="px-2 py-2 sm:px-4 sm:py-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-900 sm:px-4 sm:py-3">{clientDisplayName(row)}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-800 sm:px-4 sm:py-3">{clientAddedBy(row)}</td>
                          <td className="min-w-[140px] px-2 py-2 text-gray-700 sm:px-4 sm:py-3">
                            <span className="break-all">{clientEmail(row)}</span>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 sm:px-4 sm:py-3">{clientDateAdded(row)}</td>
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 hidden items-center justify-between gap-2 border-t border-gray-200 pt-3 text-sm text-gray-700 md:flex">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.clients.paginationPrev}
              </button>
              <span className="text-xs text-gray-600">
                {formatPageIndicator(t.clients.pageIndicator, page, totalPages)}
              </span>
              <button
                type="button"
                disabled={!canNext || listLoading}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.clients.paginationNext}
              </button>
            </div>

            <div className="mt-4 space-y-3 md:hidden">
              {listLoading ? (
                <p className="text-center text-sm text-gray-500">{t.dashboard.loading}</p>
              ) : filteredRows.length === 0 ? (
                <p className="text-center text-sm text-gray-500">{t.clients.listEmpty}</p>
              ) : (
                filteredRows.map((row, idx) => (
                  <div
                    key={row.id != null ? String(row.id) : `m-${idx}`}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="font-semibold text-gray-900">{clientDisplayName(row)}</div>
                      <span className="text-xs text-gray-500">{clientDateAdded(row)}</span>
                    </div>
                    <p className="mb-2 text-xs text-gray-700">
                      {t.clients.mobileAddedBy} <span className="font-medium">{clientAddedBy(row)}</span>
                    </p>
                    <p className="mb-3 break-all text-xs text-gray-700">{clientEmail(row)}</p>
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
                ))
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 md:hidden">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.clients.paginationPrev}
              </button>
              <span className="text-xs text-gray-600">
                {formatPageIndicator(t.clients.pageIndicator, page, totalPages)}
              </span>
              <button
                type="button"
                disabled={!canNext || listLoading}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.clients.paginationNext}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
