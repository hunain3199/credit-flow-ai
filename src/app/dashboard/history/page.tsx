"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function AttackHistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
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

        {/* Attack History content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Attack History
            </h2>

            {/* Search and Action Bar */}
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Letters"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <Link
                href="/dashboard/attack"
                className="inline-flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Go To Attack Area
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-green-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2">All</span>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        <div className="flex items-center gap-1">
                          Client(s)
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                          </svg>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        <div className="flex items-center gap-1">
                          Created Date
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                          </svg>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        <div className="flex items-center gap-1">
                          Date of Last Attack
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                          </svg>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Letter Files
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        PPAMS Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        Number of Files
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">
                        <div className="flex items-center gap-1">
                          Action(s)
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {/* Empty state */}
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-12 text-center text-sm text-gray-500"
                      >
                        No attack history records found.
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
