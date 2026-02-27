"use client";

import Link from "next/link";
import Image from "next/image";

interface DashboardSidebarProps {
  currentPath: string;
  sidebarOpen: boolean;
  onClose: () => void;
}

const accountItems = [
  { href: "/dashboard/setup", label: "Setup Client Portal" },
  { href: "/dashboard/manage", label: "Manage My CRO Account" },
];

const mainItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/affiliate", label: "Credit Flow AI Affiliate" },
  { href: "/dashboard/purchase", label: "Purchase Attack Credits" },
  { href: "/dashboard/attack", label: "Attack Area" },
  { href: "/dashboard/history", label: "Attack History" },
  { href: "/dashboard/clients", label: "Manage My Clients" },
  { href: "/dashboard/client-account", label: "Manage My Own Client Account" },
  { href: "/dashboard/scoreboard", label: "Client Scoreboard" },
];

const supportItems = [
  { href: "/dashboard/support", label: "Get Credit Flow AI Support" },
  { href: "/dashboard/faq", label: "FAQ" },
  { href: "/dashboard/training", label: "Training Videos" },
];

function itemClass(isActive: boolean) {
  return isActive
    ? "block rounded border border-blue-800/60 bg-white/10 px-3 py-2 text-sm font-medium text-emerald-300"
    : "block rounded px-3 py-2 text-sm text-blue-200 hover:bg-white/10 hover:text-emerald-300";
}

export default function DashboardSidebar({
  currentPath,
  sidebarOpen,
  onClose,
}: DashboardSidebarProps) {
  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-blue-900/40 bg-[#0a0a2a] p-4 shadow-lg transition-transform duration-200 ease-out md:static md:z-auto md:block md:translate-x-0 md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="CreditFlow AI Logo"
            width={220}
            height={88}
            className="h-auto w-auto max-w-[220px] object-contain"
            priority
          />
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-blue-300">Account</p>
            {accountItems.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(currentPath === item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-blue-300">Main</p>
            {mainItems.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(currentPath === item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase text-blue-300">Support</p>
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
              Get Credit Report Here
            </a>
            <Link href="/dashboard/become-affiliate" className={itemClass(currentPath === "/dashboard/become-affiliate")}>
              Become an Affiliate
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
