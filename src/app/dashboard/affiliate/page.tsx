"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

export default function AffiliatePage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
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

  const affiliateLink = `https://creditflowai.com/register/${user.id}`;

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/affiliate"
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

        {/* Affiliate content */}
        <main className={`flex-1 overflow-y-auto px-4 py-8 md:px-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t.affiliate.pageTitle}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  {t.affiliate.description}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t.affiliate.yourAffiliateLinkLabel}
              </label>
              <div className="flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-2">
                <input
                  type="text"
                  readOnly
                  value={affiliateLink}
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(affiliateLink);
                  }}
                  className="rounded bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                >
                  {t.affiliate.copyButton}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

