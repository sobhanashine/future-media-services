import type { SiteCopy } from "./site";
import { instagramRates } from "./instagram-rates";

const instalments = "Puoi pagare a rate. Contattaci per concordare le scadenze.";
const monthlyPrice = (value: number) => (value / 1_000_000).toLocaleString("it-IT") + " mln";

export const italianCopy: SiteCopy = {
  localeName: "Italiano",
  nav: {
    services: "Servizi", work: "Progetti", blog: "Guide", about: "Chi siamo", contact: "Contatti",
    faq: "Domande frequenti", start: "Scrivi allo studio", menu: "Apri il menu", close: "Chiudi il menu",
  },
  hero: {
    eyebrow: "Future Media Services", title: "Siti web e contenuti", accent: "Dall’idea al lancio",
    body: "Realizziamo siti aziendali e negozi online. Per Instagram progettiamo e produciamo post, storie e reel.",
    primary: "Parla con noi", secondary: "Scopri i progetti",
    canvasLabel: "Una scultura tridimensionale a forma di ali aperte.",
  },
  sections: {
    servicesEyebrow: "I nostri servizi", servicesTitle: "Siti web e gestione di Instagram",
    servicesBody: "Scopri cosa comprende ogni servizio, come lavoriamo e quali sono i tempi e i costi.",
    workEyebrow: "Portfolio", workTitle: "Progetti selezionati", workBody: "Guarda i siti e scopri il nostro contributo a ogni progetto.",
    processEyebrow: "Come lavoriamo", processTitle: "Dal primo incontro alla messa online",
    processBody: "Concordiamo obiettivi, contenuti e tempi. Puoi seguire i progressi e provare il sito prima della pubblicazione.",
    servicesPageIntro: "Progettiamo e sviluppiamo siti web e curiamo i contenuti per Instagram. Scegli il servizio per vedere esempi, attività incluse e tariffe.",
    whyEyebrow: "Lo studio", whyTitle: "Un unico gruppo di lavoro", whyBody: "Chi progetta, sviluppa e cura i contenuti lavora sullo stesso obiettivo.",
    socialEyebrow: "Dallo studio", socialTitle: "Dietro le quinte di FMS", finalTitle: "Raccontaci il tuo progetto",
    finalBody: "Scrivici per concordare tempi e costi. Ti risponderemo via email.",
  },
  services: [
    {
      slug: "web-development", label: "Design e sviluppo", title: "Progettazione e sviluppo di siti web",
      summary: "Siti per professionisti, aziende e negozi online. Progettiamo l’interfaccia su misura e ti diamo un pannello WordPress per aggiornare i contenuti.",
      heroImage: { src: "/images/services/web-development-hero.webp", alt: "Una struttura modulare in vetro e metallo che illustra l’architettura di un sito headless" },
      problem: "Un modello standard può diventare un limite quando devi presentare un servizio particolare o gestire un catalogo complesso.",
      deliverables: ["Interfaccia e percorsi utente su misura", "Sviluppo con Next.js", "Gestione dei contenuti con WordPress headless", "SEO tecnica e controlli prima della pubblicazione"],
      overview: "Partiamo da ciò che il visitatore deve riuscire a fare, come confrontare due servizi, richiedere un preventivo o acquistare un prodotto. Su questa base definiamo pagine, contenuti e interfaccia.",
      workflow: [
        { title: "Definiamo il progetto", body: "Individuiamo pubblico, obiettivi, pagine indispensabili e materiali disponibili." },
        { title: "Progettiamo e sviluppiamo", body: "Disegniamo l’interfaccia per desktop e mobile e colleghiamo il sito a WordPress." },
        { title: "Verifichiamo e consegniamo", body: "Controlliamo navigazione, prestazioni, contenuti e SEO tecnica. Alla consegna ti mostriamo come aggiornare il sito." },
      ],
      idealFor: ["Professionisti che vogliono presentare competenze e lavori", "Aziende che vogliono spiegare meglio i servizi e ricevere richieste", "Negozi che vogliono vendere online e gestire gli ordini"],
      plans: [
        {
          name: "Personale", audience: "Per professionisti e freelance", price: "45 mln", unit: "di toman", timeline: "2–4 settimane",
          description: "Uno spazio per presentarti, descrivere i tuoi servizi e raccogliere i tuoi lavori.", paymentNote: instalments,
          features: ["Design su misura fino a 5 pagine", "Interfaccia responsive in Next.js", "Gestione dei contenuti con WordPress headless", "Blog o archivio dei progetti", "SEO tecnica di base e strumenti Google", "Formazione sul pannello e 30 giorni di assistenza"],
        },
        {
          name: "Aziendale", audience: "Per aziende e società di servizi", price: "85 mln", unit: "di toman", timeline: "4–7 settimane",
          description: "Un sito con sezioni dedicate ai servizi, al team e ai progetti, per aiutare il cliente a scegliere e contattarti.", paymentNote: instalments, featured: true,
          features: ["Interfaccia su misura fino a 10 pagine", "Next.js e WordPress headless", "Struttura bilingue in persiano e inglese", "Sezioni servizi, progetti, blog e team", "Animazioni, SEO tecnica e statistiche", "Formazione sul pannello e 60 giorni di assistenza"],
        },
        {
          name: "E-commerce", audience: "Per marchi e rivenditori", price: "165 mln", unit: "di toman", timeline: "8–12 settimane",
          description: "Un negozio online su misura per gestire catalogo, ordini e percorso di acquisto da WordPress.", paymentNote: instalments,
          features: ["Schede prodotto e percorso d’acquisto su misura", "Next.js e WooCommerce headless", "Carrello, checkout e integrazione dei pagamenti", "Categorie, ricerca e filtri", "Area clienti, ordini e notifiche", "Formazione sul pannello e 90 giorni di assistenza"],
        },
      ],
    },
    {
      slug: "instagram-management", label: "Contenuti e gestione", title: "Gestione dei contenuti Instagram",
      summary: "Calendario editoriale, grafica per post e storie, produzione di reel e gestione del profilo con tre piani mensili.",
      heroImage: { src: "/images/services/instagram-management-hero.webp", alt: "Una postazione di produzione con fotocamera, formati per post e storie e calendario editoriale" },
      problem: "Pubblicare con regolarità richiede idee, materiali approvati e tempo per capire quali contenuti interessano al pubblico.",
      deliverables: ["Calendario editoriale, hashtag e programmazione", "Post, storie, reel, video e didascalie", "Interazioni con il pubblico e gli account pertinenti", "Pianificazione e gestione delle campagne Instagram", "Modelli grafici, identità visiva e copertine delle storie in evidenza", "Sicurezza del profilo, assistenza al recupero e report mensile"],
      overview: "Per ogni contenuto definiamo argomento, formato e data. Il tuo team può controllare il programma e usare il report mensile per decidere cosa cambiare.",
      workflow: [
        { title: "Analisi del profilo", body: "Esaminiamo gratuitamente il profilo e ti scriviamo per definire pubblico, obiettivi e piano adatto." },
        { title: "Produzione e pubblicazione", body: "Prepariamo testi, grafiche e video secondo il calendario e il volume concordati." },
        { title: "Report e revisioni", body: "A fine mese rivediamo quanto è stato pubblicato e i dati disponibili per preparare il mese successivo." },
      ],
      idealFor: ["Attività che vogliono pubblicare con regolarità", "Team che hanno bisogno di un calendario condiviso", "Marchi che vogliono una linea visiva coerente e un report mensile"],
      pricing: {
        eyebrow: "Piani Instagram", title: "Tre piani per la gestione del profilo",
        body: "Bronzo, Argento e Oro si distinguono per il numero di contenuti mensili. Tutti includono 15 attività. Oro comprende anche le mappe e la pubblicazione su un secondo canale video.",
        from: "Canone mensile", includes: "Contenuti inclusi", featured: "Consigliato",
        disclaimer: "Le tariffe sono mensili e sono espresse in toman iraniani. Prima del contratto concordiamo formati, materiali da fornire e modalità di produzione dei reel.",
      },
      sharedPlanTitle: "Incluso in tutti e tre i piani",
      sharedPlanFeatures: ["Analisi di Instagram Insights e delle visualizzazioni", "Ottimizzazione della biografia", "Copertine delle storie in evidenza", "Progettazione di storie animate", "Report mensile", "Copertina e grafica finale dei reel", "Sceneggiature originali ispirate alle tendenze pertinenti", "Assistenza dalle 9 alle 16, ora di Teheran", "Banner mensile per promozioni o concorsi", "Contratto scritto", "Assistenza al recupero dell’account", "Creazione di un profilo business se necessario", "Progettazione del logotipo", "Voce narrante umana per alcuni reel", "Se necessario, ricerca e montaggio di immagini e video da fonti affidabili"],
      plans: [
        {
          name: "Bronzo", audience: "Per piccole attività", monthlyToman: instagramRates.packages.bronze, price: monthlyPrice(instagramRates.packages.bronze), unit: "di toman", timeline: "al mese",
          description: "Per dare continuità al profilo con una linea grafica riconoscibile.",
          features: ["8 post al mese, anche in formato reel", "Da 30 a 52 storie al mese secondo le esigenze del profilo"],
        },
        {
          name: "Argento", audience: "Per aziende di medie dimensioni", monthlyToman: instagramRates.packages.silver, price: monthlyPrice(instagramRates.packages.silver), unit: "di toman", timeline: "al mese",
          description: "Per chi vuole aumentare la frequenza di pubblicazione e alternare più formati.",
          features: ["12 post al mese, anche in formato reel", "Da 60 a 80 storie al mese secondo le esigenze del profilo"],
        },
        {
          name: "Oro", audience: "Per aziende con più canali", monthlyToman: instagramRates.packages.gold, price: monthlyPrice(instagramRates.packages.gold), unit: "di toman", timeline: "al mese", featured: true,
          description: "Il piano con più contenuti e distribuzione su un canale video aggiuntivo.",
          features: ["16 post al mese, anche in formato reel", "120 storie al mese secondo le esigenze del profilo", "Inserimento dell’attività su Google Maps, Balad e Neshan", "Pubblicazione su un canale Aparat o YouTube"],
        },
      ],
    },
  ],
  pricing: {
    eyebrow: "Piani per siti web", title: "Confronta i tre piani per il tuo sito",
    body: "Tutti comprendono design su misura, Next.js e WordPress. Il prezzo varia in base al numero di pagine, alle funzioni e ai tempi di consegna.",
    from: "A partire da", includes: "Cosa comprende", featured: "Consigliato da FMS",
    disclaimer: "I prezzi di partenza sono espressi in toman iraniani. Dominio, hosting, servizi a pagamento e funzioni aggiuntive vengono preventivati separatamente.",
    mobileCarousel: { hint: "Scorri in orizzontale per confrontare i piani" },
  },
  process: [
    { title: "Il primo incontro", body: "Ci racconti chi sono i tuoi clienti e cosa vuoi che possano fare.", output: "Obiettivi condivisi" },
    { title: "La struttura", body: "Definiamo pagine, priorità dei contenuti e direzione visiva.", output: "Mappa del sito" },
    { title: "Lo sviluppo", body: "Realizziamo il progetto a tappe e ti mostriamo versioni che puoi provare.", output: "Versione da provare" },
    { title: "Le verifiche", body: "Controlliamo il sito su mobile, l’accessibilità, i contenuti, le prestazioni e la SEO tecnica.", output: "Esito delle verifiche" },
    { title: "La pubblicazione", body: "Mettiamo online il sito, ti formiamo sul pannello e concordiamo l’assistenza.", output: "Consegna e assistenza" },
  ],
  reasons: [
    { title: "Obiettivi condivisi", body: "Design, sviluppo e contenuti partono dallo stesso brief.", tag: "Strategia" },
    { title: "Progetto su misura", body: "Organizziamo pagine e funzioni intorno ai tuoi clienti.", tag: "Design" },
    { title: "Verifiche concrete", body: "Proviamo i percorsi principali prima della consegna.", tag: "Sviluppo" },
    { title: "Confronto continuo", body: "Sai chi segue il progetto e quale decisione serve per procedere.", tag: "Collaborazione" },
  ],
  work: { title: "I progetti dello studio", intro: "Dai servizi per l’edilizia ai negozi online. Apri una scheda per vedere il progetto, il nostro ruolo e le schermate su desktop e mobile." },
  social: [
    { tag: "Presentazione", title: "Conosci Future Media Services", body: "Un breve reel di presentazione dello studio.", href: "https://www.instagram.com/reel/DGiL0aHzUuq/" },
    { tag: "Dietro le quinte", title: "Riprese e montaggio", body: "Uno sguardo alla produzione dei nostri video brevi.", href: "https://www.instagram.com/reel/DCzrCJexQwi/" },
    { tag: "Instagram", title: "@future.m.services", body: "Segui il profilo dello studio per vedere gli ultimi lavori.", href: "https://www.instagram.com/future.m.services/" },
  ],
  about: {
    eyebrow: "Lo studio", title: "Chi realizza il tuo sito e i tuoi contenuti",
    intro: "Future Media Services riunisce chi disegna l’interfaccia, chi sviluppa il sito e chi prepara i contenuti per Instagram.",
    statement: "Un sito è pronto quando un cliente trova ciò che cerca e il tuo team sa aggiornarlo in autonomia.",
    values: [
      { title: "Prima il brief", body: "Concordiamo il pubblico, gli obiettivi e le priorità prima di iniziare a produrre." },
      { title: "Dettagli che servono", body: "Dalla leggibilità di un titolo al percorso per chiedere un preventivo, ogni scelta ha uno scopo preciso." },
      { title: "Progetti documentati", body: "Nelle schede trovi il nostro ruolo, le tecnologie usate e l’origine delle immagini." },
    ],
  },
  contact: {
    eyebrow: "Contatti", title: "Parliamo del tuo progetto",
    intro: "Raccontaci di cosa hai bisogno per il sito o per Instagram. Ti risponderemo via email per definire attività, tempi e preventivo.",
    briefLabel: "Prima di scriverci",
    estimateNote: "Sapere quali lingue ti servono e quando vuoi pubblicare ci aiuta a preparare un preventivo più preciso.",
    directTitle: "Cosa includere nel messaggio", directBody: "Indica il sito o il profilo attuale, cosa vuoi realizzare e quali contenuti hai già a disposizione.",
  },
  privacy: {
    eyebrow: "Privacy", title: "Come usiamo la tua email e il tuo messaggio",
    intro: "Quando invii il modulo, FMS riceve il tuo indirizzo email e il messaggio per rispondere alla tua richiesta.",
    items: [
      { title: "Dati ricevuti", body: "La casella di posta di FMS riceve il tuo indirizzo email, il testo del messaggio, la lingua del modulo e l’orario di invio. Per chiederne la cancellazione puoi rispondere alla nostra email o usare il modulo." },
      { title: "Prevenzione degli invii duplicati", body: "Per limitare gli invii ripetuti, le ricevute contengono identificatori crittografici della richiesta e della rete. Scadono dopo 24 ore e vengono eliminate alla pulizia successiva." },
      { title: "Link esterni", body: "Instagram è un servizio indipendente. Quando apri il suo sito si applica la relativa informativa sulla privacy." },
    ],
  },
  faq: {
    eyebrow: "Domande frequenti", title: "Prima di iniziare",
    intro: "Qui trovi le risposte su tempi, pagamenti, assistenza e avvio del progetto.",
    allLabel: "Domande frequenti", moreLabel: "Tutte le domande", contactPrompt: "Hai un’altra domanda?", contactTitle: "Parliamone insieme.",
    items: [
      { question: "Come avviamo il progetto?", answer: "Scrivici dal modulo Contatti indicando il servizio, i materiali disponibili e le tempistiche. Ti risponderemo via email con i prossimi passi." },
      { question: "Quanto tempo serve per realizzare un sito?", answer: "I piani prevedono in genere da 2 a 12 settimane. Confermiamo il calendario quando abbiamo definito i contenuti e le funzioni richieste." },
      { question: "Posso pagare il sito a rate?", answer: "Sì. Il pagamento a rate è disponibile per tutti e tre i piani web. Concordiamo insieme le scadenze." },
      { question: "Posso aggiornare il sito dopo la consegna?", answer: "Sì. I siti con WordPress headless includono il pannello per gestire i contenuti e la formazione prevista dal piano scelto." },
      { question: "Cosa comprende la gestione di Instagram?", answer: "Calendario editoriale, grafica per post e storie, produzione di reel, identità visiva e report mensile. Il numero di contenuti dipende dal piano." },
      { question: "Quando viene confermato il prezzo?", answer: "Le tariffe dei siti sono prezzi di partenza in toman iraniani. Dopo il confronto su contenuti e funzioni ricevi il preventivo per il progetto concordato." },
    ],
  },
  serviceDetail: { problem: "L’esigenza", deliverables: "Cosa comprende il servizio", approach: "Come lavoriamo", idealFor: "A chi si rivolge", ctaTitle: "Ti aiutiamo a scegliere il piano?" },
  common: {
    explore: "Scopri il servizio", allServices: "Tutti i servizi", viewWork: "Guarda i progetti", pending: "Documentazione in preparazione",
    projectPrompt: "Scrivi allo studio", back: "Indietro", notFound: "Pagina non trovata", notFoundBody: "L’indirizzo potrebbe essere cambiato. Puoi proseguire dalla pagina iniziale.",
    home: "Torna alla home", skipToContent: "Vai al contenuto", privacy: "Privacy", homeAria: "Pagina iniziale di FMS", mainNavAria: "Navigazione principale",
    mobileNavAria: "Menu di navigazione", footerNavAria: "Navigazione a piè di pagina", switchToEnglishAria: "Switch to English", switchToPersianAria: "تغییر زبان به فارسی",
    footerLine: "Siti web su misura e contenuti per Instagram.", rights: "Tutti i diritti riservati.",
  },
};
