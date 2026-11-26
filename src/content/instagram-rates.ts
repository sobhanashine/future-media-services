export const instagramRates = {
  packages: { bronze: 11_900_000, silver: 16_400_000, gold: 23_800_000 },
  outreachQuarter: 7_500_000,
  reelFrom: 800_000,
  photoStory: [250_000, 1_000_000],
  motionStory: [450_000, 1_500_000],
  units: { story: 50_000, motion: 80_000, post: 100_000, banner: 60_000 },
  extras: [
    { fa: "کاور و پشت‌کاور ریلز", en: "Reel cover and back cover", it: "Copertina e grafica finale del reel", price: 200_000 },
    { fa: "ذخیرهٔ استوری و طراحی کاور", en: "Saved story and cover", it: "Storia in evidenza e copertina", price: 150_000 },
    { fa: "طراحی لوگوتایپ", en: "Logotype design", it: "Design del logotipo", price: 100_000 },
    { fa: "تنظیم بیو", en: "Profile bio setup", it: "Ottimizzazione della biografia", price: 50_000 },
    { fa: "بازیابی پیج", en: "Account recovery", it: "Recupero dell’account", price: 500_000 },
    { fa: "تقویم محتوایی", en: "Content calendar", it: "Calendario editoriale", price: 300_000 },
    { fa: "سناریونویسی", en: "Scriptwriting", it: "Sceneggiatura", price: 400_000 },
    { fa: "امنیت پیج", en: "Account security", it: "Sicurezza del profilo", price: 200_000 },
    { fa: "پشتیبانی", en: "Support", it: "Assistenza", price: 100_000 },
  ],
} as const;

export type EstimateSelection = {
  stories: number;
  motion: boolean;
  posts: number;
  banners: number;
  extras: number[];
};

export function monthlyInstagramEstimate(selection: EstimateSelection) {
  const { units, extras } = instagramRates;
  const { stories, motion, posts, banners } = selection;
  const extrasTotal = extras.reduce((total, extra, index) => total + (selection.extras.includes(index) ? extra.price : 0), 0);
  return stories * (motion ? units.motion : units.story) + posts * units.post + banners * units.banner + extrasTotal;
}

export const instagramRateCopy = {
  fa: {
    heading: "تعرفهٔ خدمات تکی اینستاگرام", intro: "برای یک سفارش مشخص یا یک دورهٔ جذب مخاطب، تعرفه‌های زیر را ببینید.",
    currency: "تومان", from: "از", through: "تا", outreach: "جذب مخاطب و تبلیغات گسترده", quarter: "برای سه ماه",
    outreachBody: "تعامل با مخاطبان هدف برای جذب مشتری، بازاریابی در دایرکت و کامنت صفحات مرتبط و تعامل با محتوا از طریق لایک و مشاهدهٔ استوری.",
    reel: "طراحی پست یا ریلز با کاور و پشت‌کاور", reelBody: "برای ویدیوهای ۱۰ ثانیه تا ۳ دقیقه، با حداکثر ۴۸ ساعت زمان طراحی. برای تدوین اختصاصی یا ویدیوهای بیش از ۳ دقیقه تماس بگیرید.",
    story: "طراحی استوری", photo: "استوری عکس", motion: "استوری موشن", storyBody: "برای استوری اختصاصی می‌توانید از طریق ایمیل برآورد هزینه بگیرید. تدوین ویدیوی استوری حداکثر ۵ ساعت زمان می‌برد.",
    estimate: "برآورد هزینهٔ ماهانهٔ سفارشی", estimateIntro: "برای یک برنامهٔ ماهانه، تعداد محتوا و خدمات موردنیازتان را انتخاب کنید. سفارش تکی طراحی، تعرفهٔ جداگانه دارد.",
    quantity: "تعداد در ماه", format: "نوع استوری", still: "معمولی", animated: "موشن", stories: "استوری", posts: "پست", banners: "بنر تخفیف یا مسابقه",
    perItem: "برای هر عدد", extras: "خدمات تکمیلی", total: "برآورد ماهانه", call: "ارسال پیام دربارهٔ سفارش", noScript: "برای برآورد مجموع با این تعرفه‌ها، به FMS پیام بدهید.",
    invalid: "تعداد را با یک عدد صحیح و نامنفی وارد کنید.",
    more: "تعرفهٔ خدمات تکی و محاسبه‌گر",
  },
  en: {
    heading: "Individual Instagram services", intro: "Commission a single production piece or book a three-month audience outreach campaign.",
    currency: "toman", from: "From", through: "to", outreach: "Audience outreach campaign", quarter: "for three months",
    outreachBody: "Customer acquisition through targeted engagement, direct-message and comment marketing on relevant accounts, content likes and story views.",
    reel: "Post or reel with front and back covers", reelBody: "For videos from 10 seconds to 3 minutes, with up to 48 hours for design. Email us for a custom edit or a video longer than 3 minutes.",
    story: "Story design", photo: "Photo story", motion: "Motion story", storyBody: "Email us for a custom story quote. Story video editing takes up to 5 hours.",
    estimate: "Build a monthly estimate", estimateIntro: "Choose monthly content quantities and optional services. Individual design commissions have their own rates above.",
    quantity: "Number per month", format: "Story format", still: "Standard", animated: "Motion", stories: "Stories", posts: "Posts", banners: "Promotion or competition banners",
    perItem: "each", extras: "Optional services", total: "Monthly estimate", call: "Email us about your order", noScript: "Email FMS for a total using the rates shown here.",
    invalid: "Enter a valid non-negative whole quantity.",
    more: "Individual services and cost calculator",
  },
  it: {
    heading: "Servizi Instagram su richiesta",
    intro: "Puoi commissionare un singolo contenuto o una campagna di tre mesi per raggiungere il pubblico di riferimento.",
    currency: "toman",
    from: "Da",
    through: "–",
    outreach: "Campagna di promozione del profilo",
    quarter: "per tre mesi",
    outreachBody: "Interazioni con account pertinenti, messaggi diretti, commenti e coinvolgimento del pubblico attraverso i contenuti e le storie.",
    reel: "Post o reel con copertina e grafica finale",
    reelBody: "Per video da 10 secondi a 3 minuti prevediamo fino a 48 ore di lavorazione. Contattaci per montaggi su misura o video più lunghi.",
    story: "Progettazione di storie",
    photo: "Storia fotografica",
    motion: "Storia animata",
    storyBody: "Per una storia su misura prepariamo un preventivo. Il montaggio di un video per le storie richiede fino a 5 ore.",
    estimate: "Calcola il costo mensile",
    estimateIntro: "Scegli quanti contenuti ti servono ogni mese e gli eventuali servizi aggiuntivi. Per gli ordini singoli valgono le tariffe indicate sopra.",
    quantity: "Quantità al mese",
    format: "Formato della storia",
    still: "Statica",
    animated: "Animata",
    stories: "Storie",
    posts: "Post",
    banners: "Banner per promozioni o concorsi",
    perItem: "ciascuno",
    extras: "Servizi aggiuntivi",
    total: "Stima mensile",
    call: "Scrivici per concordare l’ordine",
    noScript: "Per calcolare il totale in base a queste tariffe, contatta FMS.",
    invalid: "Inserisci un numero intero pari o superiore a zero.",
    more: "Servizi singoli e calcolatore dei costi",
  },
} as const;
