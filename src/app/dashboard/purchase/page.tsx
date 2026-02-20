"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
}

type TabKey = "buy" | "packages" | "enterprise";

export default function PurchaseCreditsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buy");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.name || user.email.split("@")[0];

  const paymentLink = "https://fs12.formsite.com/C2Ygy3/bycqdj8y9g/index";

  return (
    <div className="flex min-h-screen bg-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white p-4 shadow-lg transition-transform duration-200 ease-out md:static md:z-auto md:block md:translate-x-0 md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">CREDIT FLOW AI</h2>
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Account
            </p>
            <Link
              href="/dashboard/setup"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Setup Client Portal
            </Link>
            <Link
              href="/dashboard/manage"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Manage My CRO Account
            </Link>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Main
            </p>
            <Link
              href="/dashboard"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Home
            </Link>
            <Link
              href="/dashboard/affiliate"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Credit Flow AI Affiliate
            </Link>
            <Link
              href="/dashboard/purchase"
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
            >
              Purchase Attack Credits
            </Link>
            <Link
              href="/dashboard/attack"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Attack Area
            </Link>
            <Link
              href="/dashboard/history"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Attack History
            </Link>
            <Link
              href="/dashboard/clients"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Manage My Clients
            </Link>
            <Link
              href="/dashboard/client-account"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Manage My Own Client Account
            </Link>
            <Link
              href="/dashboard/scoreboard"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Client Scoreboard
            </Link>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Support
            </p>
            <Link
              href="/dashboard/support"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Get Credit Flow AI Support
            </Link>
            <Link
              href="/dashboard/faq"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              FAQ
            </Link>
            <Link
              href="/dashboard/training"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Training Videos
            </Link>
            <Link
              href="/dashboard/credit-report"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Get Credit Report Here
            </Link>
            <Link
              href="/dashboard/become-affiliate"
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              Become an Affiliate
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-4 md:px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  CREDIT FLOW AI
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Purchase content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Get Started
            </h2>

            {/* Tabs */}
            <div className="mb-6 inline-flex rounded-full border border-emerald-500 bg-emerald-50 p-1 text-sm font-medium text-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab("buy")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "buy"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-700 hover:bg-emerald-100"
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
                    : "text-emerald-700 hover:bg-emerald-100"
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
                    : "text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                Enterprise Plans
              </button>
            </div>

            {/* Pricing cards */}
            {activeTab === "buy" && (
              <section className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Only $35
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
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
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-base font-semibold text-gray-900">
                    Only $150
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Includes 5 Credits i.e. $30/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-gray-600">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Save $25
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    Only $250
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Includes 10 Credits i.e. $25/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-gray-700">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Save $100
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    Only $500
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Includes 20 Credits i.e. $25/Credit
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-gray-700">
                    <li>Do Not Expire</li>
                    <li>No Subscription Needed</li>
                  </ul>
                </div>
              </section>
            )}

            {activeTab === "enterprise" && (
              <section className="mb-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $1000
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      Only $2000
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Limited to 100 Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                      <li>Expires in 30 Days</li>
                      <li>
                        Subscription Needed - Credits Rollover If Renewed
                        Monthly
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $77500
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      Only $10,000
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Limited to 2,500 Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                      <li>Expires in 365 Days</li>
                      <li>
                        Subscription Needed - Credits Rollover If Renewed Yearly
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $30000
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      Only $5000
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Unlimited Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                      <li>Expires in 30 Days</li>
                      <li>Subscription Needed - Credits Do Not Rollover</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      Save $1M
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      Only $50,000
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Unlimited Credits
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
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
                className="break-all text-sm text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
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

