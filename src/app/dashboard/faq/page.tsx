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

const FAQ_ITEMS = [
  {
    question: "Attack Type Initials and Names",
    answer: `Attack Type Initials and Name:

BAS [Base Attack Types]:
- FDA = Factual Disputing Attack
- CLA = Consumer Law Attack
- OM2C = Original Metro 2 Compliance
- LAVA = Lawful Accuracy Verification Analytics

CATS [Combined Attack Types]:
- GAS-D = Global Automated Strategies per Destination
- GAS-T = Global Automated Strategies per Item
- GAS-N = Global Automated Strategies per Primary Negativity Type

FIRE-D = Factual Forensic In-depth Investigative Review & Remediation Escalation per Destination
FIRE-T = Factual Forensic In-depth Investigative Review & Remediation Escalation per Item
FIRE-N = Factual Forensic In-depth Investigative Review & Remediation Escalation per Primary Negativity Type

SANs [Super Attack Types]:
- MILKA-DAD = Multiple Item attack with limited key arguments against deviations in data accuracy
- SEEM-MIC = Super Enhanced & Effective Metro2 Multiple Item Challenge
- SILKA-DAD = Single Item attack with limited key arguments against deviations in data accuracy
- SEEM-SIC = Super Enhanced & Effective Metro2 Single Item Challenge

LATs [Content Box Level Attack Types]:
- ICBA = Item-based Content Box Level Attacks
- DCBA = Destination-based Content Box Level Attacks
- NCBA = Primary Negativity Type-based Content Box Level Attacks`,
  },
  {
    question: "What does Attack Focus mean?",
    answer:
      "The software creates letters for each bureau (TransUnion, Experian, Equifax) and each destination or creditor tied to the selected attack strategy.",
  },
  {
    question: "What is Attack Destination?",
    answer:
      "Attack destination is the bureau or data furnisher/creditor where the dispute letter is routed.",
  },
  {
    question: "How much credits cost",
    answer: "Please click here to view the pricing details.",
  },
  {
    question: "How long after I purchase a credit does it show up in my account?",
    answer:
      "Credits usually appear in your account within 24 hours. If they do not appear after that, submit a support ticket.",
  },
];

export default function FaqPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <main className="flex-1 overflow-y-auto bg-[#0a0a2a] px-3 py-6 sm:px-4 md:px-6 lg:px-8 md:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-4 text-4xl font-semibold text-gray-900">FAQs</h2>

            <div className="border border-teal-300">
              {FAQ_ITEMS.map((item, index) => {
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
