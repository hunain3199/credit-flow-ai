"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/app/dashboard/_context/language-context";

export default function LanguageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname.startsWith("/login/") || pathname.startsWith("/signup/");

  if (isAuthPage) return <>{children}</>;

  return <LanguageProvider>{children}</LanguageProvider>;
}

