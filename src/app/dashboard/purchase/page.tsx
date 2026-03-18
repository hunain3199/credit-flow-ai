"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import { useTheme } from "@/app/dashboard/_context/theme-context";
import { useLanguage } from "@/app/dashboard/_context/language-context";
import { getStoredUser, getStoredToken, clearAuth, getDisplayName } from "@/lib/auth-client";

type TabKey = "buy" | "packages" | "enterprise";

export default function PurchaseCreditsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buy");

  const purchaseCopy = {
    en: {
      pageTitle: "Get Started",
      tabBuy: "Buy As You Go",
      tabPackages: "Package Tiers",
      tabEnterprise: "Enterprise Plans",
      choosePlan: "Choose Plan",
      paymentCta: "Click below link to make payment",
      buy: {
        only: "Only $35",
        includes: "Includes 1 Credit",
        noExpire: "Does Not Expire",
        noSubscription: "No Subscription Needed",
      },
      packages: {
        save25: "Save $25",
        save100: "Save $100",
        only150: "Only $150",
        includes5: "Includes 5 Credits i.e. $30/Credit",
        only250: "Only $250",
        includes10: "Includes 10 Credits i.e. $25/Credit",
        only500: "Only $500",
        includes20: "Includes 20 Credits i.e. $25/Credit",
        doNotExpire: "Do Not Expire",
        noSubscriptionNeeded: "No Subscription Needed",
      },
      enterprise: {
        save1000: "Save $1000",
        save77500: "Save $77500",
        save30000: "Save $30000",
        save1M: "Save $1M",
        only2000: "Only $2000",
        only10000: "Only $10,000",
        only5000: "Only $5000",
        only50000: "Only $50,000",
        limited100: "Limited to 100 Credits",
        limited2500: "Limited to 2,500 Credits",
        unlimited: "Unlimited Credits",
        expires30: "Expires in 30 Days",
        expires365: "Expires in 365 Days",
        subscriptionRolloverMonthly:
          "Subscription Needed - Credits Rollover If Renewed Monthly",
        subscriptionRolloverYearly:
          "Subscription Needed - Credits Rollover If Renewed Yearly",
        subscriptionNoRollover:
          "Subscription Needed - Credits Do Not Rollover",
      },
    },
    es: {
      pageTitle: "Comenzar",
      tabBuy: "Pagar según uso",
      tabPackages: "Niveles por paquete",
      tabEnterprise: "Planes empresariales",
      choosePlan: "Elegir plan",
      paymentCta: "Haz clic en el enlace de abajo para realizar el pago",
      buy: {
        only: "Solo $35",
        includes: "Incluye 1 crédito",
        noExpire: "No vence",
        noSubscription: "No se necesita suscripción",
      },
      packages: {
        save25: "Ahorra $25",
        save100: "Ahorra $100",
        only150: "Solo $150",
        includes5: "Incluye 5 créditos, es decir, $30/crédito",
        only250: "Solo $250",
        includes10: "Incluye 10 créditos, es decir, $25/crédito",
        only500: "Solo $500",
        includes20: "Incluye 20 créditos, es decir, $25/crédito",
        doNotExpire: "No vence",
        noSubscriptionNeeded: "No se necesita suscripción",
      },
      enterprise: {
        save1000: "Ahorra $1000",
        save77500: "Ahorra $77,500",
        save30000: "Ahorra $30,000",
        save1M: "Ahorra $1M",
        only2000: "Solo $2000",
        only10000: "Solo $10,000",
        only5000: "Solo $5000",
        only50000: "Solo $50,000",
        limited100: "Limitado a 100 créditos",
        limited2500: "Limitado a 2,500 créditos",
        unlimited: "Créditos ilimitados",
        expires30: "Vence en 30 días",
        expires365: "Vence en 365 días",
        subscriptionRolloverMonthly:
          "Se requiere suscripción: los créditos se acumulan si se renueva mensualmente",
        subscriptionRolloverYearly:
          "Se requiere suscripción: los créditos se acumulan si se renueva anualmente",
        subscriptionNoRollover:
          "Se requiere suscripción: los créditos no se acumulan",
      },
    },
    cr: {
      pageTitle: "Kòmanse",
      tabBuy: "Peye jan ou itilize",
      tabPackages: "Nivo pake",
      tabEnterprise: "Plan antrepriz",
      choosePlan: "Chwazi plan",
      paymentCta: "Klike lyen ki anba a pou fè peman",
      buy: {
        only: "Sèlman $35",
        includes: "Gen ladan 1 Kredi",
        noExpire: "Pa ekspire",
        noSubscription: "Pa bezwen abònman",
      },
      packages: {
        save25: "Ekonomi $25",
        save100: "Ekonomi $100",
        only150: "Sèlman $150",
        includes5: "Gen ladan 5 Kredi, sa vle di $30/Kredi",
        only250: "Sèlman $250",
        includes10: "Gen ladan 10 Kredi, sa vle di $25/Kredi",
        only500: "Sèlman $500",
        includes20: "Gen ladan 20 Kredi, sa vle di $25/Kredi",
        doNotExpire: "Pa ekspire",
        noSubscriptionNeeded: "Pa bezwen abònman",
      },
      enterprise: {
        save1000: "Ekonomi $1000",
        save77500: "Ekonomi $77,500",
        save30000: "Ekonomi $30,000",
        save1M: "Ekonomi $1M",
        only2000: "Sèlman $2000",
        only10000: "Sèlman $10,000",
        only5000: "Sèlman $5000",
        only50000: "Sèlman $50,000",
        limited100: "Limite a 100 Kredi",
        limited2500: "Limite a 2,500 Kredi",
        unlimited: "Kredi san limit",
        expires30: "Ekspire nan 30 jou",
        expires365: "Ekspire nan 365 jou",
        subscriptionRolloverMonthly:
          "Abònman obligatwa - kredi yo akimile si w renouvle chak mwa",
        subscriptionRolloverYearly:
          "Abònman obligatwa - kredi yo akimile si w renouvle chak ane",
        subscriptionNoRollover:
          "Abònman obligatwa - kredi yo pa akimile",
      },
    },
  }[locale];

  useEffect(() => {
    const u = getStoredUser();
    const token = getStoredToken();
    if (!u || !token) {
      router.push("/login");
      return;
    }
    setUser(u);
    setLoading(false);
  }, [router]);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a]">
        <p className="text-sm text-blue-200">{t.dashboard.loading}</p>
      </div>
    );
  }

  if (!user) return null;

  const userName = getDisplayName(user);

  const paymentLink = "https://fs12.formsite.com/C2Ygy3/bycqdj8y9g/index";

  return (
    <div className={`dashboard-theme flex min-h-screen ${theme === "light" ? "dashboard-theme-light" : "bg-[#0a0a2a]"}`}>
      <DashboardSidebar
        currentPath="/dashboard/purchase"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <DashboardHeader
          userName={userName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Purchase content */}
        <main className={`flex-1 overflow-y-auto px-4 py-8 md:px-8 ${theme === "light" ? "bg-slate-100" : "bg-[#0a0a2a]"}`}>
          <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {purchaseCopy.pageTitle}
            </h2>

            {/* Tabs */}
            <div className="mb-6 inline-flex rounded-full border border-blue-800/50 bg-white/10 p-1 text-sm font-medium text-blue-100">
              <button
                type="button"
                onClick={() => setActiveTab("buy")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "buy"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                {purchaseCopy.tabBuy}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("packages")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "packages"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                {purchaseCopy.tabPackages}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("enterprise")}
                className={`rounded-full px-4 py-2 ${
                  activeTab === "enterprise"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-200 hover:bg-white/10"
                }`}
              >
                {purchaseCopy.tabEnterprise}
              </button>
            </div>

            {/* Pricing cards */}
            {activeTab === "buy" && (
              <section className="mb-8 rounded-lg border border-blue-800/50 bg-white/10 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {purchaseCopy.buy.only}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-blue-100">
                      <li>{purchaseCopy.buy.includes}</li>
                      <li>{purchaseCopy.buy.noExpire}</li>
                      <li>{purchaseCopy.buy.noSubscription}</li>
                    </ul>
                  </div>
                  <button className="mt-3 w-full rounded bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 md:mt-0 md:w-auto">
                    {purchaseCopy.choosePlan}
                  </button>
                </div>
              </section>
            )}

            {activeTab === "packages" && (
              <section className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-800/50 bg-white/10 p-4">
                  <p className="text-base font-semibold text-white">
                    {purchaseCopy.packages.only150}
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    {purchaseCopy.packages.includes5}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-200">
                    <li>{purchaseCopy.packages.doNotExpire}</li>
                    <li>{purchaseCopy.packages.noSubscriptionNeeded}</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {purchaseCopy.packages.save25}
                  </div>
                  <p className="text-base font-semibold text-white">
                    {purchaseCopy.packages.only250}
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    {purchaseCopy.packages.includes10}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-100">
                    <li>{purchaseCopy.packages.doNotExpire}</li>
                    <li>{purchaseCopy.packages.noSubscriptionNeeded}</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                  <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {purchaseCopy.packages.save100}
                  </div>
                  <p className="text-base font-semibold text-white">
                    {purchaseCopy.packages.only500}
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    {purchaseCopy.packages.includes20}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-100">
                    <li>{purchaseCopy.packages.doNotExpire}</li>
                    <li>{purchaseCopy.packages.noSubscriptionNeeded}</li>
                  </ul>
                </div>
              </section>
            )}

            {activeTab === "enterprise" && (
              <section className="mb-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-blue-800/50 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {purchaseCopy.enterprise.save1000}
                    </div>
                    <p className="text-base font-semibold text-white">
                      {purchaseCopy.enterprise.only2000}
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      {purchaseCopy.enterprise.limited100}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>{purchaseCopy.enterprise.expires30}</li>
                      <li>{purchaseCopy.enterprise.subscriptionRolloverMonthly}</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {purchaseCopy.enterprise.save77500}
                    </div>
                    <p className="text-base font-semibold text-white">
                      {purchaseCopy.enterprise.only10000}
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      {purchaseCopy.enterprise.limited2500}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>{purchaseCopy.enterprise.expires365}</li>
                      <li>{purchaseCopy.enterprise.subscriptionRolloverYearly}</li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {purchaseCopy.enterprise.save30000}
                    </div>
                    <p className="text-base font-semibold text-white">
                      {purchaseCopy.enterprise.only5000}
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      {purchaseCopy.enterprise.unlimited}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>{purchaseCopy.enterprise.expires30}</li>
                      <li>{purchaseCopy.enterprise.subscriptionNoRollover}</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-emerald-400/70 bg-white/10 p-4">
                    <div className="mb-1 inline-flex rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {purchaseCopy.enterprise.save1M}
                    </div>
                    <p className="text-base font-semibold text-white">
                      {purchaseCopy.enterprise.only50000}
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                      {purchaseCopy.enterprise.unlimited}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-blue-200">
                      <li>{purchaseCopy.enterprise.expires365}</li>
                      <li>{purchaseCopy.enterprise.subscriptionNoRollover}</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Payment link */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 text-sm font-semibold text-gray-800">
                {purchaseCopy.paymentCta}
              </p>
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
              >
                {paymentLink}
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

