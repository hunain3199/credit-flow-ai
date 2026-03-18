"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

export default function ClientScoreboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedReport, setSelectedReport] = useState("");

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

  const bureaus = [
    { id: "tu", name: "TransUnion" },
    { id: "exp", name: "Experian" },
    { id: "eqf", name: "Equifax" },
  ];

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/scoreboard"
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

        {/* Scoreboard content */}
        <main className={`flex-1 overflow-y-auto px-4 py-8 md:px-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {t.scoreboard.pageTitle}
            </h2>

            {/* Filters */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-blue-200">
                  {t.scoreboard.selectClientLabel}
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">{t.scoreboard.selectClientPlaceholder}</option>
                  <option value="sample">{t.scoreboard.sampleClient}</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-blue-200">
                  {t.scoreboard.selectReportLabel}
                </label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">{t.scoreboard.selectReportPlaceholder}</option>
                  <option value="latest">{t.scoreboard.latestReport}</option>
                </select>
              </div>
            </div>

            {/* Scoreboard rows */}
            <div className="space-y-8">
              {bureaus.map((bureau) => (
                <div
                  key={bureau.id}
                  className="grid gap-6 border-b border-gray-200 pb-6 last:border-b-0 md:grid-cols-[260px,1fr]"
                >
                  {/* Gauge + logo placeholder */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-full rounded bg-gray-100" />
                    <div className="relative h-32 w-48">
                      <svg
                        viewBox="0 0 100 60"
                        className="h-full w-full text-gray-300"
                      >
                        <path
                          d="M10 60 A40 40 0 0 1 90 60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <line
                          x1="50"
                          y1="60"
                          x2="50"
                          y2="30"
                          stroke="#22c55e"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-end justify-center pb-3">
                        <span className="text-xl font-semibold text-gray-900">
                          0
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {t.scoreboard.prevScoreLabel} --
                    </p>
                  </div>

                  {/* Metrics table */}
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full text-xs">
                      <thead className="bg-emerald-50 text-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold">
                            {bureau.name}
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">
                            {t.scoreboard.currentRecordHeader}
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">
                            {t.scoreboard.previousRecordHeader}
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">
                            {t.scoreboard.differenceHeader}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {t.scoreboard.metricLabels.map((label) => (
                          <tr key={label}>
                            <td className="px-4 py-2 text-left text-gray-800">
                              {label}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              --
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              --
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              --
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

