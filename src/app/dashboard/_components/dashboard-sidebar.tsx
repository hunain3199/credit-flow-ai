"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { useTheme } from "@/app/dashboard/_context/theme-context";

interface DashboardSidebarProps {
  currentPath: string;
  sidebarOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  currentPath,
  sidebarOpen,
  onClose,
}: DashboardSidebarProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const itemClass = (isActive: boolean) =>
    isActive
      ? isLight
        ? "block rounded border border-emerald-500/60 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
        : "block rounded border border-blue-800/60 bg-white/10 px-3 py-2 text-sm font-medium text-emerald-300"
      : isLight
        ? "block rounded px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-emerald-600"
        : "block rounded px-3 py-2 text-sm text-blue-200 hover:bg-white/10 hover:text-emerald-300";

  const accountItems = [
    { href: "/dashboard/setup", label: t.sidebar.setupClientPortal },
    { href: "/dashboard/manage", label: t.sidebar.manageCroAccount },
  ];

  const mainItems = [
    { href: "/dashboard", label: t.sidebar.home },
    { href: "/dashboard/affiliate", label: t.sidebar.creditFlowAffiliate },
    { href: "/dashboard/purchase", label: t.sidebar.purchaseAttackCredits },
    { href: "/dashboard/attack", label: t.sidebar.attackArea },
    { href: "/dashboard/history", label: t.sidebar.attackHistory },
    { href: "/dashboard/clients", label: t.sidebar.manageClients },
    { href: "/dashboard/client-account", label: t.sidebar.manageOwnClientAccount },
    { href: "/dashboard/scoreboard", label: t.sidebar.clientScoreboard },
  ];

  const supportItems = [
    { href: "/dashboard/support", label: t.sidebar.getSupport },
    { href: "/dashboard/faq", label: t.sidebar.faq },
    { href: "/dashboard/training", label: t.sidebar.trainingVideos },
  ];

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r p-4 shadow-lg transition-transform duration-200 ease-out md:static md:z-auto md:block md:translate-x-0 md:shadow-none ${
          isLight ? "border-slate-200 bg-slate-50" : "border-blue-900/40 bg-[#0a0a2a]"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="CreditFlow AI Logo"
            width={220}
            height={88}
            className={`h-auto w-auto max-w-[220px] object-contain ${isLight ? "invert" : ""}`}
            priority
          />
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <p className={`text-xs font-semibold uppercase ${isLight ? "text-slate-500" : "text-blue-300"}`}>{t.sidebar.account}</p>
            {accountItems.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(currentPath === item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mb-4">
            <p className={`text-xs font-semibold uppercase ${isLight ? "text-slate-500" : "text-blue-300"}`}>{t.sidebar.main}</p>
            {mainItems.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(currentPath === item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mb-4">
            <p className={`text-xs font-semibold uppercase ${isLight ? "text-slate-500" : "text-blue-300"}`}>{t.sidebar.support}</p>
            {supportItems.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(currentPath === item.href)}>
                {item.label}
              </Link>
            ))}
            <a
              href="https://myfreescorenow.com/enroll/?AID=EpicGroupSolutionLLC&PID=75562"
              target="_blank"
              rel="noopener noreferrer"
              className={itemClass(false)}
            >
              {t.sidebar.getCreditReportHere}
            </a>
            <Link href="/dashboard/become-affiliate" className={itemClass(currentPath === "/dashboard/become-affiliate")}>
              {t.sidebar.becomeAffiliate}
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
