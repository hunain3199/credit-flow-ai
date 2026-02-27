"use client";

import { ReactNode } from "react";

interface DashboardHeaderProps {
  userName: string;
  onOpenSidebar: () => void;
  onLogout: () => void;
  leftExtras?: ReactNode;
}

export default function DashboardHeader({
  userName,
  onOpenSidebar,
  onLogout,
  leftExtras,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-blue-900/30 bg-[#0a0a2a]/95 px-3 py-3 backdrop-blur-sm sm:px-4 md:px-6 md:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-blue-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 md:hidden"
            onClick={onOpenSidebar}
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
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white sm:h-10 sm:w-10">
              {userName.charAt(0).toUpperCase()}
            </div>
            <p className="truncate text-sm font-medium text-white">{userName}</p>
          </div>
          {leftExtras}
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-end">
          <button
            onClick={onLogout}
            className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 sm:px-4 sm:py-2 sm:text-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
