"use client";

import { ThemeProvider } from "@/app/dashboard/_context/theme-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
}
