"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function ManageClientsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

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
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
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
        <header className="border-b border-gray-200 bg-white px-3 py-3 sm:px-4 md:px-6 md:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 md:hidden"
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
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white sm:h-10 sm:w-10">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <p className="truncate text-sm font-medium text-gray-900">
                  {userName}
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center justify-between gap-2 sm:justify-end">
              <h1 className="truncate text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                CREDIT FLOW AI
              </h1>
              <button
                onClick={handleLogout}
                className="rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Manage clients content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
              Manage All Clients
            </h2>

            {/* Stats bar */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-800 sm:mb-6 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">👥</span>
                <span className="font-medium">Total client(s)</span>
                <span className="ml-1 text-lg font-semibold">1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">💳</span>
                <span className="font-medium">Credits Used</span>
                <span className="ml-1 text-lg font-semibold">0</span>
              </div>
            </div>

            {/* Tabs + controls */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full justify-center rounded-full border border-emerald-500 bg-emerald-50 p-1 text-sm sm:w-auto sm:justify-start">
                <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  All Clients
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <button className="rounded border border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 sm:px-4 sm:py-2">
                  ⬇ Export CSV
                </button>
                <button className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2">
                  + Add New Client
                </button>
                <button className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-4 sm:py-2">
                  Import Client
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-3 flex justify-end">
              <div className="relative w-full min-w-0 max-w-full sm:max-w-xs">
                <input
                  type="text"
                  className="w-full min-w-0 rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Search"
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

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="min-w-[640px] w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-emerald-600 text-xs font-semibold uppercase tracking-wide text-white">
                    <tr>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">Full Name</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">Added By</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">Email</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">Date Added</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left sm:px-4 sm:py-3">Action(s)</th>
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
                      <td className="whitespace-nowrap px-2 py-2 text-gray-900 sm:px-4 sm:py-3">Sample Client</td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-800 sm:px-4 sm:py-3">{userName}</td>
                      <td className="min-w-[140px] px-2 py-2 text-gray-700 sm:px-4 sm:py-3">
                        <span className="break-all">sampleclient@example.com</span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-700 sm:px-4 sm:py-3">
                        February-16-2026
                      </td>
                      <td className="px-2 py-2 sm:px-4 sm:py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100 sm:p-1.5"
                            aria-label="Edit client"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100 sm:p-1.5"
                            aria-label="View client"
                          >
                            👁️
                          </button>
                          <button
                            type="button"
                            className="rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-600 sm:px-3"
                          >
                            Upload Report
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

