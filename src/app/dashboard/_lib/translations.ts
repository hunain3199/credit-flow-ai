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
    landing: {
      comingSoonTitle: string;
      comingSoonTagline: string;
      heroDescription: string;
      productUpdatesIntro: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      creditScoreLabel: string;
      creditScorePlaceholder: string;
      submitting: string;
      notifyMe: string;
      stayTuned: string;
      successMessage: string;
      errorMessage: string;
      errorMessagePleaseTryAgain: string;
      footerCopyright: string;
      smartCreditTagline: string;
    };
    clients: {
      pageTitle: string;
      statsTotalClients: string;
      statsCreditsUsed: string;
      tabsAllClients: string;
      exportCsv: string;
      addNewClient: string;
      importClient: string;
      searchPlaceholder: string;
      tableFullName: string;
      tableAddedBy: string;
      tableEmail: string;
      tableDateAdded: string;
      tableActions: string;
      sampleClient: string;
      sampleEmail: string;
      sampleDateAdded: string;
      actionEditClientAria: string;
      actionViewClientAria: string;
      uploadReport: string;
      mobileAddedBy: string;
      mobileAllClients: string;
    };
    support: {
      pageTitle: string;
      searchPlaceholder: string;
      clearSearchAria: string;
      addTicketButton: string;
      noTicketsFound: string;
      allLabel: string;
      ticketNumberHeader: string;
      titleHeader: string;
      userHeader: string;
      statusHeader: string;
      dateAddedHeader: string;
      actionsHeader: string;
    };
    faq: {
      pageTitle: string;
      items: Array<{ question: string; answer: string }>;
    };
    scoreboard: {
      pageTitle: string;
      selectClientLabel: string;
      selectClientPlaceholder: string;
      sampleClient: string;
      selectReportLabel: string;
      selectReportPlaceholder: string;
      latestReport: string;
      prevScoreLabel: string;
      currentRecordHeader: string;
      previousRecordHeader: string;
      differenceHeader: string;
      metricLabels: string[];
    };
    history: {
      pageTitle: string;
      searchPlaceholder: string;
      goToAttackArea: string;
      allLabel: string;
      hashHeader: string;
      clientHeader: string;
      createdDateHeader: string;
      dateOfLastAttackHeader: string;
      letterFilesHeader: string;
      ppamsStatusHeader: string;
      numberOfFilesHeader: string;
      actionsHeader: string;
      noRecordsFound: string;
      noRecordsMobile: string;
    };
    attack: {
      pageTitle: string;
      alertTitle: string;
      alertMessage: string;
      okButton: string;
      accessMessage: string;
    };
    affiliate: {
      pageTitle: string;
      description: string;
      yourAffiliateLinkLabel: string;
      copyButton: string;
    };
    training: {
      pageTitle: string;
      videoPlayerTitle: string;
      documentPreviewText: string;
      cards: Array<{ title: string; type: "doc" | "video" }>;
    };
    manage: {
      companyTitle: string;
      companySubtitle: string;
      changePasswordButton: string;
      profileImageLabel: string;
      uploadButtonLabel: string;
      personalInfoLabel: string;
      firstLastNameLabel: string;
      fullNamePlaceholder: string;
      dobLabel: string;
      ssnLabel: string;
      ssnPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      streetLabel: string;
      streetPlaceholder: string;
      cityLabel: string;
      cityPlaceholder: string;
      stateLabel: string;
      statePlaceholder: string;
      zipLabel: string;
      zipPlaceholder: string;
      emailLabel: string;
      verificationDocumentsLabel: string;
      photoIdPromptPrefix: string;
      photoIdentificationLabel: string;
      photoIdPromptSuffix: string;
      legalIdPromptPrefix: string;
      legalIdentificationLabel: string;
      legalIdPromptSuffix: string;
      addressPromptPrefix: string;
      addressLabel: string;
      addressPromptSuffix: string;
      otherDocumentUploadLabel: string;
      uploadFileLabel: string;
      updateInformationButton: string;
      profileAriaLabel: string;
    };
    clientAccount: {
      editProfileTitle: string;
      uploadDocumentsTitle: string;
      uploadDocumentsHereLabel: string;
      saveButton: string;
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
    landing: {
      comingSoonTitle: "Coming Soon",
      comingSoonTagline: "Smart Credit. Real Results.",
      heroDescription:
        "We're building something great. Fix your credit the smart way with AI.",
      productUpdatesIntro: "Get product updates — we'll keep you in the loop.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      creditScoreLabel: "Credit Score (optional, 300–850)",
      creditScorePlaceholder: "e.g. 650",
      submitting: "Submitting…",
      notifyMe: "Notify me",
      stayTuned: "Stay tuned",
      successMessage: "You're signed up for product updates!",
      errorMessage: "Something went wrong.",
      errorMessagePleaseTryAgain: "Something went wrong. Please try again.",
      footerCopyright: "© 2026 CreditFlow AI. All rights reserved.",
      smartCreditTagline: "Smart Credit. Real Results.",
    },
    clients: {
      pageTitle: "Manage All Clients",
      statsTotalClients: "Total client(s)",
      statsCreditsUsed: "Credits Used",
      tabsAllClients: "All Clients",
      exportCsv: "Export CSV",
      addNewClient: "+ Add New Client",
      importClient: "Import Client",
      searchPlaceholder: "Search",
      tableFullName: "Full Name",
      tableAddedBy: "Added By",
      tableEmail: "Email",
      tableDateAdded: "Date Added",
      tableActions: "Action(s)",
      sampleClient: "Sample Client",
      sampleEmail: "sampleclient@example.com",
      sampleDateAdded: "February-16-2026",
      actionEditClientAria: "Edit client",
      actionViewClientAria: "View client",
      uploadReport: "Upload Report",
      mobileAddedBy: "Added by",
      mobileAllClients: "All Clients",
    },
    support: {
      pageTitle: "Tickets Management",
      searchPlaceholder: "Search ticket",
      clearSearchAria: "Clear search",
      addTicketButton: "Add Ticket",
      noTicketsFound: "No tickets found.",
      allLabel: "# All",
      ticketNumberHeader: "Ticket #",
      titleHeader: "Title",
      userHeader: "User",
      statusHeader: "Status",
      dateAddedHeader: "Date Added",
      actionsHeader: "Action(s)",
    },
    faq: {
      pageTitle: "FAQs",
      items: [
        {
          question: "Attack Type Initials and Names",
          answer: `Attack Type Initials and Name:

BAS [Base Attack Types]:
- FDA = Factual Disputing Attack
- CLA = Consumer Law Attack
- OM2C = Original Metro 2 Compliance
- LAVA = Lawful Accuracy Verification Analytics

CATS [Combined Attack Types]:
- GAS-D = Global Automated Strategies per Destination
- GAS-T = Global Automated Strategies per Item
- GAS-N = Global Automated Strategies per Primary Negativity Type

FIRE-D = Factual Forensic In-depth Investigative Review & Remediation Escalation per Destination
FIRE-T = Factual Forensic In-depth Investigative Review & Remediation Escalation per Item
FIRE-N = Factual Forensic In-depth Investigative Review & Remediation Escalation per Primary Negativity Type

SANs [Super Attack Types]:
- MILKA-DAD = Multiple Item attack with limited key arguments against deviations in data accuracy
- SEEM-MIC = Super Enhanced & Effective Metro2 Multiple Item Challenge
- SILKA-DAD = Single Item attack with limited key arguments against deviations in data accuracy
- SEEM-SIC = Super Enhanced & Effective Metro2 Single Item Challenge

LATs [Content Box Level Attack Types]:
- ICBA = Item-based Content Box Level Attacks
- DCBA = Destination-based Content Box Level Attacks
- NCBA = Primary Negativity Type-based Content Box Level Attacks`,
        },
        {
          question: "What does Attack Focus mean?",
          answer:
            "The software creates letters for each bureau (TransUnion, Experian, Equifax) and each destination or creditor tied to the selected attack strategy.",
        },
        {
          question: "What is Attack Destination?",
          answer:
            "Attack destination is the bureau or data furnisher/creditor where the dispute letter is routed.",
        },
        {
          question: "How much credits cost",
          answer: "Please click here to view the pricing details.",
        },
        {
          question: "How long after I purchase a credit does it show up in my account?",
          answer:
            "Credits usually appear in your account within 24 hours. If they do not appear after that, submit a support ticket.",
        },
      ],
    },
    scoreboard: {
      pageTitle: "Client's Score Board",
      selectClientLabel: "Select client for score evaluation",
      selectClientPlaceholder: "Select Client(s)",
      sampleClient: "Sample Client",
      selectReportLabel: "Select Report",
      selectReportPlaceholder: "Select Report",
      latestReport: "Latest Report",
      prevScoreLabel: "Prev Score:",
      currentRecordHeader: "Current Record",
      previousRecordHeader: "Previous Record",
      differenceHeader: "Difference",
      metricLabels: [
        "Total Accounts",
        "Closed Accounts",
        "Delinquent",
        "Derogatory",
        "Inquiries",
        "Public Records",
      ],
    },
    history: {
      pageTitle: "Attack History",
      searchPlaceholder: "Search Letters",
      goToAttackArea: "Go To Attack Area",
      allLabel: "All",
      hashHeader: "#",
      clientHeader: "Client(s)",
      createdDateHeader: "Created Date",
      dateOfLastAttackHeader: "Date of Last Attack",
      letterFilesHeader: "Letter Files",
      ppamsStatusHeader: "PPAMS Status",
      numberOfFilesHeader: "Number of Files",
      actionsHeader: "Action(s)",
      noRecordsFound: "No attack history records found.",
      noRecordsMobile: "No attack history records found.",
    },
    attack: {
      pageTitle: "Attack Area",
      alertTitle: "creditflowai.com says",
      alertMessage: "Please Buy Credits To Generate Letters",
      okButton: "OK",
      accessMessage: "Please purchase credits to access the Attack Area.",
    },
    affiliate: {
      pageTitle: "Credit Flow AI Affiliate Link",
      description:
        "Click here to become a Credit Flow AI affiliate to earn complimentary credits for recruiting new users. Share your unique link below to invite new Credit Flow AI users.",
      yourAffiliateLinkLabel: "Your Affiliate Link",
      copyButton: "Copy",
    },
    training: {
      pageTitle: "Education Room",
      videoPlayerTitle: "YouTube video player",
      documentPreviewText: "Training document preview",
      cards: [
        {
          title: "Super Simple Outline Of Steps to enter Client details OM2C-PROPERLY.",
          type: "doc",
        },
        { title: "Software Related Terminologies", type: "doc" },
        {
          title: "2023 CDIA's CRRG aka Metro 2 Guidelines",
          type: "video",
        },
        { title: "Software Enhancements", type: "doc" },
        { title: "Common facts about M2Gala software", type: "doc" },
        { title: "M2 GALA Client Sign-Up", type: "video" },
        { title: "How to Register in M2 Gala", type: "video" },
      ],
    },
    manage: {
      companyTitle: "Company Information",
      companySubtitle: "Review and update your personal and company information.",
      changePasswordButton: "Change Password",
      profileImageLabel: "Profile Image",
      uploadButtonLabel: "Upload",
      personalInfoLabel: "Personal Information",
      firstLastNameLabel: "First and Last Name",
      fullNamePlaceholder: "Full name",
      dobLabel: "Date of Birth",
      ssnLabel: "Social Security Number",
      ssnPlaceholder: "••••-••-••••",
      phoneLabel: "Phone",
      phonePlaceholder: "(000) 000-0000",
      streetLabel: "Street Number and Name",
      streetPlaceholder: "Street address",
      cityLabel: "City",
      cityPlaceholder: "City",
      stateLabel: "State",
      statePlaceholder: "State",
      zipLabel: "Zip",
      zipPlaceholder: "ZIP code",
      emailLabel: "Email Address",
      verificationDocumentsLabel: "Verification Documents",
      photoIdPromptPrefix: "Please upload document proof of",
      photoIdentificationLabel: "photo identification",
      photoIdPromptSuffix: "(Driver's License or State ID).",
      legalIdPromptPrefix: "Please upload proof of",
      legalIdentificationLabel: "legal identification",
      legalIdPromptSuffix:
        "or government proof of Social Security Number.",
      addressPromptPrefix: "Please upload document proof of",
      addressLabel: "address",
      addressPromptSuffix:
        "(recent utility bill, lease, or bank statement).",
      otherDocumentUploadLabel: "Other Document Upload",
      uploadFileLabel: "Upload File",
      updateInformationButton: "Update Information",
      profileAriaLabel: "profile",
    },
    clientAccount: {
      editProfileTitle: "Edit Profile",
      uploadDocumentsTitle:
        "Upload Documents (allowed file types: .jpg, .png, .gif)",
      uploadDocumentsHereLabel: "Upload Documents here",
      saveButton: "Save",
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
    landing: {
      comingSoonTitle: "Próximamente",
      comingSoonTagline: "Crédito inteligente. Resultados reales.",
      heroDescription:
        "Estamos creando algo excelente. Mejora tu crédito de la forma inteligente con IA.",
      productUpdatesIntro:
        "Recibe actualizaciones de productos — te mantendremos al tanto.",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      creditScoreLabel: "Puntaje crediticio (opcional, 300–850)",
      creditScorePlaceholder: "ej. 650",
      submitting: "Enviando…",
      notifyMe: "Avísame",
      stayTuned: "Mantente atento",
      successMessage: "¡Te registraste para recibir actualizaciones!",
      errorMessage: "Algo salió mal.",
      errorMessagePleaseTryAgain: "Algo salió mal. Inténtalo de nuevo.",
      footerCopyright: "© 2026 CreditFlow AI. Todos los derechos reservados.",
      smartCreditTagline: "Crédito inteligente. Resultados reales.",
    },
    clients: {
      pageTitle: "Administrar todos los clientes",
      statsTotalClients: "Total de clientes",
      statsCreditsUsed: "Créditos usados",
      tabsAllClients: "Todos los clientes",
      exportCsv: "Exportar CSV",
      addNewClient: "+ Agregar nuevo cliente",
      importClient: "Importar cliente",
      searchPlaceholder: "Buscar",
      tableFullName: "Nombre completo",
      tableAddedBy: "Agregado por",
      tableEmail: "Correo electrónico",
      tableDateAdded: "Fecha de agregado",
      tableActions: "Acciones",
      sampleClient: "Cliente de ejemplo",
      sampleEmail: "sampleclient@example.com",
      sampleDateAdded: "16-febrero-2026",
      actionEditClientAria: "Editar cliente",
      actionViewClientAria: "Ver cliente",
      uploadReport: "Subir informe",
      mobileAddedBy: "Agregado por",
      mobileAllClients: "Todos los clientes",
    },
    support: {
      pageTitle: "Gestión de Tickets",
      searchPlaceholder: "Buscar ticket",
      clearSearchAria: "Borrar búsqueda",
      addTicketButton: "Agregar Ticket",
      noTicketsFound: "No se encontraron tickets.",
      allLabel: "# Todos",
      ticketNumberHeader: "Número de ticket",
      titleHeader: "Título",
      userHeader: "Usuario",
      statusHeader: "Estado",
      dateAddedHeader: "Fecha de agregado",
      actionsHeader: "Acciones",
    },
    faq: {
      pageTitle: "Preguntas frecuentes",
      items: [
        {
          question: "Iniciales y nombres del tipo de ataque",
          answer: `Iniciales y nombres del tipo de ataque:

BAS [Tipos de ataque base]:
- FDA = Ataque de impugnación factual
- CLA = Ataque de ley de consumo
- OM2C = Cumplimiento original de Metro 2
- LAVA = Analítica de verificación de precisión legal

CATS [Tipos de ataque combinados]:
- GAS-D = Estrategias globales automatizadas por destino
- GAS-T = Estrategias globales automatizadas por artículo
- GAS-N = Estrategias globales automatizadas por tipo principal de negatividad

FIRE-D = Escalamiento de revisión e investigación forense factual y remediación por destino
FIRE-T = Escalamiento de revisión e investigación forense factual y remediación por artículo
FIRE-N = Escalamiento de revisión e investigación forense factual y remediación por tipo principal de negatividad

SANs [Tipos de ataque súper]:
- MILKA-DAD = Ataque de múltiples artículos con argumentos clave limitados contra desviaciones en la precisión de los datos
- SEEM-MIC = Reto Metro2 de múltiples artículos súper mejorado y efectivo
- SILKA-DAD = Ataque de un solo artículo con argumentos clave limitados contra desviaciones en la precisión de los datos
- SEEM-SIC = Reto Metro2 de un solo artículo súper mejorado y efectivo

LATs [Tipos de ataque a nivel de contenido]:
- ICBA = Ataques basados en artículos a nivel de caja de contenido
- DCBA = Ataques basados en destino a nivel de caja de contenido
- NCBA = Ataques basados en tipo principal de negatividad a nivel de caja de contenido`,
        },
        {
          question: "¿Qué significa el enfoque del ataque?",
          answer:
            "El software crea cartas para cada oficina de crédito (TransUnion, Experian, Equifax) y para cada destino o acreedor vinculado a la estrategia de ataque seleccionada.",
        },
        {
          question: "¿Qué es el destino del ataque?",
          answer:
            "El destino del ataque es la oficina o el proveedor de datos/acreedor al que se envía la carta de disputa.",
        },
        {
          question: "¿Cuánto cuestan los créditos?",
          answer: "Haz clic aquí para ver los detalles de precios.",
        },
        {
          question: "¿Cuánto tiempo tarda en aparecer en mi cuenta después de comprar un crédito?",
          answer:
            "Los créditos normalmente aparecen en tu cuenta en un plazo de 24 horas. Si no aparecen después de ese tiempo, envía un ticket de soporte.",
        },
      ],
    },
    scoreboard: {
      pageTitle: "Panel de Puntuación del Cliente",
      selectClientLabel: "Selecciona el cliente para evaluar la puntuación",
      selectClientPlaceholder: "Seleccionar cliente(s)",
      sampleClient: "Cliente de ejemplo",
      selectReportLabel: "Seleccionar informe",
      selectReportPlaceholder: "Seleccionar informe",
      latestReport: "Informe más reciente",
      prevScoreLabel: "Puntuación anterior:",
      currentRecordHeader: "Registro actual",
      previousRecordHeader: "Registro anterior",
      differenceHeader: "Diferencia",
      metricLabels: [
        "Cuentas totales",
        "Cuentas cerradas",
        "Atrasado",
        "Negativo",
        "Consultas",
        "Registros públicos",
      ],
    },
    history: {
      pageTitle: "Historial de Ataques",
      searchPlaceholder: "Buscar Cartas",
      goToAttackArea: "Ir al Área de Ataque",
      allLabel: "Todos",
      hashHeader: "#",
      clientHeader: "Clientes",
      createdDateHeader: "Fecha de creación",
      dateOfLastAttackHeader: "Fecha del último ataque",
      letterFilesHeader: "Archivos de cartas",
      ppamsStatusHeader: "Estado PPAMS",
      numberOfFilesHeader: "Número de archivos",
      actionsHeader: "Acciones",
      noRecordsFound: "No se encontraron registros de historial de ataques.",
      noRecordsMobile: "No se encontraron registros de historial de ataques.",
    },
    attack: {
      pageTitle: "Área de Ataque",
      alertTitle: "creditflowai.com dice",
      alertMessage: "Por favor compra créditos para generar cartas",
      okButton: "Aceptar",
      accessMessage: "Por favor compra créditos para acceder al Área de Ataque.",
    },
    affiliate: {
      pageTitle: "Enlace de Afiliado de Credit Flow AI",
      description:
        "Haz clic aquí para convertirte en afiliado de Credit Flow AI y ganar créditos complementarios por reclutar nuevos usuarios. Comparte tu enlace único de abajo para invitar a nuevos usuarios de Credit Flow AI.",
      yourAffiliateLinkLabel: "Tu enlace de afiliado",
      copyButton: "Copiar",
    },
    training: {
      pageTitle: "Sala de Educación",
      videoPlayerTitle: "Reproductor de video de YouTube",
      documentPreviewText: "Vista previa del documento de capacitación",
      cards: [
        {
          title:
            "Guía súper simple de pasos para ingresar los datos del cliente OM2C correctamente.",
          type: "doc",
        },
        { title: "Terminología relacionada con el software", type: "doc" },
        { title: "Guías Metro 2 (CRRG) de CDIA 2023", type: "video" },
        { title: "Mejoras del software", type: "doc" },
        { title: "Hechos comunes sobre el software M2Gala", type: "doc" },
        { title: "Registro de clientes de M2 GALA", type: "video" },
        { title: "Cómo registrarse en M2 Gala", type: "video" },
      ],
    },
    manage: {
      companyTitle: "Información de la empresa",
      companySubtitle:
        "Revisa y actualiza tu información personal y de la empresa.",
      changePasswordButton: "Cambiar contraseña",
      profileImageLabel: "Imagen de perfil",
      uploadButtonLabel: "Subir",
      personalInfoLabel: "Información personal",
      firstLastNameLabel: "Nombre y apellido",
      fullNamePlaceholder: "Nombre completo",
      dobLabel: "Fecha de nacimiento",
      ssnLabel: "Número de seguro social",
      ssnPlaceholder: "••••-••-••••",
      phoneLabel: "Teléfono",
      phonePlaceholder: "(000) 000-0000",
      streetLabel: "Número y nombre de la calle",
      streetPlaceholder: "Dirección",
      cityLabel: "Ciudad",
      cityPlaceholder: "Ciudad",
      stateLabel: "Estado",
      statePlaceholder: "Estado",
      zipLabel: "Código postal",
      zipPlaceholder: "Código ZIP",
      emailLabel: "Dirección de correo electrónico",
      verificationDocumentsLabel: "Documentos de verificación",
      photoIdPromptPrefix: "Por favor sube la prueba documental de",
      photoIdentificationLabel: "identificación con foto",
      photoIdPromptSuffix: "(Licencia de conducir o identificación estatal).",
      legalIdPromptPrefix: "Por favor sube la prueba de",
      legalIdentificationLabel: "identificación legal",
      legalIdPromptSuffix:
        "o prueba del gobierno del Número de Seguro Social.",
      addressPromptPrefix: "Por favor sube la prueba documental de",
      addressLabel: "dirección",
      addressPromptSuffix:
        "(factura de servicios reciente, contrato de arrendamiento o estado de cuenta bancario).",
      otherDocumentUploadLabel: "Carga de otros documentos",
      uploadFileLabel: "Subir archivo",
      updateInformationButton: "Actualizar información",
      profileAriaLabel: "perfil",
    },
    clientAccount: {
      editProfileTitle: "Editar Perfil",
      uploadDocumentsTitle:
        "Subir Documentos (tipos de archivo permitidos: .jpg, .png, .gif)",
      uploadDocumentsHereLabel: "Subir Documentos aquí",
      saveButton: "Guardar",
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
    landing: {
      comingSoonTitle: "Byento",
      comingSoonTagline: "Kredi entelijan. Rezilta reyèl.",
      heroDescription:
        "Nou ap konstwi yon bagay ekselan. Ranje kredi ou nan fason ki saj ak AI.",
      productUpdatesIntro:
        "Jwenn mizajou sou pwodwi — n ap kenbe w enfòme.",
      nameLabel: "Non",
      namePlaceholder: "Non ou",
      emailLabel: "Imèl",
      emailPlaceholder: "ou@egzanp.com",
      creditScoreLabel: "Nòt kredi (si ou vle, 300–850)",
      creditScorePlaceholder: "egzanp 650",
      submitting: "Ap voye...",
      notifyMe: "Fè m sonje",
      stayTuned: "Rete branche",
      successMessage: "Ou enskri pou mizajou pwodwi yo!",
      errorMessage: "Gen yon erè ki rive.",
      errorMessagePleaseTryAgain: "Gen yon erè ki rive. Tanpri eseye ankò.",
      footerCopyright: "© 2026 CreditFlow AI. Tout dwa rezève.",
      smartCreditTagline: "Kredi entelijan. Rezilta reyèl.",
    },
    clients: {
      pageTitle: "Jere tout kliyan yo",
      statsTotalClients: "Total kliyan",
      statsCreditsUsed: "Kredi itilize",
      tabsAllClients: "Tout kliyan",
      exportCsv: "Ekspòte CSV",
      addNewClient: "+ Ajoute nouvo kliyan",
      importClient: "Enpòte kliyan",
      searchPlaceholder: "Chache",
      tableFullName: "Non konplè",
      tableAddedBy: "Te ajoute pa",
      tableEmail: "Imèl",
      tableDateAdded: "Dat yo ajoute",
      tableActions: "Aksyon",
      sampleClient: "Kliyan egzanp",
      sampleEmail: "sampleclient@example.com",
      sampleDateAdded: "16 Fevriye 2026",
      actionEditClientAria: "Edit kliyan",
      actionViewClientAria: "Gade kliyan",
      uploadReport: "Chaje rapò",
      mobileAddedBy: "Te ajoute pa",
      mobileAllClients: "Tout kliyan",
    },
    support: {
      pageTitle: "Jesyon Tikè",
      searchPlaceholder: "Chache tikè",
      clearSearchAria: "Klè rechèch",
      addTicketButton: "Ajoute Tikè",
      noTicketsFound: "Pa jwenn tikè.",
      allLabel: "# Tout",
      ticketNumberHeader: "Tikè #",
      titleHeader: "Tit",
      userHeader: "Itilizatè",
      statusHeader: "Estati",
      dateAddedHeader: "Dat yo ajoute",
      actionsHeader: "Aksyon",
    },
    faq: {
      pageTitle: "Kesyon souvan",
      items: [
        {
          question: "Inisyal ak non kalite atak",
          answer: `Inisyal ak non kalite atak:

BAS [Kalite atak debaz]:
- FDA = Atak kontestasyon factual
- CLA = Atak lwa konsomatè
- OM2C = Konfòmite Metro 2 orijinal
- LAVA = Analitik verifikasyon presizyon legal

CATS [Kalite atak konbine]:
- GAS-D = Estrateji global otomatik selon destinasyon
- GAS-T = Estrateji global otomatik selon atik
- GAS-N = Estrateji global otomatik selon kalite prensipal negativite

FIRE-D = Eskalasyon revizyon envestigasyon foransik factual ak remèdasyon selon destinasyon
FIRE-T = Eskalasyon revizyon envestigasyon foransik factual ak remèdasyon selon atik
FIRE-N = Eskalasyon revizyon envestigasyon foransik factual ak remèdasyon selon kalite prensipal negativite

SANs [Kalite atak sipè]:
- MILKA-DAD = Atak plizyè atik ak agiman kle limite kont devyasyon nan presizyon done
- SEEM-MIC = Defi Metro2 plizyè atik ki pi ranfòse e ki efikas
- SILKA-DAD = Atak sèl atik ak agiman kle limite kont devyasyon nan presizyon done
- SEEM-SIC = Defi Metro2 sèl atik ki pi ranfòse e ki efikas

LATs [Kalite atak nan nivo bwat kontni]:
- ICBA = Atak ki baze sou atik nan nivo bwat kontni
- DCBA = Atak ki baze sou destinasyon nan nivo bwat kontni
- NCBA = Atak ki baze sou kalite prensipal negativite nan nivo bwat kontni`,
        },
        {
          question: "Kisa Attack Focus vle di?",
          answer:
            "Sofwè a kreye lèt pou chak biwo (TransUnion, Experian, Equifax) ak pou chak destinasyon oswa kreditè ki mare ak estrateji atak ou chwazi a.",
        },
        {
          question: "Kisa Attack Destination ye?",
          answer:
            "Attack destination se biwo a oswa founisè done/kreditè kote yo voye lèt diskisyon an.",
        },
        {
          question: "Konbyen kredi yo koute",
          answer: "Tanpri klike isit la pou w wè detay pri yo.",
        },
        {
          question: "Konbyen tan apre mwen achte yon kredi li parèt nan kont mwen an?",
          answer:
            "Kredi yo konn parèt nan kont ou nan 24 èdtan. Si yo pa parèt apre sa, soumèt yon tikè sipò.",
        },
      ],
    },
    scoreboard: {
      pageTitle: "Tablo Nòt Kliyan",
      selectClientLabel: "Chwazi kliyan pou evalye nòt la",
      selectClientPlaceholder: "Chwazi kliyan(s)",
      sampleClient: "Kliyan egzanp",
      selectReportLabel: "Chwazi rapò",
      selectReportPlaceholder: "Chwazi rapò",
      latestReport: "Dènye rapò",
      prevScoreLabel: "Ansyen nòt:",
      currentRecordHeader: "Dosye aktyèl",
      previousRecordHeader: "Dosye anvan",
      differenceHeader: "Diferans",
      metricLabels: [
        "Total kont",
        "Kont fèmen",
        "Delenk",
        "Derogatwa",
        "Enkèt",
        "Dosye piblik",
      ],
    },
    history: {
      pageTitle: "Istorik atak",
      searchPlaceholder: "Chache Lèt",
      goToAttackArea: "Ale nan Zòn Atak",
      allLabel: "Tout",
      hashHeader: "#",
      clientHeader: "Kliyan",
      createdDateHeader: "Dat kreyasyon",
      dateOfLastAttackHeader: "Dat dènye atak",
      letterFilesHeader: "Dosye lèt",
      ppamsStatusHeader: "Estati PPAMS",
      numberOfFilesHeader: "Nimewo dosye",
      actionsHeader: "Aksyon",
      noRecordsFound: "Pa jwenn dosye istorik atak.",
      noRecordsMobile: "Pa jwenn dosye istorik atak.",
    },
    attack: {
      pageTitle: "Zòn Atak",
      alertTitle: "creditflowai.com di",
      alertMessage: "Tanpri achte kredi pou jenere lèt",
      okButton: "Dakò",
      accessMessage: "Tanpri achte kredi pou antre nan Zòn Atak la.",
    },
    affiliate: {
      pageTitle: "Lyen Afilye Credit Flow AI",
      description:
        "Klike isit la pou vin yon afilye Credit Flow AI epi touche kredi konplemantè pou rekrite nouvo itilizatè. Pataje lyen inik ou anba a pou envite nouvo itilizatè Credit Flow AI.",
      yourAffiliateLinkLabel: "Lyen afilye ou",
      copyButton: "Kopi",
    },
    training: {
      pageTitle: "Chanm Edikasyon",
      videoPlayerTitle: "Chofè videyo YouTube",
      documentPreviewText: "Aperçu dokiman fòmasyon",
      cards: [
        {
          title: "Gid super senp etap pou antre detay kliyan OM2C-PROP.",
          type: "doc",
        },
        { title: "Tèm ki gen rapò ak lojisyèl", type: "doc" },
        { title: "Gid Metro 2 (CRRG) CDIA 2023", type: "video" },
        { title: "Amelyorasyon lojisyèl", type: "doc" },
        { title: "Kèk verite komen sou lojisyèl M2Gala", type: "doc" },
        { title: "Enskripsyon Kliyan M2 GALA", type: "video" },
        { title: "Kijan pou enskri nan M2 Gala", type: "video" },
      ],
    },
    manage: {
      companyTitle: "Enfòmasyon Konpayi",
      companySubtitle:
        "Revize epi mete ajou enfòmasyon pèsonèl ak enfòmasyon konpayi ou.",
      changePasswordButton: "Chanje modpas",
      profileImageLabel: "Foto pwofil",
      uploadButtonLabel: "Telechaje",
      personalInfoLabel: "Enfòmasyon pèsonèl",
      firstLastNameLabel: "Non ak Siyati",
      fullNamePlaceholder: "Non konplè",
      dobLabel: "Dat nesans",
      ssnLabel: "Nimewo Sekirite Sosyal",
      ssnPlaceholder: "••••-••-••••",
      phoneLabel: "Telefòn",
      phonePlaceholder: "(000) 000-0000",
      streetLabel: "Nimewo ak Non Ri",
      streetPlaceholder: "Adrès",
      cityLabel: "Vil",
      cityPlaceholder: "Vil",
      stateLabel: "Eta",
      statePlaceholder: "Eta",
      zipLabel: "Kòd postal",
      zipPlaceholder: "ZIP",
      emailLabel: "Adrès imèl",
      verificationDocumentsLabel: "Dokiman verifikasyon",
      photoIdPromptPrefix: "Tanpri telechaje prèv dokiman de",
      photoIdentificationLabel: "idantite ak foto",
      photoIdPromptSuffix: "(Lisans chofè oswa idantite eta).",
      legalIdPromptPrefix: "Tanpri telechaje prèv",
      legalIdentificationLabel: "idantite legal",
      legalIdPromptSuffix:
        "oswa prèv gouvènman an pou Nimewo Sekirite Sosyal.",
      addressPromptPrefix: "Tanpri telechaje prèv dokiman de",
      addressLabel: "adrès",
      addressPromptSuffix:
        "(resan bòdwo sèvis piblik, kontra lokasyon, oswa deklarasyon bank).",
      otherDocumentUploadLabel: "Lòt Upload Dokiman",
      uploadFileLabel: "Telechaje dosye",
      updateInformationButton: "Mete enfòmasyon yo ajou",
      profileAriaLabel: "pwofil",
    },
    clientAccount: {
      editProfileTitle: "Edit Profil",
      uploadDocumentsTitle:
        "Telechaje Dokiman (tip fichye ki pèmèt: .jpg, .png, .gif)",
      uploadDocumentsHereLabel: "Telechaje Dokiman isit la",
      saveButton: "Sove",
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
