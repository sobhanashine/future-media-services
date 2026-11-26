import type { GuideSlug } from "./guide-slugs";
import type { InternationalLocale } from "./locales";

type Edition = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};
type Guide = Record<InternationalLocale, Edition> & {
  sources: { href: string; en: string; it: string }[];
};

export const guideEditions: Record<GuideSlug, Guide> = {
  "instagram-story-link-tracking-utm-ga4": {
    en: {
      title: "Track enquiries from Instagram Stories",
      intro: "A sticker tap, a website visit and a callback request are three different events. Track each one to see where people drop out.",
      sections: [
        {
          heading: "Build the campaign link",
          body: "Add utm_source=instagram, utm_medium=social and a consistent campaign name to the landing page URL. Use utm_content to distinguish two versions of the story. Keep names, email addresses and phone numbers out of these parameters.",
        },
        {
          heading: "Follow the published sticker",
          body: "Open the sticker on a phone from an account that can see the story. Check the final address, the call to action and the form inside Instagram’s browser. A redirect can open the correct page while dropping the campaign tags.",
        },
        {
          heading: "Check the full enquiry",
          body: "In a fresh session, check the source and campaign in GA4. Record generate_lead only after the site confirms the request. Compare website sessions and confirmed leads with Instagram’s sticker taps over the same dates.",
        },
      ],
    },
    it: {
      title: "Misurare le richieste che arrivano dalle storie Instagram",
      intro: "Un tocco sull’adesivo, una visita al sito e una richiesta di contatto sono tre eventi distinti. Misurali separatamente per capire dove si interrompe il percorso.",
      sections: [
        {
          heading: "Prepara il link della campagna",
          body: "Aggiungi utm_source=instagram, utm_medium=social e un nome di campagna coerente all’URL. Usa utm_content per distinguere due versioni della storia. Evita di inserire nomi, indirizzi email o numeri di telefono nei parametri.",
        },
        {
          heading: "Prova l’adesivo pubblicato",
          body: "Apri l’adesivo da un telefono e da un account che vede la storia. Controlla indirizzo finale, invito all’azione e modulo nel browser di Instagram. Un reindirizzamento può portare alla pagina giusta perdendo i parametri.",
        },
        {
          heading: "Controlla la richiesta fino in fondo",
          body: "In una nuova sessione verifica sorgente e campagna in GA4. Registra generate_lead dopo la conferma del sito. Confronta sessioni e richieste confermate con i tocchi sull’adesivo nello stesso periodo.",
        },
      ],
    },
    sources: [
      { href: "https://about.instagram.com/blog/announcements/expanding-sharing-links-in-stories-to-everyone", en: "Instagram link stickers", it: "Adesivi con link su Instagram" },
      { href: "https://support.google.com/analytics/answer/10917952?hl=en", en: "Google Analytics campaign URLs", it: "URL delle campagne in Google Analytics" },
    ],
  },
  "google-indexing-troubleshooting-url-inspection": {
    en: {
      title: "Why a page is missing from Google",
      intro: "Start with the exact public URL. A page can load in a browser while Google still has an older copy, a different canonical URL or no indexed version.",
      sections: [
        {
          heading: "Read the inspection result",
          body: "In Search Console, record the last crawl, page indexing status, declared canonical and Google-selected canonical. The live test checks current access. The indexed result tells you what Google used on its previous visit.",
        },
        {
          heading: "Check the actual page",
          body: "Follow redirects and inspect the response, robots directives and rendered content. A page returning 200 can still look empty or like an error. Check that relevant pages link to it and that the sitemap points to the preferred URL.",
        },
        {
          heading: "Keep evidence of the fix",
          body: "Save the URL, inspection date and before-and-after results. Once the underlying issue is fixed, request a new crawl if appropriate and check again later. Recrawling and indexing can happen at different times.",
        },
      ],
    },
    it: {
      title: "Perché una pagina non compare su Google",
      intro: "Parti dall’URL pubblico esatto. Una pagina può aprirsi nel browser mentre Google conserva una versione precedente, sceglie un altro URL canonico o deve ancora indicizzarla.",
      sections: [
        {
          heading: "Leggi il risultato dell’ispezione",
          body: "In Search Console annota ultima scansione, stato di indicizzazione, canonical dichiarato e quello scelto da Google. Il test in tempo reale verifica l’accesso di oggi. Il risultato indicizzato descrive l’ultima versione elaborata.",
        },
        {
          heading: "Controlla la pagina pubblica",
          body: "Segui i reindirizzamenti e verifica risposta, direttive robots e contenuto visualizzato. Anche una risposta 200 può mostrare una pagina vuota o di errore. Verifica link interni e URL presente nella sitemap.",
        },
        {
          heading: "Conserva le verifiche",
          body: "Registra indirizzo, data e risultati prima e dopo la modifica. Dopo la correzione puoi richiedere una nuova scansione e controllare di nuovo in seguito. Scansione e indicizzazione possono avvenire in momenti diversi.",
        },
      ],
    },
    sources: [
      { href: "https://support.google.com/webmasters/answer/9012289?hl=en", en: "Search Console URL Inspection", it: "Controllo URL in Search Console" },
      { href: "https://support.google.com/webmasters/answer/7440203?hl=en", en: "Page indexing report", it: "Rapporto di indicizzazione delle pagine" },
    ],
  },
  "wordpress-headless-content-update-cache-guide": {
    en: {
      title: "When a WordPress edit does not appear on a headless site",
      intro: "Follow a single edit from the editor to the public page. The CMS, the data response and the page cache can each contain a different version.",
      sections: [
        {
          heading: "Identify the published version",
          body: "Record the content ID, language, URL and publication time. Check the published WordPress response and then the public page in a fresh session. This shows which part of the journey still serves the old text.",
        },
        {
          heading: "Match the update to the deployment",
          body: "A static export needs a new build. A site using revalidation can refresh a page or a group of tagged data. Confirm which event triggers the refresh and include affected lists, translations and the old URL when the slug changes.",
        },
        {
          heading: "Test publication and removal",
          body: "Publish a recognisable edit and observe the detail page and its listing. Then test the agreed unpublishing behaviour. Record when the public response changes and who can intervene if the update fails.",
        },
      ],
    },
    it: {
      title: "Quando una modifica in WordPress non appare sul sito headless",
      intro: "Segui una singola modifica dall’editor alla pagina pubblica. Il CMS, la risposta dei dati e la cache della pagina possono contenere versioni diverse.",
      sections: [
        {
          heading: "Identifica la versione pubblicata",
          body: "Annota ID del contenuto, lingua, URL e ora di pubblicazione. Confronta la risposta pubblica di WordPress con la pagina aperta in una nuova sessione per localizzare la versione precedente.",
        },
        {
          heading: "Verifica come viene aggiornato il sito",
          body: "Un’esportazione statica richiede una nuova build. Un sito con riconvalida può aggiornare una pagina o dati con lo stesso tag. Verifica quale evento attiva il processo e includi elenchi, traduzioni e vecchi URL.",
        },
        {
          heading: "Prova pubblicazione e ritiro",
          body: "Pubblica una modifica riconoscibile e osserva sia la pagina sia l’elenco che la contiene. Prova anche il ritiro dalla pubblicazione. Annota quando cambia la risposta e chi interviene se l’aggiornamento fallisce.",
        },
      ],
    },
    sources: [
      { href: "https://developer.wordpress.org/rest-api/reference/posts/", en: "WordPress posts API", it: "API degli articoli WordPress" },
      { href: "https://nextjs.org/docs/app/api-reference/functions/revalidatePath", en: "Next.js path revalidation", it: "Riconvalida dei percorsi in Next.js" },
    ],
  },
  "instagram-management-outsourcing-access-handover-checklist": {
    en: {
      title: "Handing Instagram management to an agency",
      intro: "Agree on who owns the account, who can publish and what the agency will deliver before the first post goes out.",
      sections: [
        {
          heading: "Write down the scope",
          body: "List monthly posts, stories and reels, the formats, who supplies footage and how many review rounds are included. Assign one person to approve the calendar and agree on a deadline for changes.",
        },
        {
          heading: "Keep control of the account",
          body: "Keep ownership and recovery details with the business. Grant the agency the roles it needs through Meta’s business tools, enable two-factor authentication and keep a record of who has access.",
        },
        {
          heading: "Agree on review and handover",
          body: "At the end of the first month, compare the approved plan with published posts and the report. On handover, collect editable files and the next calendar, transfer outstanding work and remove access that is no longer needed.",
        },
      ],
    },
    it: {
      title: "Affidare Instagram a un’agenzia",
      intro: "Prima del primo post chiarisci chi possiede l’account, chi può pubblicare e quali materiali deve consegnare l’agenzia.",
      sections: [
        {
          heading: "Definisci le attività incluse",
          body: "Elenca post, storie e reel mensili, formati, responsabile delle riprese e revisioni incluse. Scegli chi approva il calendario e concorda una scadenza per chiedere modifiche.",
        },
        {
          heading: "Mantieni il controllo dell’account",
          body: "Conserva proprietà e recapiti di recupero presso l’azienda. Dai all’agenzia i permessi necessari con gli strumenti business di Meta, abilita l’autenticazione a due fattori e annota chi ha accesso.",
        },
        {
          heading: "Concorda verifica e consegna",
          body: "A fine mese confronta il piano approvato con le pubblicazioni e il report. Alla fine della collaborazione ritira file modificabili e calendario, trasferisci le attività aperte e revoca gli accessi superflui.",
        },
      ],
    },
    sources: [
      { href: "https://developers.facebook.com/docs/business-management-apis/business-asset-management/guides/instagram-accounts", en: "Meta business asset access", it: "Accessi agli asset business di Meta" },
      { href: "https://developers.facebook.com/docs/graph-api/reference/shadow-ig-user/insights/", en: "Instagram Insights metrics", it: "Metriche di Instagram Insights" },
    ],
  },
  "ecommerce-category-page-structure-seo-guide": {
    en: {
      title: "Organise an online shop’s category pages",
      intro: "A category should help a shopper narrow a choice and find the right product. Its navigation also gives search engines a route to the catalogue.",
      sections: [
        {
          heading: "Start with the buying decision",
          body: "Group products by the distinctions customers actually use. Give each category a clear name, a short introduction and cards that show the information needed to compare products.",
        },
        {
          heading: "Plan filters and pagination",
          body: "Decide which combinations deserve their own landing page. Keep sorting and filter parameters consistent and expose links to later pages so shoppers and crawlers can reach products beyond the first screen.",
        },
        {
          heading: "Try the empty and mobile states",
          body: "Test a filter that returns no products, clear it and return to the list. On a phone, open a product near the end of the category and go back. Check that the category still works as the catalogue changes.",
        },
      ],
    },
    it: {
      title: "Organizzare le categorie di un negozio online",
      intro: "Una categoria aiuta il cliente a restringere la scelta e trovare il prodotto. La sua navigazione offre anche ai motori di ricerca un percorso verso il catalogo.",
      sections: [
        {
          heading: "Parti dalla scelta del cliente",
          body: "Raggruppa i prodotti secondo le distinzioni utili a chi compra. Dai alla categoria un nome chiaro, una breve introduzione e schede con gli elementi necessari per il confronto.",
        },
        {
          heading: "Progetta filtri e paginazione",
          body: "Decidi quali combinazioni meritano una pagina dedicata. Usa parametri coerenti per filtri e ordinamento e rendi raggiungibili con link anche i prodotti successivi alla prima pagina.",
        },
        {
          heading: "Prova le categorie vuote e il mobile",
          body: "Prova un filtro senza risultati, azzeralo e torna all’elenco. Da telefono apri un prodotto in fondo alla categoria e torna indietro. Verifica il comportamento anche quando il catalogo cambia.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure", en: "Google’s e-commerce site structure guide", it: "Struttura dei siti e-commerce secondo Google" },
      { href: "https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading", en: "Pagination and incremental loading", it: "Paginazione e caricamento progressivo" },
    ],
  },
  "instagram-visual-identity-content-system-guide": {
    en: {
      title: "A visual identity for Instagram that your team can reuse",
      intro: "Turn the brand’s colours, typography and image choices into a small set of working templates. Test them with real posts before producing a month of content.",
      sections: [
        {
          heading: "Choose repeatable uses",
          body: "Start with recurring jobs such as introducing a product, answering a question or sharing a customer story. Decide which elements stay fixed and which can change with the message.",
        },
        {
          heading: "Design for the actual format",
          body: "Check type size and contrast on a phone. Open the same artwork as a feed post, reel cover and story. Allow room for interface controls and use captions when speech carries the message.",
        },
        {
          heading: "Hand over a working kit",
          body: "Save editable masters, export examples and a short guide to naming and approval. Have someone outside the design team create the next post using the kit and note any decisions they could not make independently.",
        },
      ],
    },
    it: {
      title: "Un’identità visiva Instagram che il team può riutilizzare",
      intro: "Traduci colori, caratteri e immagini del marchio in pochi modelli operativi. Provali con post reali prima di produrre un mese intero di contenuti.",
      sections: [
        {
          heading: "Individua i formati ricorrenti",
          body: "Parti dalle esigenze che ritornano, come presentare un prodotto, rispondere a una domanda o raccontare un’esperienza. Stabilisci quali elementi restano fissi e quali cambiano con il messaggio.",
        },
        {
          heading: "Disegna per il formato reale",
          body: "Controlla dimensione dei caratteri e contrasto sul telefono. Prova la grafica nel feed, come copertina di reel e nelle storie. Lascia spazio ai comandi e aggiungi sottotitoli quando il parlato è essenziale.",
        },
        {
          heading: "Consegna un kit utilizzabile",
          body: "Conserva modelli modificabili, esempi esportati e una breve guida per nomi e approvazioni. Chiedi a chi pubblica di preparare il post successivo e annota i passaggi per cui serve ancora aiuto.",
        },
      ],
    },
    sources: [
      { href: "https://help.instagram.com/1631821640426723", en: "Instagram image resolution", it: "Risoluzione delle immagini su Instagram" },
      { href: "https://help.instagram.com/503708446705527", en: "Instagram alternative text", it: "Testo alternativo su Instagram" },
    ],
  },
  "corporate-service-page-content-guide": {
    en: {
      title: "Write a service page that answers a buyer’s questions",
      intro: "Give one service its own page when it serves a distinct customer need. The visitor should be able to judge fit, see evidence and take the next step.",
      sections: [
        {
          heading: "Define the offer",
          body: "Write down the customer, their situation, what is included and what they will receive. Explain any conditions that affect timing or price. Replace broad claims with specific deliverables.",
        },
        {
          heading: "Show relevant evidence",
          body: "Add a project with a similar requirement and describe your role. Place answers to recurring questions close to the decision they affect. Use descriptive links to the case study and any related service.",
        },
        {
          heading: "Test the enquiry path",
          body: "Ask someone new to the business to explain the offer after reading the page. Have them find the contact action on mobile, submit a test request in a controlled setting and check who receives it.",
        },
      ],
    },
    it: {
      title: "Scrivere una pagina servizio che aiuti il cliente a scegliere",
      intro: "Dedica una pagina a un servizio quando risponde a un’esigenza precisa. Il visitatore deve poterne valutare l’utilità, vedere un esempio e sapere come procedere.",
      sections: [
        {
          heading: "Definisci l’offerta",
          body: "Indica il cliente a cui ti rivolgi, la sua esigenza, le attività incluse e il risultato della consegna. Spiega cosa incide su tempi e costi. Usa esempi di lavoro concreto.",
        },
        {
          heading: "Mostra un esempio pertinente",
          body: "Inserisci un progetto con un’esigenza simile e descrivi il tuo contributo. Rispondi alle domande ricorrenti vicino al punto in cui nasce il dubbio. Dai ai link verso progetti e servizi un testo comprensibile.",
        },
        {
          heading: "Verifica il percorso di contatto",
          body: "Chiedi a chi non conosce l’attività di spiegare il servizio dopo la lettura. Fagli trovare il contatto da telefono. In un ambiente di prova invia una richiesta e verifica chi la riceve.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", en: "Google’s people-first content guide", it: "Contenuti utili per le persone secondo Google" },
      { href: "https://www.w3.org/WAI/tips/writing/", en: "W3C tips for writing on the web", it: "Indicazioni W3C per scrivere sul web" },
    ],
  },
  "nextjs-url-migration-redirect-guide": {
    en: {
      title: "Change site URLs without losing the route to a page",
      intro: "A migration starts with a map of old addresses and their closest new equivalents. Keep that map available through launch and monitoring.",
      sections: [
        {
          heading: "Build the redirect map",
          body: "Collect URLs from the sitemap, internal links and pages with search traffic. Match each old URL to a page with the same purpose. Document retired content separately when there is no meaningful replacement.",
        },
        {
          heading: "Update links at their source",
          body: "Apply a permanent redirect where the move is permanent. Point menus, canonical tags, language alternatives and sitemap entries directly to the final address. Check query strings that the destination needs.",
        },
        {
          heading: "Verify real responses",
          body: "Test representative old URLs and their final status codes after launch. Look for loops, chains and inappropriate home-page redirects. Track crawling and indexing of the new URLs in Search Console over time.",
        },
      ],
    },
    it: {
      title: "Cambiare gli URL senza perdere il percorso delle pagine",
      intro: "La migrazione parte da una mappa dei vecchi indirizzi e delle nuove pagine equivalenti. Conservala durante il rilascio e per le verifiche successive.",
      sections: [
        {
          heading: "Prepara la mappa dei reindirizzamenti",
          body: "Raccogli URL dalla sitemap, dai link interni e dalle pagine con traffico organico. Associa ogni indirizzo a una destinazione con la stessa funzione. Segnala a parte i contenuti ritirati senza sostituto.",
        },
        {
          heading: "Aggiorna i collegamenti all’origine",
          body: "Usa un reindirizzamento permanente quando lo spostamento è definitivo. Menu, canonical, alternative linguistiche e sitemap devono puntare all’indirizzo finale. Verifica i parametri necessari alla destinazione.",
        },
        {
          heading: "Controlla le risposte pubbliche",
          body: "Dopo il rilascio prova vecchi URL rappresentativi e registra lo stato finale. Cerca cicli, catene e reindirizzamenti impropri alla home. Segui nel tempo scansione e indicizzazione dei nuovi indirizzi in Search Console.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes", en: "Google’s site move guidance", it: "Guida Google alle migrazioni" },
      { href: "https://developers.google.com/search/docs/crawling-indexing/301-redirects", en: "Permanent redirects", it: "Reindirizzamenti permanenti" },
    ],
  },
  "ecommerce-product-page-content-qa-guide": {
    en: {
      title: "Check a product page before putting it on sale",
      intro: "A shopper needs the price, the available variant and the delivery conditions before committing to a purchase. Check them together with the cart.",
      sections: [
        {
          heading: "Define the product information",
          body: "Agree on the product name, identifiers, images, dimensions, variants and stock source. Explain what the customer receives. Place shipping and return information where it can influence the decision.",
        },
        {
          heading: "Try a real variation",
          body: "Switch size or colour and check the image, price and stock. Add the variant to the cart, go back and confirm the same selection survives. Try an unavailable combination and check the message on mobile.",
        },
        {
          heading: "Compare the public evidence",
          body: "Check the displayed offer against the structured data and the price used in checkout. Record the variant and time when reporting differences so the catalogue team can reproduce the issue.",
        },
      ],
    },
    it: {
      title: "Verificare una scheda prodotto prima della vendita",
      intro: "Prima dell’acquisto il cliente deve conoscere prezzo, variante disponibile e condizioni di consegna. Verifica questi elementi insieme al carrello.",
      sections: [
        {
          heading: "Definisci i dati del prodotto",
          body: "Concorda nome, identificativi, immagini, dimensioni, varianti e fonte della disponibilità. Spiega cosa riceve il cliente. Rendi facili da trovare condizioni di spedizione e reso.",
        },
        {
          heading: "Prova una variante concreta",
          body: "Cambia taglia o colore e verifica foto, prezzo e scorte. Aggiungi la variante al carrello e controlla che la selezione si conservi. Prova una combinazione esaurita e leggi il messaggio da telefono.",
        },
        {
          heading: "Confronta le informazioni pubbliche",
          body: "Confronta l’offerta visibile con i dati strutturati e con il prezzo al checkout. Se trovi differenze, annota variante e ora per consentire al team del catalogo di ripetere la verifica.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/appearance/structured-data/product", en: "Google product data documentation", it: "Dati strutturati dei prodotti su Google" },
      { href: "https://developers.google.com/search/docs/appearance/structured-data/product-variants", en: "Product variants", it: "Varianti di prodotto" },
    ],
  },
  "wordpress-headless-images-nextjs-guide": {
    en: {
      title: "Using WordPress images on a Next.js site",
      intro: "Follow one image from the WordPress media library to the public page. Metadata, size and crop all affect the result visitors see.",
      sections: [
        {
          heading: "Read the media record",
          body: "Use the attachment ID to retrieve the source, available sizes, dimensions and alt text. Define what a page should show when an image is missing or is purely decorative.",
        },
        {
          heading: "Size for its place on the page",
          body: "Reserve the image’s space and tell the frontend how wide it will appear at each breakpoint. Open the page on a phone and inspect the downloaded file and the crop, especially for product details or faces.",
        },
        {
          heading: "Test a replacement",
          body: "Replace an image in the CMS and check the detail page, listing and social preview. Document which changes trigger a refresh and how the editorial team can verify the public image.",
        },
      ],
    },
    it: {
      title: "Usare le immagini WordPress in un sito Next.js",
      intro: "Segui un’immagine dalla libreria media di WordPress alla pagina pubblica. Metadati, dimensioni e ritaglio determinano il risultato visibile.",
      sections: [
        {
          heading: "Leggi la scheda del file",
          body: "Usa l’ID dell’allegato per recuperare sorgente, formati, dimensioni e testo alternativo. Definisci cosa mostrare quando l’immagine manca o ha solo una funzione decorativa.",
        },
        {
          heading: "Dimensiona rispetto allo spazio reale",
          body: "Riserva lo spazio dell’immagine e indica al frontend quanto sarà larga nei diversi layout. Da telefono controlla il file scaricato e il ritaglio, in particolare per prodotti e volti.",
        },
        {
          heading: "Prova una sostituzione",
          body: "Sostituisci un’immagine nel CMS e verifica scheda, elenco e anteprima di condivisione. Documenta quali modifiche attivano un aggiornamento e come la redazione può controllare il risultato pubblico.",
        },
      ],
    },
    sources: [
      { href: "https://developer.wordpress.org/rest-api/reference/media/", en: "WordPress media reference", it: "Riferimento media di WordPress" },
      { href: "https://nextjs.org/docs/app/getting-started/images", en: "Next.js image guide", it: "Guida alle immagini in Next.js" },
    ],
  },
  "corporate-website-contact-form-guide": {
    en: {
      title: "Make sure a contact form reaches the right person",
      intro: "The success message is one part of an enquiry. Trace the request through validation, processing and its final destination.",
      sections: [
        {
          heading: "Ask only for what the team uses",
          body: "Define who receives an enquiry and what information they need to follow up. Give every field a visible label and explain formats such as international telephone numbers before submission.",
        },
        {
          heading: "Make each outcome clear",
          body: "Test a valid request, incomplete data and temporary delivery failure. Keep the user’s input on a recoverable error, put the message beside the form and only show success when the configured destination accepts the request.",
        },
        {
          heading: "Verify the receiving end",
          body: "Use an agreed test recipient and check the actual record or inbox. Match it with the submission time and make sure retrying does not create duplicate leads. Keep personal details out of analytics.",
        },
      ],
    },
    it: {
      title: "Verificare che il modulo contatti raggiunga la persona giusta",
      intro: "Il messaggio di conferma è solo un passaggio. Segui la richiesta dalla validazione fino al recapito previsto.",
      sections: [
        {
          heading: "Chiedi i dati che servono davvero",
          body: "Stabilisci chi riceve la richiesta e quali informazioni servono per rispondere. Assegna un’etichetta visibile a ogni campo e chiarisci formati come il prefisso internazionale prima dell’invio.",
        },
        {
          heading: "Distingui gli esiti",
          body: "Prova una richiesta valida, dati incompleti e un errore temporaneo di recapito. Conserva i campi in caso di errore recuperabile e mostra la conferma soltanto dopo l’accettazione della richiesta.",
        },
        {
          heading: "Verifica anche la ricezione",
          body: "Usa un destinatario di prova concordato e controlla il record o la casella di arrivo. Confronta orario e contenuto e verifica che un nuovo tentativo non crei duplicati. Escludi i dati personali dalle statistiche.",
        },
      ],
    },
    sources: [
      { href: "https://www.w3.org/WAI/tutorials/forms/", en: "W3C guide to accessible forms", it: "Guida W3C ai moduli accessibili" },
      { href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation", en: "MDN form validation", it: "Validazione dei moduli su MDN" },
    ],
  },
  "multilingual-corporate-website-guide": {
    en: {
      title: "Plan a multilingual company website",
      intro: "Map the pages a customer needs in each market, including the journey from services and proof of work to the enquiry form.",
      sections: [
        {
          heading: "Map the content before translating",
          body: "List each page, its owner and its equivalent in every published language. Include navigation, error messages, prices, dates and form responses. Decide what to offer when an article has no translation.",
        },
        {
          heading: "Give each language a stable URL",
          body: "Use links people can open and share directly. The language switch should take a visitor to the equivalent page where available. Set the document language, direction, canonical and reciprocal language alternatives for each version.",
        },
        {
          heading: "Test one customer journey per language",
          body: "Start on a shared project link, follow a service, compare the plans and request contact. Check layout on a small screen and ensure the team receiving the enquiry can see which language the visitor used.",
        },
      ],
    },
    it: {
      title: "Progettare un sito aziendale multilingue",
      intro: "Elenca le pagine che servono ai clienti di ogni mercato, dai servizi e dagli esempi di lavoro al modulo per il preventivo.",
      sections: [
        {
          heading: "Mappa i contenuti prima di tradurre",
          body: "Elenca ogni pagina, il responsabile e la versione nelle lingue pubblicate. Includi navigazione, errori, prezzi, date e risposte del modulo. Definisci la destinazione per un articolo ancora senza traduzione.",
        },
        {
          heading: "Assegna URL stabili alle lingue",
          body: "Ogni versione deve avere un link che si possa aprire e condividere. Il selettore dovrebbe portare alla pagina equivalente quando esiste. Imposta lingua, direzione, canonical e alternative linguistiche reciproche.",
        },
        {
          heading: "Prova un percorso cliente per lingua",
          body: "Apri il link condiviso di un progetto, visita un servizio, confronta i piani e prova il contatto. Controlla il layout da telefono e verifica che chi riceve la richiesta ne conosca la lingua.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites", en: "Managing multilingual sites", it: "Gestione dei siti multilingue" },
      { href: "https://developers.google.com/search/docs/specialty/international/localized-versions", en: "Google’s localized page guidance", it: "Versioni localizzate delle pagine per Google" },
    ],
  },
  "wordpress-headless-content-preview-guide": {
    en: {
      title: "Preview WordPress drafts on a headless website",
      intro: "Editors need to see the layout that will go live while visitors continue to see the published version. Treat preview and publication as separate actions.",
      sections: [
        {
          heading: "Define what editors can preview",
          body: "Agree on supported post types, languages and revisions. Open the preview from the editor and confirm that it shows the intended draft with the same components used by the public site.",
        },
        {
          heading: "Separate draft and public access",
          body: "Use an authorised preview flow. Keep drafts out of public caches, navigation and sitemaps. Try the public URL in a separate signed-out session while an editor is previewing changes.",
        },
        {
          heading: "Close the editorial loop",
          body: "Exit preview, publish the revision and verify the public page and its listing. Repeat with an unpublished item so editors know what will be visible at each step.",
        },
      ],
    },
    it: {
      title: "Visualizzare le bozze WordPress su un sito headless",
      intro: "La redazione deve vedere l’impaginazione futura mentre i visitatori continuano a leggere la versione pubblicata. Anteprima e pubblicazione richiedono percorsi distinti.",
      sections: [
        {
          heading: "Definisci cosa può vedere la redazione",
          body: "Concorda tipi di contenuto, lingue e revisioni disponibili. Apri l’anteprima dall’editor e verifica che mostri la bozza corretta con gli stessi componenti del sito pubblico.",
        },
        {
          heading: "Separa bozza e accesso pubblico",
          body: "Usa un percorso di anteprima riservato. Escludi le bozze da cache pubbliche, navigazione e sitemap. Prova l’URL pubblico in una sessione separata senza accesso mentre un redattore visualizza le modifiche.",
        },
        {
          heading: "Completa il ciclo editoriale",
          body: "Esci dall’anteprima, pubblica la revisione e verifica pagina ed elenco pubblici. Ripeti la prova con un contenuto ritirato per chiarire cosa vede il visitatore in ogni fase.",
        },
      ],
    },
    sources: [
      { href: "https://nextjs.org/docs/app/api-reference/functions/draft-mode", en: "Next.js Draft Mode", it: "Modalità bozza in Next.js" },
      { href: "https://nextjs.org/docs/app/api-reference/functions/revalidatePath", en: "Refreshing a published path", it: "Aggiornare un percorso pubblicato" },
    ],
  },
  "nextjs-core-web-vitals-optimization-guide": {
    en: {
      title: "Find the cause of a slow Next.js page",
      intro: "Start with the pages customers actually use. Field data describes real visits, while a repeatable lab test helps isolate the cause.",
      sections: [
        {
          heading: "Identify the affected experience",
          body: "Check LCP for the main content appearing, INP for delayed interactions and CLS for unexpected layout shifts. Group results by page type and device before choosing a fix.",
        },
        {
          heading: "Inspect a representative page",
          body: "Look at the main image and when its download starts. Try the slow interaction and inspect the work it triggers. For a shifting layout, watch what moves when images, fonts or promotional blocks appear.",
        },
        {
          heading: "Verify the change twice",
          body: "Repeat the same lab conditions after the change. Once the release is live, monitor the same group of pages in field data as new measurements arrive. Record device, date and page for comparisons.",
        },
      ],
    },
    it: {
      title: "Capire perché una pagina Next.js è lenta",
      intro: "Parti dalle pagine che i clienti usano davvero. I dati sul campo descrivono le visite reali, mentre una prova ripetibile aiuta a isolare la causa.",
      sections: [
        {
          heading: "Individua il problema percepito",
          body: "Usa LCP per il caricamento del contenuto principale, INP per la risposta alle interazioni e CLS per gli spostamenti inattesi. Separa i risultati per tipo di pagina e dispositivo.",
        },
        {
          heading: "Esamina una pagina rappresentativa",
          body: "Individua l’immagine principale e l’inizio del suo download. Ripeti l’interazione lenta e osserva il lavoro che avvia. Per un layout instabile, guarda cosa si sposta quando arrivano immagini, caratteri o promozioni.",
        },
        {
          heading: "Verifica in due momenti",
          body: "Ripeti la stessa prova dopo la modifica. A pubblicazione avvenuta osserva lo stesso gruppo di pagine nei dati reali man mano che arrivano nuovi campioni. Registra dispositivo, data e pagina.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/appearance/core-web-vitals", en: "Google Search and Core Web Vitals", it: "Core Web Vitals e Ricerca Google" },
      { href: "https://web.dev/articles/vitals", en: "Web Vitals explained", it: "Guida ai Web Vitals" },
    ],
  },
  "nextjs-canonical-url-guide": {
    en: {
      title: "Choose the canonical URL for a Next.js page",
      intro: "When a page is reachable at several addresses, decide which version people should share, search engines should consider and internal links should use.",
      sections: [
        {
          heading: "Choose an address for each page",
          body: "List protocol, host, slash, parameter and language variants. Keep useful distinct pages separate. A paginated listing or a real translation normally needs its own preferred URL.",
        },
        {
          heading: "Align the signals",
          body: "Generate the canonical from the public production address and the actual route. Link internally to that address and include it in the sitemap. When a duplicate address is permanently retired, send visitors to the replacement.",
        },
        {
          heading: "Inspect the rendered output",
          body: "Read the canonical in the published HTML, follow its target and check that it returns the intended content. Compare it with Search Console’s selected URL after Google has recrawled the page.",
        },
      ],
    },
    it: {
      title: "Scegliere l’URL canonico di una pagina Next.js",
      intro: "Quando una pagina è raggiungibile a più indirizzi, scegli quale condividere, proporre ai motori di ricerca e usare nei collegamenti interni.",
      sections: [
        {
          heading: "Scegli un indirizzo per pagina",
          body: "Elenca varianti di protocollo, dominio, slash, parametri e lingua. Mantieni separate le pagine con un valore distinto. Una pagina successiva di elenco o una traduzione reale ha in genere il proprio URL preferito.",
        },
        {
          heading: "Allinea i segnali",
          body: "Genera il canonical dal dominio pubblico e dal percorso corretto. Usa lo stesso indirizzo nei link interni e nella sitemap. Quando elimini definitivamente un duplicato, reindirizza il visitatore alla sostituzione.",
        },
        {
          heading: "Controlla l’HTML pubblicato",
          body: "Leggi il canonical nell’HTML pubblico, segui la destinazione e verifica che mostri il contenuto previsto. Dopo una nuova scansione confrontalo con l’indirizzo selezionato in Search Console.",
        },
      ],
    },
    sources: [
      { href: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata", en: "Next.js metadata reference", it: "Riferimento ai metadati di Next.js" },
      { href: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls", en: "Google’s canonical URL guide", it: "Guida Google agli URL canonici" },
    ],
  },
  "instagram-content-calendar-guide": {
    en: {
      title: "Build an Instagram calendar your team can publish from",
      intro: "A useful calendar connects each post to an audience, an objective and a person responsible for getting it published.",
      sections: [
        {
          heading: "Give every item a brief",
          body: "Record the topic, intended reader, format, call to action, publication date, owner and approval status. Link to the copy and source files so the person publishing can find the approved version.",
        },
        {
          heading: "Plan around production capacity",
          body: "Group filming and design tasks with similar requirements. Leave time for review, corrections and last-minute changes. If an AI tool suggests topics or captions, check facts and brand voice before approval.",
        },
        {
          heading: "Use results in the next plan",
          body: "Match the metric to the objective. Saves, replies, profile visits and enquiries answer different questions. Record one practical change for the next month alongside the numbers.",
        },
      ],
    },
    it: {
      title: "Creare un calendario Instagram che il team possa usare",
      intro: "Un calendario utile collega ogni contenuto a un pubblico, a un obiettivo e a una persona che si occupa di pubblicarlo.",
      sections: [
        {
          heading: "Prepara un brief per ogni contenuto",
          body: "Annota tema, pubblico, formato, invito all’azione, data, responsabile e stato di approvazione. Collega testi e file originali per consentire a chi pubblica di trovare la versione approvata.",
        },
        {
          heading: "Pianifica in base alle risorse",
          body: "Raggruppa riprese e grafiche con esigenze simili. Lascia spazio a verifica, correzioni e cambi di programma. Se usi uno strumento di IA per proposte o didascalie, controlla fatti e tono prima dell’approvazione.",
        },
        {
          heading: "Usa i risultati per il mese seguente",
          body: "Scegli la metrica in base all’obiettivo. Salvataggi, risposte, visite al profilo e richieste descrivono azioni diverse. Accanto ai numeri annota una modifica concreta da provare il mese successivo.",
        },
      ],
    },
    sources: [
      { href: "https://www.facebook.com/help/instagram/138925576505882", en: "Instagram professional accounts", it: "Account professionali Instagram" },
      { href: "https://www.facebook.com/help/instagram/788388387972460", en: "Instagram Insights", it: "Statistiche di Instagram" },
    ],
  },
  "custom-ecommerce-website-or-ready-made-template": {
    en: {
      title: "A custom online shop or a ready-made theme?",
      intro: "The right choice depends on how your catalogue, checkout and team work. Compare both approaches using your own products before you commit.",
      sections: [
        {
          heading: "Try the difficult product first",
          body: "Use a product with variants, availability rules or unusual shipping. Try finding it on mobile, comparing options, adding it to the cart and changing the order. Ask the person managing the catalogue to update it.",
        },
        {
          heading: "Compare the work each option needs",
          body: "A theme can suit a standard catalogue and a short launch timetable. Custom development can be worthwhile for distinctive purchase journeys, integrations or editorial needs. For each requirement, note the configuration, extension or development it needs.",
        },
        {
          heading: "Compare the cost after launch",
          body: "Include maintenance, paid extensions, training and the cost of changing the design. Agree on an acceptance test for the first sale and make sure your own team can manage products and orders.",
        },
      ],
    },
    it: {
      title: "Negozio online su misura o tema pronto?",
      intro: "La scelta dipende dal catalogo, dal percorso d’acquisto e dal modo in cui lavora il team. Confronta le due soluzioni con i tuoi prodotti prima di investire.",
      sections: [
        {
          heading: "Prova per primo il prodotto più difficile",
          body: "Usa un prodotto con varianti, regole di disponibilità o spedizioni particolari. Da telefono prova a trovarlo, confrontare le opzioni, aggiungerlo al carrello e modificare l’ordine. Fai aggiornare la scheda a chi gestisce il catalogo.",
        },
        {
          heading: "Confronta il lavoro necessario",
          body: "Un tema può bastare per un catalogo standard e tempi brevi. Lo sviluppo su misura può servire per acquisti particolari, integrazioni o esigenze editoriali. Per ogni requisito indica se basta una configurazione, serve un’estensione o occorre sviluppo.",
        },
        {
          heading: "Confronta i costi dopo il lancio",
          body: "Includi manutenzione, estensioni a pagamento, formazione e modifiche future. Concorda una prova di accettazione per il primo acquisto e verifica che il team gestisca prodotti e ordini in autonomia.",
        },
      ],
    },
    sources: [
      { href: "https://help.shopify.com/en/manual/online-store/themes/customizing-themes", en: "Shopify theme customisation", it: "Personalizzazione dei temi Shopify" },
      { href: "https://developers.google.com/search/docs/specialty/ecommerce", en: "Google’s e-commerce guidance", it: "Guida Google ai siti e-commerce" },
    ],
  },
  "corporate-website-handover-checklist": {
    en: {
      title: "What to check at website handover",
      intro: "Use the handover meeting to take ownership of the site and complete a real task with your own account. A folder of passwords alone cannot show whether the team is ready.",
      sections: [
        {
          heading: "Confirm ownership and access",
          body: "Check who owns the domain, hosting, repository and analytics accounts, where renewal notices go and who can recover access. Sign in as the business owner and as an editor with the permissions each role needs.",
        },
        {
          heading: "Run a practical acceptance test",
          body: "From an editor account, update a service description and check the public page. On a phone, open the main navigation and follow a contact request to its agreed destination. Check redirects, metadata and the sitemap.",
        },
        {
          heading: "Leave with a maintenance record",
          body: "Collect source files, brand assets, backup and restore instructions, support contacts and the agreed support period. List outstanding issues with an owner and due date. Keep these records in accounts your organisation controls.",
        },
      ],
    },
    it: {
      title: "Cosa controllare alla consegna del sito aziendale",
      intro: "Usa l’incontro di consegna per prendere in carico il sito ed eseguire un’operazione reale con il tuo account. Verifica che il team sappia intervenire anche dopo la pubblicazione.",
      sections: [
        {
          heading: "Verifica proprietà e accessi",
          body: "Controlla intestatario di dominio e hosting, repository, account di analisi, recapito degli avvisi di rinnovo e procedure di recupero. Accedi sia come titolare sia come redattore con i rispettivi permessi.",
        },
        {
          heading: "Esegui una prova pratica",
          body: "Con l’account redattore aggiorna un servizio e verifica il testo sul sito pubblico. Da telefono apri il menu e segui una richiesta di contatto fino al recapito concordato. Controlla reindirizzamenti, metadati e sitemap.",
        },
        {
          heading: "Conserva il fascicolo di manutenzione",
          body: "Raccogli sorgenti, materiali del marchio, istruzioni di backup e ripristino, contatti e durata dell’assistenza. Assegna ogni punto aperto a una persona con una scadenza. Archivia tutto negli account controllati dall’azienda.",
        },
      ],
    },
    sources: [
      { href: "https://www.icann.org/resources/pages/benefits-2013-09-16-en/", en: "ICANN domain holder information", it: "Informazioni ICANN per i titolari di dominio" },
      { href: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", en: "Building and submitting a sitemap", it: "Creare e inviare una sitemap" },
    ],
  },
  "custom-website-for-service-businesses": {
    en: {
      title: "Plan a website for a service business",
      intro: "A prospective customer usually wants to know whether you can help, whether you have done similar work and how to contact you. Build the site around those questions.",
      sections: [
        {
          heading: "Map the main customer needs",
          body: "List the services people actually ask for and the language they use. Give each distinct offer a clear page and describe the customer, expected outcome, service area and information needed for an estimate.",
        },
        {
          heading: "Show a relevant example",
          body: "Pair each service with a case study or a documented example. Explain what was delivered and what your team did. Keep navigation, headings and contact actions easy to use on a phone.",
        },
        {
          heading: "Agree on the launch checks",
          body: "Gather approved copy and images, assign a content owner and test the enquiry route end to end. Check titles, indexable pages and the sitemap, then agree who will maintain them after handover.",
        },
      ],
    },
    it: {
      title: "Progettare un sito per un’attività di servizi",
      intro: "Chi valuta un servizio vuole capire se puoi aiutarlo, se hai già svolto lavori simili e come contattarti. Organizza il sito intorno a queste domande.",
      sections: [
        {
          heading: "Mappa le esigenze dei clienti",
          body: "Elenca i servizi richiesti e le parole che usano i clienti. Dedica una pagina alle offerte distinte e descrivi destinatario, risultato atteso, area servita e dati necessari per il preventivo.",
        },
        {
          heading: "Mostra un esempio pertinente",
          body: "Abbina al servizio un caso studio o un esempio documentato. Descrivi cosa è stato consegnato e il ruolo del team. Controlla che navigazione, titoli e contatti siano comodi da telefono.",
        },
        {
          heading: "Concorda le verifiche prima del lancio",
          body: "Raccogli testi e immagini approvati, assegna un responsabile dei contenuti e verifica l’intero percorso della richiesta. Controlla titoli, pagine indicizzabili e sitemap e stabilisci chi li manterrà dopo la consegna.",
        },
      ],
    },
    sources: [
      { href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", en: "Google’s helpful content guidance", it: "Guida Google ai contenuti utili" },
      { href: "https://nextjs.org/docs/app", en: "Next.js App Router documentation", it: "Documentazione Next.js App Router" },
    ],
  },
  "nextjs-or-wordpress-headless": {
    en: {
      title: "Choosing Next.js and headless WordPress",
      intro: "Next.js handles the website visitors use. WordPress can supply the editorial system behind it. Decide whether your team benefits from that separation.",
      sections: [
        {
          heading: "Start with the editors",
          body: "List who writes, reviews and publishes, how often content changes and whether the team needs previews, revisions or multiple languages. Try one representative edit with the people who will own it.",
        },
        {
          heading: "Account for the connections",
          body: "A headless setup connects the CMS to a separate frontend. Decide how it will fetch content, handle images, refresh published pages and display drafts. Assign responsibility for maintaining both components.",
        },
        {
          heading: "Test the public result",
          body: "Before choosing the architecture, preview, publish and correct a sample page. Inspect its public HTML, metadata and links. Compare the editorial effort and ongoing maintenance with the value of a custom frontend.",
        },
      ],
    },
    it: {
      title: "Scegliere Next.js e WordPress headless",
      intro: "Next.js gestisce il sito visitato dal pubblico. WordPress può fornire il sistema editoriale a monte. Valuta se separare le due parti è utile per il tuo team.",
      sections: [
        {
          heading: "Parti dalla redazione",
          body: "Elenca chi scrive, approva e pubblica, con quale frequenza e se servono anteprime, revisioni o lingue diverse. Prova una modifica rappresentativa insieme a chi gestirà il sito.",
        },
        {
          heading: "Considera i collegamenti",
          body: "Un sistema headless collega il CMS a un frontend separato. Definisci come recuperare i contenuti, trattare le immagini, aggiornare le pagine e mostrare le bozze. Assegna la manutenzione di entrambe le parti.",
        },
        {
          heading: "Prova il risultato pubblico",
          body: "Prima di scegliere l’architettura, visualizza in anteprima, pubblica e correggi una pagina campione. Esamina HTML, metadati e link pubblici. Confronta il lavoro editoriale e la manutenzione con i benefici dell’interfaccia su misura.",
        },
      ],
    },
    sources: [
      { href: "https://nextjs.org/docs/app", en: "Next.js App Router", it: "App Router di Next.js" },
      { href: "https://developer.wordpress.org/rest-api/reference/", en: "WordPress REST API", it: "API REST di WordPress" },
    ],
  },
  "nextjs-technical-seo-pre-launch-checklist": {
    en: {
      title: "A technical SEO check before a Next.js launch",
      intro: "A build can succeed while a search engine receives the wrong title, an empty page or a staging canonical. Check the actual output for each route family.",
      sections: [
        {
          heading: "Make a small route inventory",
          body: "Include the home page, a service, a project, a dynamic article, a missing URL and each language. Record the expected status, title, indexability and final address before testing.",
        },
        {
          heading: "Inspect what the server sends",
          body: "Verify the heading and main content, title, description, canonical and language alternatives. Check JSON-LD against what is visible on the page. Confirm that robots rules and sitemap entries match the intended public routes.",
        },
        {
          heading: "Repeat the checks on the live host",
          body: "After release, open the production links on a phone and fetch the final HTML. A working preview cannot establish that the live host uses the same version. Record the release and monitor indexing separately in Search Console.",
        },
      ],
    },
    it: {
      title: "Controlli SEO tecnici prima di pubblicare un sito Next.js",
      intro: "Una build può riuscire anche se il motore di ricerca riceve un titolo errato, una pagina vuota o un canonical di staging. Verifica l’output di ogni tipo di pagina.",
      sections: [
        {
          heading: "Prepara un inventario di URL",
          body: "Includi home, servizio, progetto, articolo dinamico, URL inesistente e ciascuna lingua. Annota stato previsto, titolo, indicizzabilità e indirizzo finale prima della prova.",
        },
        {
          heading: "Esamina la risposta del server",
          body: "Verifica titolo visibile, contenuto principale, metadati, canonical e alternative linguistiche. Confronta i dati JSON-LD con la pagina. Controlla che robots e sitemap corrispondano ai percorsi destinati al pubblico.",
        },
        {
          heading: "Ripeti le prove sul dominio pubblico",
          body: "Dopo la pubblicazione apri i link da telefono e leggi l’HTML finale. Verifica che sul dominio pubblico sia attiva la versione approvata. Registra il rilascio e segui separatamente l’indicizzazione in Search Console.",
        },
      ],
    },
    sources: [
      { href: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images", en: "Next.js metadata and Open Graph", it: "Metadati e Open Graph in Next.js" },
      { href: "https://nextjs.org/docs/app/guides/json-ld", en: "Next.js JSON-LD guidance", it: "Guida Next.js ai dati JSON-LD" },
    ],
  },
};
