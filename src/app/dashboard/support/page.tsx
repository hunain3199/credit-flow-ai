"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function SupportPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");

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
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/support"
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
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Tickets Management
            </h2>

            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-[320px]">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L16.65 16.65M18.6 10.8C18.6 15.1078 15.1078 18.6 10.8 18.6C6.49218 18.6 3 15.1078 3 10.8C3 6.49218 6.49218 3 10.8 3C15.1078 3 18.6 6.49218 18.6 10.8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchTicket}
                  onChange={(e) => setSearchTicket(e.target.value)}
                  placeholder="Search ticket"
                  className="w-full rounded border border-gray-400 py-1.5 pl-9 pr-8 text-sm text-gray-800 outline-none focus:border-teal-500"
                />
                {searchTicket && (
                  <button
                    type="button"
                    onClick={() => setSearchTicket("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 hover:text-gray-800"
                    aria-label="Clear search"
                  >
                    <span className="text-base leading-none">×</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 sm:w-auto sm:py-1.5"
              >
                <span className="text-xs">⊕</span>
                Add Ticket
              </button>
            </div>

            <div className="lg:hidden">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-center text-sm text-gray-500">
                  No tickets found.
                </p>
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="bg-teal-400 text-left text-[11px] font-semibold text-white sm:text-xs">
                    <th className="whitespace-nowrap px-3 py-2"># All</th>
                    <th className="whitespace-nowrap px-3 py-2">Ticket #</th>
                    <th className="whitespace-nowrap px-3 py-2">Title</th>
                    <th className="whitespace-nowrap px-3 py-2">User</th>
                    <th className="whitespace-nowrap px-3 py-2">Status</th>
                    <th className="whitespace-nowrap px-3 py-2">Date Added</th>
                    <th className="whitespace-nowrap px-3 py-2">Action(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-6 text-center text-sm text-gray-500"
                    >
                      No tickets found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
