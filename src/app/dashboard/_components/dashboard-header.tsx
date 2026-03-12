"use client";

import { useLanguage } from "@/app/dashboard/_context/language-context";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import type { Locale } from "@/app/dashboard/_lib/translations";

interface DashboardHeaderProps {
  userName: string;
  onOpenSidebar: () => void;
  onLogout: () => void;
  leftExtras?: React.ReactNode;
}

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "SP",
  cr: "CR",
};

export default function DashboardHeader({
  userName,
  onOpenSidebar,
  onLogout,
  leftExtras,
}: DashboardHeaderProps) {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  const headerBg = isLight ? "bg-slate-100/95" : "bg-[#0a0a2a]/95";
  const headerBorder = isLight ? "border-slate-200" : "border-blue-900/30";
  const textMuted = isLight ? "text-slate-600" : "text-blue-200";
  const btnHover = isLight ? "hover:bg-slate-200/80" : "hover:bg-white/10";
  const langInactive = isLight ? "text-slate-600 hover:bg-slate-200/80" : "text-blue-200 hover:bg-white/10";

  return (
    <header
      className={`border-b ${headerBorder} ${headerBg} px-3 py-3 backdrop-blur-sm sm:px-4 md:px-6 md:py-4`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            className={`inline-flex shrink-0 items-center justify-center rounded-md p-2 ${textMuted} ${btnHover} focus:outline-none focus:ring-2 focus:ring-emerald-500 md:hidden`}
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
            <p className={`truncate text-sm font-medium ${isLight ? "text-slate-800" : "text-white"}`}>
              {userName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(["en", "es", "cr"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                className={`rounded px-2 py-1 text-xs font-medium sm:px-2.5 sm:py-1.5 ${
                  locale === loc
                    ? "bg-emerald-500/80 text-white"
                    : langInactive
                }`}
                title={
                  loc === "en"
                    ? "English"
                    : loc === "es"
                      ? "Spanish"
                      : "Creole"
                }
              >
                {localeLabels[loc]}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className={`rounded p-1.5 ${textMuted} ${btnHover} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLight ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </button>
          </div>
          {leftExtras}
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:justify-end">
          <button
            onClick={onLogout}
            className="rounded bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 sm:px-4 sm:py-2 sm:text-sm"
          >
            {t.header.logOut}
          </button>
        </div>
      </div>
    </header>
  );
}
