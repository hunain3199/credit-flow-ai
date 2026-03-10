"use client";

import { LanguageProvider } from "@/app/dashboard/_context/language-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
