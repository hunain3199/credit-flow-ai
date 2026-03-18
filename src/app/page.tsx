"use client";

import { useState, FormEvent } from "react";

// export default function Home() {
//   redirect("/signup");
// }

/* ========== PREVIOUS HOME PAGE (commented out) ========== */
/*
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Credit Flow AI
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          This is your authenticated app shell. Use the buttons below to sign
          up or log in.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/signup"
            className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-50 shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Create account
          </a>
          <a
            href="/login"
            className="flex w-full items-center justify-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Log in
          </a>
        </div>
      </main>
    </div>
  );
}
*/




import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/dashboard/_context/language-context";

export default function Page() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/product-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          creditScore: creditScore.trim() === "" ? undefined : Number(creditScore),
        }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.message || t.landing.errorMessage,
        });
        return;
      }
      setMessage({
        type: "success",
        text: data.message || t.landing.successMessage,
      });
      setName("");
      setEmail("");
      setCreditScore("");
    } catch {
      setMessage({
        type: "error",
        text: t.landing.errorMessagePleaseTryAgain,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a2a] text-white flex flex-col">
      {/* Coming Soon Page */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <Link href="/" className="mb-12">
          <div className="relative h-20 w-auto md:h-24">
            <Image
              src="/logo.png"
              alt="CreditFlow AI Logo"
              width={220}
              height={96}
              className="h-auto w-auto object-contain"
              priority
            />
          </div>
        </Link>
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-center mb-4">
          {t.landing.comingSoonTitle}
        </h1>
        <p className="text-lg text-blue-200 md:text-xl text-center max-w-md mb-8">
          {t.landing.heroDescription}
        </p>

        {/* Product updates signup form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 w-full max-w-md rounded-2xl border border-blue-800/50 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
        >
          <p className="mb-4 text-center text-sm text-blue-200">
            {t.landing.productUpdatesIntro}
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-blue-200">
                {t.landing.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.landing.namePlaceholder}
                className="w-full rounded-lg border border-blue-800/50 bg-white/10 px-4 py-2.5 text-white placeholder-blue-300/60 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-blue-200">
                {t.landing.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.landing.emailPlaceholder}
                className="w-full rounded-lg border border-blue-800/50 bg-white/10 px-4 py-2.5 text-white placeholder-blue-300/60 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <div>
              <label htmlFor="creditScore" className="mb-1 block text-sm font-medium text-blue-200">
                {t.landing.creditScoreLabel}
              </label>
              <input
                id="creditScore"
                type="number"
                min={300}
                max={850}
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                placeholder={t.landing.creditScorePlaceholder}
                className="w-full rounded-lg border border-blue-800/50 bg-white/10 px-4 py-2.5 text-white placeholder-blue-300/60 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? t.landing.submitting : t.landing.notifyMe}
            </button>
          </div>
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.type === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>

        <div className="flex gap-4 rounded-full bg-white/5 px-6 py-3 border border-blue-800/50">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-blue-200">{t.landing.stayTuned}</span>
        </div>
      </main>

      <footer className="border-t border-blue-900/30 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-blue-300">
          <p>{t.landing.footerCopyright}</p>
        </div>
      </footer>

      {/* ========== LANDING PAGE (commented out) ========== */}
      {/* 
    <div className="min-h-screen bg-[#0a0a2a] text-white">
      <header className="sticky top-0 z-50 border-b border-blue-900/30 bg-[#0a0a2a]/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="#home" className="flex items-center gap-3">
            <div className="relative h-16 w-auto md:h-20">
              <Image
                src="/logo.png"
                alt="CreditFlow AI Logo"
                width={180}
                height={80}
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#home" className="text-sm font-medium text-white transition hover:text-emerald-400">Home</a>
            <a href="#about" className="text-sm font-medium text-white transition hover:text-emerald-400">About</a>
            <a href="#services" className="text-sm font-medium text-white transition hover:text-emerald-400">Services</a>
            <a href="#testimonials" className="text-sm font-medium text-white transition hover:text-emerald-400">Testimonials</a>
          </div>
          <Link href="/login" className="rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-600 md:px-8 md:py-3.5 md:text-lg">Get Started</Link>
        </nav>
      </header>
      <section id="home" className="relative overflow-hidden px-4 py-16 md:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Fix Your Credit the <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Smart Way</span>
            </h1>
            <p className="text-lg text-blue-200 md:text-xl">Leverage AI-driven solutions to repair and boost your credit.</p>
            <Link href="/signup" className="inline-block rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-500 hover:to-emerald-700">Get Started Now</Link>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="relative z-10 w-full max-w-full lg:w-full">
                <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/10 bg-transparent shadow-2xl lg:h-[600px]">
                  <Image src="/image 13.png" alt="CreditFlow AI product preview" fill priority className="object-contain" sizes="(min-width: 1024px) 100vw, (min-width: 640px) 100vw, 100vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-blue-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 backdrop-blur-sm">
              <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                <Image src="/aipowered.png" alt="AI-Powered" width={600} height={384} className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-blue-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 backdrop-blur-sm">
              <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                <Image src="/fasterresults.png" alt="Faster Results" width={600} height={384} className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-blue-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 backdrop-blur-sm">
              <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                <Image src="/betterfunding.png" alt="Better Funding" width={600} height={384} className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">See Real Results</h2>
          <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12">
            <div className="flex flex-col items-center">
              <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-xl md:h-[500px] md:max-w-[600px]">
                <Image src="/person.png" alt="Jason M." fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-blue-900/30 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-blue-300">
          <p>&copy; 2026 CreditFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
    */}
    </div>
  );
}