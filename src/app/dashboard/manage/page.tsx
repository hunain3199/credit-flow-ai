"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function ManageCroAccountPage() {
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
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

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

      <div className="flex flex-1 flex-col">
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

        <main className="flex-1 overflow-y-auto bg-gray-50 py-6 px-4 md:px-8">
          <div className="mx-auto max-w-6xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Company Information
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Review and update your personal and company information.
                </p>
              </div>
              <button className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                Change Password
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Profile image + upload */}
            <div className="space-y-4 lg:col-span-1">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Profile Image
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl">
                  <span role="img" aria-label="profile">
                    👤
                  </span>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                  Upload
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* Personal info fields */}
            <div className="space-y-6 lg:col-span-3">
              <p className="text-sm font-semibold text-gray-800">
                Personal Information
              </p>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    First and Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Full name"
                    defaultValue={user.name ?? ""}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Social Security Number
                  </label>
                  <input
                    type="password"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="••••-••-••••"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="(000) 000-0000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Street Number and Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Street address"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="City"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="State"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="ZIP code"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium uppercase text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    defaultValue={user.email}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload sections */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-800">
              Verification Documents
            </p>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Please upload document proof of{" "}
                  <span className="font-medium">
                    photo identification
                  </span>{" "}
                  (Driver&apos;s License or State ID).
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>Upload File</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Please upload proof of{" "}
                  <span className="font-medium">
                    legal identification
                  </span>{" "}
                  or government proof of Social Security Number.
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>Upload File</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Please upload document proof of{" "}
                  <span className="font-medium">
                    address
                  </span>{" "}
                  (recent utility bill, lease, or bank statement).
                </p>
                <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span>Upload File</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium uppercase text-gray-500">
                Other Document Upload
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span>Upload File</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center rounded bg-emerald-500 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Update Information
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</div>
  );
}

