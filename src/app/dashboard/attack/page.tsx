"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function AttackAreaPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

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

  function handleAlertOK() {
    setShowAlert(false);
    router.push("/dashboard/purchase");
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
      {/* Alert Dialog */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900">
                creditflowai.com says
              </h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-700">
                Please Buy Credits To Generate Letters
              </p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={handleAlertOK}
                className="w-full rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <DashboardSidebar
        currentPath="/dashboard/attack"
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

        {/* Attack Area content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] px-4 py-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Attack Area
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-center text-gray-600">
                Please purchase credits to access the Attack Area.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
