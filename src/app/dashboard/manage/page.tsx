"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";

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
        currentPath="/dashboard/manage"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] px-4 py-6 md:px-8">
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

