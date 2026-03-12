"use client";

import { LanguageProvider } from "@/app/dashboard/_context/language-context";
import { ThemeProvider } from "@/app/dashboard/_context/theme-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}
