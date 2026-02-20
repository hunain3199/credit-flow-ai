"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      } catch (error) {
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
    } catch (error) {
      router.push("/login");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.name || user.email.split("@")[0];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile overlay */}
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
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
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
              className="block rounded bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:ml-0">
        {/* Top Header */}
        <header className="border-b border-gray-200 bg-white px-4 md:px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
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
                <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">
                  EN
                </button>
                <button className="rounded px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">
                  SP
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  CREDIT FLOW AI
                </h1>
                <div className="h-8 w-8 rounded bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CF</span>
                </div>
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Welcome, {userName}!
          </h2>

          {/* Feature Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    CLIENT SIGN UP
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                CREDIT FLOW AI CLIENT SIGN UP
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    FREE SCORE NOW
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                MY FREE SCORE NOW
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xl">⚔️</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    ATTACK AREA
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                Attack Area
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-600 flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    BUY CREDITS
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700">
                BUY ATTACK CREDITS HERE
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    CREDIT REPORT
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                Get Credit Report Here
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Total Clients
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Complementary Credits
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">Expiry Date: N/A</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Available Credits
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">Expiry Date: N/A</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Used Credits
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">Expiry Date: N/A</p>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-lg">📹</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  ATTEND METRO 2 MONDAY
                </h3>
                <p className="text-sm text-gray-600">Meeting Code: 222888</p>
              </div>
            </div>
          </div>

          {/* Portal Links */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Credit Flow AI Client Portal
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Use this link to invite clients to our secure portal to view
                their Epic Pro report, generated letters, and upload documents.
              </p>
              <div className="flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-3">
                <input
                  type="text"
                  readOnly
                  value="https://creditflowai.com/login/client-portal"
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://creditflowai.com/login/client-portal"
                    );
                  }}
                  className="rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Credit Flow AI Affiliate Link
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Use this link to invite Users To Signup Up.
              </p>
              <div className="flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-3">
                <input
                  type="text"
                  readOnly
                  value="https://creditflowai.com/register/affiliate"
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://creditflowai.com/register/affiliate"
                    );
                  }}
                  className="rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Profile Completion
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              Your Profile is 80% complete
            </p>
            <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{ width: "80%" }}
              ></div>
            </div>
            <button className="rounded bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
              Complete Your Profile
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
