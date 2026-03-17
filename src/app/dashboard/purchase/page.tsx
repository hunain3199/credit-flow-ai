"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

type TabKey = "buy" | "packages" | "enterprise";

export default function PurchaseCreditsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buy");

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
        <p className="text-sm text-blue-200">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = getDisplayName(user);

  const paymentLink = "https://fs12.formsite.com/C2Ygy3/bycqdj8y9g/index";

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/purchase"
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

        {/* Purchase content */}
        <main className={`flex-1 overflow-y-auto px-4 py-8 md:px-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Get Started
            </h2>

            {/* Tabs */}
            <div className="mb-6 inline-flex rounded-full border border-blue-800/50 bg-white/10 p-1 text-sm font-medium text-blue-100">
              <button
                type="button"
                onClick={() => setActiveTab("buy")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "buy"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                Buy As You Go
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("packages")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "packages"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                Package Tiers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("enterprise")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "enterprise"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                Enterprise Plans
              </button>
            </div>

            {/* Pricing cards */}
            {activeTab === "buy" && (
              <section className="mb-8 rounded-lg border border-blue-800/50 bg-white/10 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      Only $35
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-blue-100">
                      <li>Includes 1 Credit</li>
                      <li>Does Not Expire</li>
                      <li>No Subscription Needed</li>
                    </ul>
                  </div>
                  <button className="mt-3 w-full rounded bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 md:mt-0 md:w-auto">
                    Choose Plan
                  </button>
                </div>
              </section>
            )}

            {activeTab === "packages" && (
              <section className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-800/50 bg-white/10 p-4">
                  <p className="text-base font-semibold text-white">
                    Only $150
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Includes 5 Credits i.e. $30/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-200">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Save $25
                  </div>
                  <p className="text-base font-semibold text-white">
                    Only $250
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Includes 10 Credits i.e. $25/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-100">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Save $100
                  </div>
                  <p className="text-base font-semibold text-white">
                    Only $500
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Includes 20 Credits i.e. $25/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-100">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>
              </section>
            )}

            {activeTab === "enterprise" && (
              <section className="mb-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-blue-800/50 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $1000
                    </div>
                    <p className="text-base font-semibold text-white">
                      Only $2000
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      Limited to 100 Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>Expires in 30 Days</li>
                      <li>
                        Subscription Needed - Credits Rollover If Renewed
                        Monthly
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $77500
                    </div>
                    <p className="text-base font-semibold text-white">
                      Only $10,000
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      Limited to 2,500 Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>Expires in 365 Days</li>
                      <li>
                        Subscription Needed - Credits Rollover If Renewed Yearly
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $30000
                    </div>
                    <p className="text-base font-semibold text-white">
                      Only $5000
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      Unlimited Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>Expires in 30 Days</li>
                      <li>Subscription Needed - Credits Do Not Rollover</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $1M
                    </div>
                    <p className="text-base font-semibold text-white">
                      Only $50,000
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      Unlimited Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>Expires in 365 Days</li>
                      <li>Subscription Needed - Credits Do Not Rollover</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Payment link */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 text-sm font-semibold text-gray-800">
                Click below link to make payment
              </p>
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
              >
                {paymentLink}
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

