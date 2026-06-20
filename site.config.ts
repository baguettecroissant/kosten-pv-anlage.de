/**
 * ⭐ SITE CONFIGURATION — kosten-pv-anlage.de
 * EMD single-niche : Kosten PV-Anlage (Photovoltaik)
 */
export const siteConfig = {
  // === IDENTITÄT ===
  domain: "kosten-pv-anlage.de",
  name: "Kosten PV-Anlage",
  tagline: "Kosten PV-Anlage 2026 — Was kostet eine PV-Anlage wirklich?",
  description: "Was kostet eine PV-Anlage wirklich? Aktuelle Preise pro kWp, Modul-Vergleiche, Speicher-Kosten, staatliche Förderung & Wirtschaftlichkeit. Jetzt Angebote vergleichen!",
  editorialTone: "Datengetrieben, analytisch, vergleichend. Stil 'Finanzberater für Solarinvestments'. Fokus auf Zahlen, Tabellen, ROI-Berechnungen.",

  // === NICHE ===
  niche: {
    slug: "pv-anlage",
    name: "PV-Anlage",
    nameShort: "Photovoltaik",
    emoji: "📊",
    icon: "bar-chart",
    seoTitleTemplate: "Photovoltaik-Preise in {city} — Kosten pro kWp & Angebote {zip}",
    metaDescTemplate: "Aktuelle Photovoltaik-Preise in {city}: {priceMin} bis {priceMax} pro kWp. Vergleichen Sie kostenlose Angebote von Fachbetrieben in {state}.",
    heroTitle: "Kosten PV-Anlage 2026 — Was kostet eine PV-Anlage wirklich?",
    heroSubtitle: "Analytischer Preisvergleich für Photovoltaik. Ermitteln Sie die Kosten pro kWp, Speicher-Preise und staatliche Förderungen für Ihr Haus.",
  },

  // === MONETARISIERUNG (TAP TAP HOME) ===
  taptaphome: {
    // Mode can be: 'redirect' (tracking link), 'iframe', or 'api'
    mode: 'api' as 'redirect' | 'iframe' | 'api',
    trackingLinkPV: "https://www.taptaphome.com/?utm_source=affiliate&utm_campaign=kosten_pv_anlage_de",
    partnerName: "DAA GmbH (BOSCH-Gruppe)",
    contactPerson: "Tuuli Himme (tuuli.himme@taptaphome.com)",
    provisionPerLead: "35% des Lead-Umsatzes (ca. 80€ im Schnitt)",
    
    // Top-PV-Regionen (AVR >= 3.0)
    highAvrPrefixes: [
      "04", "06", "07", "08", "12", "13", "14", "15", "21", "22", "24", "25", "26", "27", "28",
      "30", "31", "32", "33", "38", "39", "40", "41", "42", "45", "46", "47", "48", "50", "51",
      "52", "53", "55", "56", "58", "61", "63", "64", "65", "67", "68", "69", "70", "71", "73",
      "74", "75", "76", "82", "83", "84", "86", "90", "91", "93", "94", "99"
    ],
  },

  // === PREISE FÜR PHOTOVOLTAIK PRO KWP (2026) ===
  pricing: [
    { service: "Klein (3–5 kWp) — Kleines Einfamilienhaus", price: "1.600€ – 2.100€", details: "Preis pro kWp (ohne Speicher). Inkl. Speicher: 2.200€ – 2.800€ pro kWp." },
    { service: "Mittel (6–10 kWp) — Standard-Einfamilienhaus", price: "1.400€ – 1.800€", details: "Preis pro kWp (ohne Speicher). Inkl. Speicher: 1.900€ – 2.400€ pro kWp." },
    { service: "Groß (10–15 kWp) — Großes Einfamilienhaus", price: "1.200€ – 1.600€", details: "Preis pro kWp (ohne Speicher). Inkl. Speicher: 1.700€ – 2.200€ pro kWp." },
    { service: "Giga (15+ kWp) — Zweifamilienhaus / Gewerbe", price: "1.100€ – 1.500€", details: "Preis pro kWp (ohne Speicher). Inkl. Speicher: 1.500€ – 2.000€ pro kWp." },
  ],
  pricingNote: "Durchschnittliche kWp-Nettopreise (0% USt) für 2026 inklusive Montage und Netzanschluss. Regionale Abweichungen möglich.",

  // === PREISE NACH MODULTYP ===
  moduleTypePricing: [
    { type: "Polykristalline Module", price: "1.100€ – 1.400€", efficiency: "15–18%", details: "Kostengünstige Option, wird heute seltener verbaut." },
    { type: "Monokristalline Module", price: "1.300€ – 1.700€", efficiency: "19–22%", details: "Der Standard 2026 für maximale Leistung auf kleiner Fläche." },
    { type: "Ganzschwarze Module (Full Black)", price: "1.400€ – 1.900€", efficiency: "19–22%", details: "Hervorragende Ästhetik, ideal für Sichtflächen." },
    { type: "Glas-Glas-Module (Doppelglas)", price: "1.500€ – 2.000€", efficiency: "20–23%", details: "Maximale Haltbarkeit, 30 Jahre Garantie, extrem robust." }
  ],

  // === SPEICHER-KOSTEN SEPARAT ===
  storagePricing: [
    { size: "Kompakt (5 kWh Speicher)", price: "3.500€ – 5.500€", details: "Optimal für kleine PV-Anlagen (bis 6 kWp)" },
    { size: "Standard (10 kWh Speicher)", price: "6.000€ – 9.000€", details: "Der Standard für 8-12 kWp Anlagen" },
    { size: "Groß (15 kWh Speicher)", price: "8.500€ – 12.000€", details: "Für hohe Lasten (Wärmepumpe & Wallbox)" },
  ],

  // === REGIONALE VARIATIONEN (Multiplikator & Sonnenstunden) ===
  regionalMultipliers: {
    south: { name: "Bayern, Baden-Württemberg", factor: 1.05, sunHours: "1.700 – 1.900h" },
    center: { name: "Mitteldeutschland", factor: 1.00, sunHours: "1.500 – 1.700h" },
    north: { name: "Norddeutschland", factor: 0.95, sunHours: "1.400 – 1.600h" },
    east: { name: "Ostdeutschland", factor: 0.90, sunHours: "1.500 – 1.700h" },
  },

  // === FÖRDERUNG 2026 (KfW-Programm 458 & BAFA) ===
  subsidies: [
    { name: "KfW-Grundförderung", amount: "30%", condition: "Basis-Zuschuss für alle berechtigten Antragsteller" },
    { name: "Klimageschwindigkeits-Bonus", amount: "+20%", condition: "Bei gleichzeitigem Austausch einer alten fossilen Heizung" },
    { name: "Einkommens-Bonus", amount: "+30%", condition: "Für Haushalte mit einem zvE < 40.000 € pro Jahr" },
    { name: "Effizienz-Bonus", amount: "+5%", condition: "Für den Einsatz natürlicher Kältemittel oder Erdwärme" },
    { name: "Maximaler Fördersatz", amount: "70%", condition: "Gedeckelt auf max. 30.000 € förderfähige Kosten" },
    { name: "Maximaler Zuschuss", amount: "21.000 €", condition: "Reine Zuschusshöhe, über KfW-Portal zu beantragen" },
  ],

  // === EINSPEISEVERGÜTUNG 2026 ===
  feedInTariff: [
    { type: "Überschusseinspeisung ≤ 10 kWp", rate: "ca. 8,0 ct/kWh", description: "Eigenverbrauch priorisiert, Rest wird eingespeist" },
    { type: "Volleinspeisung ≤ 10 kWp", rate: "ca. 12,9 ct/kWh", description: "Der gesamte erzeugte Strom wird ins Netz gespeist" },
  ],

  // === PROCESS STEPS ===
  process: [
    { title: "Projekt beschreiben", desc: "Geben Sie Ihre Dachfläche, Dacheindeckung und Postleitzahl an.", icon: "📋", duration: "2 Min" },
    { title: "Anfragen prüfen", desc: "Ihre Angaben werden auf Eignung und AVR-Zielgebiete geprüft.", icon: "🔍", duration: "Direkt" },
    { title: "Angebote erhalten", desc: "Bis zu 3 geprüfte Fachbetriebe aus Ihrer Region erstellen Angebote.", icon: "📨", duration: "24-48 Std" },
    { title: "Sparen & Installieren", desc: "Angebote vergleichen, das Beste auswählen und bis zu 30% sparen.", icon: "📊", duration: "Flexibel" },
  ],

  // === FAQ ===
  faq: [
    {
      q: "Was kostet eine PV-Anlage für ein Einfamilienhaus 2026?",
      a: "Eine schlüsselfertige PV-Anlage mit 10 kWp Leistung kostet 2026 zwischen 9.500 und 13.500 Euro ohne Speicher. Inklusive einem 10 kWh Stromspeicher liegt der Preisbereich bei etwa 15.000 bis 21.000 Euro. Durch die aktuelle Nullsteuer (0% Umsatzsteuer auf PV-Anlagen in Deutschland) sparen Käufer zusätzlich 19%."
    },
    {
      q: "Lohnt sich eine PV-Anlage mit Speicher in 2026?",
      a: "Ja, in den meisten Fällen lohnt sich ein Speicher. Ohne Speicher liegt die Eigenverbrauchsquote bei ca. 30%. Mit einem passenden Stromspeicher kann dieser Wert auf über 70% gesteigert werden. Da selbst erzeugter Solarstrom deutlich günstiger ist als Netzstrom (ca. 8-10 ct Herstellkosten vs. über 35 ct Bezugskosten), amortisiert sich der Speicher meist nach 8 bis 11 Jahren."
    },
    {
      q: "Welche Solarförderung gibt es 2026 in Deutschland?",
      a: "Die wichtigste Förderung ist der zinsgünstige KfW-Kredit (Programm 270) sowie regionale Zuschüsse der Bundesländer und Kommunen. Für die Kombination mit einer Wärmepumpe gibt es im KfW-Programm 458 Zuschüsse von bis zu 70% (maximal 21.000 €). Zudem gilt weiterhin der Wegfall der 19% Mehrwertsteuer auf PV-Komponenten."
    },
    {
      q: "Wie funktioniert die Einspeisevergütung 2026?",
      a: "Solarstrom, den Sie nicht selbst verbrauchen, fließt automatisch ins öffentliche Stromnetz. Dafür erhalten Sie eine gesetzlich garantierte Einspeisevergütung über einen Zeitraum von 20 Jahren plus das Inbetriebnahmejahr. Bei Überschusseinspeisung liegt diese aktuell bei rund 8,0 Cent pro Kilowattstunde."
    },
    {
      q: "Wie lange ist die Amortisationszeit einer PV-Anlage?",
      a: "Dank gesunkener Modulpreise amortisiert sich eine typische Photovoltaikanlage auf einem Einfamilienhaus ohne Speicher nach 7 bis 9 Jahren. Mit Speicher liegt die Amortisationszeit bei ca. 9 bis 12 Jahren. Bei einer Lebensdauer der Module von über 25 bis 30 Jahren liefert die Anlage danach über 15 Jahre lang kostenlosen Strom."
    },
    {
      q: "Welche Voraussetzungen muss mein Dach erfüllen?",
      a: "Das Dach sollte eine nutzbare Fläche von mindestens 20 m² aufweisen und statisch für das Gewicht der Module (ca. 20 kg/m²) geeignet sein. Die ideale Ausrichtung ist Süden, aber auch Ost-West-Dächer sind durch die Verteilung der Stromproduktion über den Tag hochgradig rentabel. Asbest- oder Schieferdächer sind aus Sicherheitsgründen oft von der Belegung ausgeschlossen."
    }
  ],

  // === TRUST BADGES ===
  trustBadges: ["100% kostenlos", "Unverbindlich", "Geprüfte Fachbetriebe", "Regionale Anbieter"],

  // === CONTENT BLOCKS ===
  introText: `Eine eigene Photovoltaikanlage auf dem Dach ist 2026 eine der rentabelsten Investitionen für Eigenheimbesitzer in Deutschland. Angesichts langfristig hoher Strompreise bietet Solarstrom vom eigenen Dach Unabhängigkeit und erhebliche Kosteneinsparungen von bis zu 1.500 Euro pro Jahr.

Mit der Kombination aus Solarmodulen und einem modernen Batteriespeicher decken Sie problemlos über 70% Ihres täglichen Strombedarfs ab. Dank des historischen Preissturzes bei PV-Modulen und dem dauerhaften 0%-Umsatzsteuersatz sind die Anschaffungskosten so niedrig wie noch nie. Ein regionaler Angebotsvergleich sichert Ihnen dabei die besten Konditionen und spart oft bis zu 30% der Anschaffungskosten.`,

  whyChooseUs: [
    "Kostenloser und unverbindlicher Vergleich von bis zu 3 Angeboten",
    "Geprüfte und zertifizierte Solar-Fachbetriebe aus Ihrer Region",
    "Maximale Preistransparenz ohne versteckte Gebühren",
    "Individuelle Beratung für PV-Anlagen mit und ohne Stromspeicher",
    "Unterstützung bei der Beantragung aller KfW- und Regionalförderungen",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
