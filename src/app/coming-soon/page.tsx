"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/dashboard/_context/language-context";

export default function ComingSoonPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a2a] text-white">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <Link href="/" className="mb-10 text-center">
          <div className="relative mx-auto h-20 w-auto md:h-24">
            <Image
              src="/logo.png"
              alt="CreditFlow AI Logo"
              width={220}
              height={96}
              className="h-auto w-auto object-contain"
              priority
            />
          </div>
          <p className="mt-2 text-sm text-blue-200">{t.landing.comingSoonTagline}</p>
        </Link>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          {t.landing.comingSoonTitle}
        </h1>

        <p className="mb-8 max-w-md text-center text-lg text-blue-200 md:text-xl">
          {t.landing.heroDescription}
        </p>

        <div className="flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/5 px-6 py-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-white">{t.landing.stayTuned}</span>
        </div>
      </main>

      <footer className="border-t border-blue-900/30 px-4 py-6">
        <p className="text-center text-sm text-blue-300">
          {t.landing.footerCopyright}
        </p>
      </footer>
    </div>
  );
}
