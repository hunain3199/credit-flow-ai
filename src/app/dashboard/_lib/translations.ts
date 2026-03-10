export type Locale = "en" | "es" | "cr";

export const translations: Record<
  Locale,
  {
    header: { logOut: string };
    sidebar: {
      account: string;
      setupClientPortal: string;
      manageCroAccount: string;
      main: string;
      home: string;
      creditFlowAffiliate: string;
      purchaseAttackCredits: string;
      attackArea: string;
      attackHistory: string;
      manageClients: string;
      manageOwnClientAccount: string;
      clientScoreboard: string;
      support: string;
      getSupport: string;
      faq: string;
      trainingVideos: string;
      getCreditReportHere: string;
      becomeAffiliate: string;
    };
    dashboard: {
      welcome: string;
      clientSignUp: string;
      creditFlowClientSignUp: string;
      freeScoreNow: string;
      myFreeScoreNow: string;
      attackArea: string;
      buyCredits: string;
      buyAttackCreditsHere: string;
      creditReport: string;
      getCreditReportHere: string;
      totalClients: string;
      complementaryCredits: string;
      availableCredits: string;
      usedCredits: string;
      expiryDate: string;
      na: string;
      attendMetro2Monday: string;
      meetingCode: string;
      clientPortal: string;
      clientPortalDesc: string;
      affiliateLink: string;
      affiliateLinkDesc: string;
      copy: string;
      profileCompletion: string;
      profileCompletePercent: string;
      completeYourProfile: string;
      loading: string;
    };
  }
> = {
  en: {
    header: { logOut: "Log Out" },
    sidebar: {
      account: "Account",
      setupClientPortal: "Setup Client Portal",
      manageCroAccount: "Manage My CRO Account",
      main: "Main",
      home: "Home",
      creditFlowAffiliate: "Credit Flow AI Affiliate",
      purchaseAttackCredits: "Purchase Attack Credits",
      attackArea: "Attack Area",
      attackHistory: "Attack History",
      manageClients: "Manage My Clients",
      manageOwnClientAccount: "Manage My Own Client Account",
      clientScoreboard: "Client Scoreboard",
      support: "Support",
      getSupport: "Get Credit Flow AI Support",
      faq: "FAQ",
      trainingVideos: "Training Videos",
      getCreditReportHere: "Get Credit Report Here",
      becomeAffiliate: "Become an Affiliate",
    },
    dashboard: {
      welcome: "Welcome, {name}!",
      clientSignUp: "CLIENT SIGN UP",
      creditFlowClientSignUp: "CREDIT FLOW AI CLIENT SIGN UP",
      freeScoreNow: "FREE SCORE NOW",
      myFreeScoreNow: "MY FREE SCORE NOW",
      attackArea: "ATTACK AREA",
      buyCredits: "BUY CREDITS",
      buyAttackCreditsHere: "BUY ATTACK CREDITS HERE",
      creditReport: "CREDIT REPORT",
      getCreditReportHere: "Get Credit Report Here",
      totalClients: "Total Clients",
      complementaryCredits: "Complementary Credits",
      availableCredits: "Available Credits",
      usedCredits: "Used Credits",
      expiryDate: "Expiry Date",
      na: "N/A",
      attendMetro2Monday: "ATTEND METRO 2 MONDAY",
      meetingCode: "Meeting Code",
      clientPortal: "Credit Flow AI Client Portal",
      clientPortalDesc:
        "Use this link to invite clients to our secure portal to view their Epic Pro report, generated letters, and upload documents.",
      affiliateLink: "Credit Flow AI Affiliate Link",
      affiliateLinkDesc: "Use this link to invite Users To Signup Up.",
      copy: "Copy",
      profileCompletion: "Profile Completion",
      profileCompletePercent: "Your Profile is 80% complete",
      completeYourProfile: "Complete Your Profile",
      loading: "Loading...",
    },
  },
  es: {
    header: { logOut: "Cerrar sesión" },
    sidebar: {
      account: "Cuenta",
      setupClientPortal: "Configurar portal del cliente",
      manageCroAccount: "Administrar mi cuenta CRO",
      main: "Principal",
      home: "Inicio",
      creditFlowAffiliate: "Afiliado Credit Flow AI",
      purchaseAttackCredits: "Comprar créditos de ataque",
      attackArea: "Área de ataque",
      attackHistory: "Historial de ataques",
      manageClients: "Administrar mis clientes",
      manageOwnClientAccount: "Administrar mi propia cuenta de cliente",
      clientScoreboard: "Tablero de clientes",
      support: "Soporte",
      getSupport: "Obtener soporte Credit Flow AI",
      faq: "Preguntas frecuentes",
      trainingVideos: "Videos de capacitación",
      getCreditReportHere: "Obtener informe de crédito aquí",
      becomeAffiliate: "Ser afiliado",
    },
    dashboard: {
      welcome: "¡Bienvenido, {name}!",
      clientSignUp: "REGISTRO DE CLIENTE",
      creditFlowClientSignUp: "REGISTRO DE CLIENTE CREDIT FLOW AI",
      freeScoreNow: "PUNTUACIÓN GRATIS AHORA",
      myFreeScoreNow: "MI PUNTUACIÓN GRATIS AHORA",
      attackArea: "ÁREA DE ATAQUE",
      buyCredits: "COMPRAR CRÉDITOS",
      buyAttackCreditsHere: "COMPRAR CRÉDITOS DE ATAQUE AQUÍ",
      creditReport: "INFORME DE CRÉDITO",
      getCreditReportHere: "Obtener informe de crédito aquí",
      totalClients: "Total de clientes",
      complementaryCredits: "Créditos complementarios",
      availableCredits: "Créditos disponibles",
      usedCredits: "Créditos usados",
      expiryDate: "Fecha de vencimiento",
      na: "N/D",
      attendMetro2Monday: "ASISTIR METRO 2 LUNES",
      meetingCode: "Código de reunión",
      clientPortal: "Portal de clientes Credit Flow AI",
      clientPortalDesc:
        "Use este enlace para invitar a clientes a nuestro portal seguro para ver su informe Epic Pro, cartas generadas y subir documentos.",
      affiliateLink: "Enlace de afiliado Credit Flow AI",
      affiliateLinkDesc: "Use este enlace para invitar a usuarios a registrarse.",
      copy: "Copiar",
      profileCompletion: "Completar perfil",
      profileCompletePercent: "Tu perfil está 80% completo",
      completeYourProfile: "Completar tu perfil",
      loading: "Cargando...",
    },
  },
  cr: {
    header: { logOut: "Dekonekte" },
    sidebar: {
      account: "Kont",
      setupClientPortal: "Konfigire pòtal kliyan",
      manageCroAccount: "Jere kont CRO mwen",
      main: "Prensipal",
      home: "Akèy",
      creditFlowAffiliate: "Afilye Credit Flow AI",
      purchaseAttackCredits: "Achte kredi atak",
      attackArea: "Zòn atak",
      attackHistory: "Istorik atak",
      manageClients: "Jere kliyan mwen",
      manageOwnClientAccount: "Jere pwòp kont kliyan mwen",
      clientScoreboard: "Tablo kliyan",
      support: "Sipò",
      getSupport: "Jwenn sipò Credit Flow AI",
      faq: "Kesyon souvan",
      trainingVideos: "Videyo fòmasyon",
      getCreditReportHere: "Jwenn rapò kredi isit la",
      becomeAffiliate: "Vin afilye",
    },
    dashboard: {
      welcome: "Byenveni, {name}!",
      clientSignUp: "ENSKRI KLIYAN",
      creditFlowClientSignUp: "ENSKRI KLIYAN CREDIT FLOW AI",
      freeScoreNow: "NÒT GRATIS KOULYE A",
      myFreeScoreNow: "NÒT GRATIS MWEN",
      attackArea: "ZÒN ATAK",
      buyCredits: "ACHTE KREDI",
      buyAttackCreditsHere: "ACHTE KREDI ATAK LA",
      creditReport: "RAPÒ KREDI",
      getCreditReportHere: "Jwenn rapò kredi isit la",
      totalClients: "Total kliyan",
      complementaryCredits: "Kredi konplemantè",
      availableCredits: "Kredi ki disponib",
      usedCredits: "Kredi itilize",
      expiryDate: "Dat ekspirasyon",
      na: "N/A",
      attendMetro2Monday: "ALE METRO 2 LENDI",
      meetingCode: "Kòd reyinyon",
      clientPortal: "Pòtal kliyan Credit Flow AI",
      clientPortalDesc:
        "Sèvi ak lyen sa a pou envite kliyan nan pòtal sekirite nou pou wè rapò Epic Pro yo, lèt ki jenere, ak telechaje dokiman.",
      affiliateLink: "Lyen afilye Credit Flow AI",
      affiliateLinkDesc: "Sèvi ak lyen sa a pou envite itilizatè pou enskri.",
      copy: "Kopi",
      profileCompletion: "Konplete pwofil",
      profileCompletePercent: "Pwofil ou 80% konple",
      completeYourProfile: "Konplete pwofil ou",
      loading: "Ap chaje...",
    },
  },
};

const STORAGE_KEY = "creditflow-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "en" || stored === "es" || stored === "cr") return stored;
  return "en";
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, locale);
}
