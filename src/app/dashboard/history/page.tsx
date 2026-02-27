"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";

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
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a]">
        <p className="text-sm text-blue-200">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.name || user.email.split("@")[0];

  return (
    <div className="dashboard-theme flex min-h-screen bg-[#0a0a2a]">
      <DashboardSidebar
        currentPath="/dashboard/history"
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

        {/* Attack History content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              Attack History
            </h2>

            {/* Search and Action Bar */}
            <div className="mb-4 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full min-w-0 flex-1 md:max-w-md">
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
                  className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 sm:w-auto"
              >
                <svg
                  className="h-5 w-5 shrink-0"
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

            {/* Table – desktop and larger */}
            <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-gray-200">
                  <thead className="bg-green-600">
                    <tr>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2">All</span>
                      </th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">#</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Client(s)</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Created Date</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Date of Last Attack</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Letter Files</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">PPAMS Status</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Number of Files</th>
                      <th className="whitespace-nowrap px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-white sm:px-4 sm:py-3">Action(s)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {/* Empty state */}
                    <tr>
                      <td
                        colSpan={9}
                        className="px-3 py-8 text-center text-sm text-gray-500 sm:px-4 sm:py-12"
                      >
                        No attack history records found.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-center text-sm text-gray-500 md:hidden">
              No attack history records found.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
