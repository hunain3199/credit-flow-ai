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
        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8">
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
                      <td className="whitespace-nowrap px-2 py-2 text-gray-900 sm:px-4 sm:py-3">
                        Sample Client
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-gray-800 sm:px-4 sm:py-3">
                        {userName}
                      </td>
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

            {/* Mobile card layout */}
            <div className="mt-4 space-y-3 md:hidden">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="font-semibold text-gray-900">Sample Client</div>
                  <span className="text-xs text-gray-500">February-16-2026</span>
                </div>
                <p className="mb-2 text-xs text-gray-700">
                  Added by <span className="font-medium">{userName}</span>
                </p>
                <p className="mb-3 break-all text-xs text-gray-700">
                  sampleclient@example.com
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100"
                    aria-label="Edit client"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-gray-300 p-1 text-gray-600 hover:bg-gray-100"
                    aria-label="View client"
                  >
                    👁️
                  </button>
                  <button
                    type="button"
                    className="rounded bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600"
                  >
                    Upload Report
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

