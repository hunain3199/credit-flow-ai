"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function ClientScoreboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedReport, setSelectedReport] = useState("");

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

  const bureaus = [
    { id: "tu", name: "TransUnion" },
    { id: "exp", name: "Experian" },
    { id: "eqf", name: "Equifax" },
  ];

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
              className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
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
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
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

        {/* Scoreboard content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Client&apos;s Score Board
            </h2>

            {/* Filters */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-gray-600">
                  Select client for score evaluation
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">Select Client(s)</option>
                  <option value="sample">Sample Client</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase text-gray-600">
                  Select Report
                </label>
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">Select Report</option>
                  <option value="latest">Latest Report</option>
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
                    <p className="text-xs text-gray-500">Prev Score: --</p>
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
                            Current Record
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">
                            Previous Record
                          </th>
                          <th className="px-4 py-2 text-right font-semibold">
                            Difference
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[
                          "Total Accounts",
                          "Closed Accounts",
                          "Delinquent",
                          "Derogatory",
                          "Inquiries",
                          "Public Records",
                        ].map((label) => (
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

