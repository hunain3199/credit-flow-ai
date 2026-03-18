"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

export default function FaqPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const u = getStoredUser();
    const token = getStoredToken();
    if (!u || !token) {
      router.push("/login");
      return;
    }
    setUser(u);
    setLoading(false);
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a]">
        <p className="text-sm text-blue-200">{t.dashboard.loading}</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = getDisplayName(user);

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/faq"
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
            <h2 className="mb-4 text-4xl font-semibold text-gray-900">
              {t.faq.pageTitle}
            </h2>

            <div className="border border-teal-300">
              {t.faq.items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full border-b border-white bg-teal-400 px-2 py-2 text-left text-sm font-medium text-white hover:bg-teal-500"
                    >
                      {item.question}
                    </button>

                    {isOpen && (
                      <div className="bg-white px-2 py-3 text-xs leading-5 text-gray-800 whitespace-pre-line">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
