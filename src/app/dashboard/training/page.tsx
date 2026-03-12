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

const trainingCards = [
  { title: "Super Simple Outline Of Steps to enter Client details OM2C-PROPERLY.", type: "doc" },
  { title: "Software Related Terminologies", type: "doc" },
  { title: "2023 CDIA's CRRG aka Metro 2 Guidelines", type: "video" },
  { title: "Software Enhancements", type: "doc" },
  { title: "Common facts about M2Gala software", type: "doc" },
  { title: "M2 GALA Client Sign-Up", type: "video" },
  { title: "How to Register in M2 Gala", type: "video" },
] as const;

export default function TrainingVideosPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { theme } = useTheme();
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
        currentPath="/dashboard/training"
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
            <h2 className="mb-6 text-4xl font-semibold text-gray-900">Education Room</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {trainingCards.map((card, idx) => (
                <div key={`${card.title}-${idx}`} className="text-center">
                  <div className="mb-3 overflow-hidden border border-gray-400 bg-white">
                    {card.type === "video" ? (
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/o-kwvuuvd6U?si=sDflbkx5stFdgsil"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="h-[240px] w-full"
                      />
                    ) : (
                      <div className="flex h-[240px] w-full items-center justify-center bg-gray-50 px-4">
                        <p className="text-sm text-gray-700">
                          Training document preview
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-800">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
