"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useLanguage } from "@/app/dashboard/_context/language-context";

interface User {
  id: string;
  email: string;
  name: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a]">
        <div className="text-lg text-blue-200">{t.dashboard.loading}</div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.name || user.email.split("@")[0];

  return (
    <div className="dashboard-theme flex min-h-screen bg-[#0a0a2a]">
      <DashboardSidebar
        currentPath="/dashboard"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:ml-0">
        {/* Top Header */}
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] p-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {t.dashboard.welcome.replace("{name}", userName)}
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
                    {t.dashboard.clientSignUp}
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                {t.dashboard.creditFlowClientSignUp}
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    {t.dashboard.freeScoreNow}
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                {t.dashboard.myFreeScoreNow}
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xl">⚔️</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    {t.dashboard.attackArea}
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                {t.dashboard.attackArea}
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-600 flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    {t.dashboard.buyCredits}
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700">
                {t.dashboard.buyAttackCreditsHere}
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 aspect-video w-full rounded bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    {t.dashboard.creditReport}
                  </p>
                </div>
              </div>
              <button className="w-full rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                {t.dashboard.getCreditReportHere}
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                {t.dashboard.totalClients}
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                {t.dashboard.complementaryCredits}
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">{t.dashboard.expiryDate}: {t.dashboard.na}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                {t.dashboard.availableCredits}
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">{t.dashboard.expiryDate}: {t.dashboard.na}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                {t.dashboard.usedCredits}
              </h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">{t.dashboard.expiryDate}: {t.dashboard.na}</p>
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
                  {t.dashboard.attendMetro2Monday}
                </h3>
                <p className="text-sm text-gray-600">{t.dashboard.meetingCode}: 222888</p>
              </div>
            </div>
          </div>

          {/* Portal Links */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {t.dashboard.clientPortal}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {t.dashboard.clientPortalDesc}
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
                  {t.dashboard.copy}
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {t.dashboard.affiliateLink}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {t.dashboard.affiliateLinkDesc}
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
                  {t.dashboard.copy}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.dashboard.profileCompletion}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              {t.dashboard.profileCompletePercent}
            </p>
            <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{ width: "80%" }}
              ></div>
            </div>
            <button className="rounded bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
              {t.dashboard.completeYourProfile}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
