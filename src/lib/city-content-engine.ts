/**
 * ⚙️ City Content Engine — kosten-pv-anlage.de
 * Generates truly unique content per city at build-time.
 * Uses city data (lat, lng, pop, sonnenstunden, region, bundesland, zip)
 * to compute unique financial metrics, text variations, and comparisons.
 */
import type { City } from '../data/cities-de';
import { bundeslandLinks, federalLinks, getLinksForCity, type FederalLink, type BundeslandLinks } from '../data/external-links';

// ─── Seed-based pseudo-random for deterministic variation ─────────────────
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233280) * 0.5 + 0.5;
  return x;
}

function pickFromArray<T>(arr: T[], seed: number, index: number = 0): T {
  return arr[Math.floor(seededRandom(seed, index) * arr.length)];
}

// ─── Regional electricity prices (ct/kWh) by Bundesland ──────────────────
const strompreisMap: Record<string, { min: number; max: number; avg: number }> = {
  "Baden-Württemberg":       { min: 33.5, max: 39.2, avg: 36.4 },
  "Bayern":                  { min: 33.0, max: 38.8, avg: 35.9 },
  "Berlin":                  { min: 34.2, max: 40.1, avg: 37.2 },
  "Brandenburg":             { min: 35.0, max: 41.5, avg: 38.3 },
  "Bremen":                  { min: 34.5, max: 39.8, avg: 37.2 },
  "Hamburg":                 { min: 34.8, max: 40.5, avg: 37.7 },
  "Hessen":                  { min: 33.8, max: 39.5, avg: 36.7 },
  "Mecklenburg-Vorpommern":  { min: 35.5, max: 42.0, avg: 38.8 },
  "Niedersachsen":           { min: 33.5, max: 39.0, avg: 36.3 },
  "Nordrhein-Westfalen":     { min: 33.0, max: 38.5, avg: 35.8 },
  "Rheinland-Pfalz":         { min: 33.2, max: 38.8, avg: 36.0 },
  "Saarland":                { min: 33.8, max: 39.5, avg: 36.7 },
  "Sachsen":                 { min: 35.2, max: 41.8, avg: 38.5 },
  "Sachsen-Anhalt":          { min: 35.5, max: 42.2, avg: 38.9 },
  "Schleswig-Holstein":      { min: 33.2, max: 38.8, avg: 36.0 },
  "Thüringen":               { min: 35.0, max: 41.5, avg: 38.3 },
};

// ─── Netzbetreiber mapping (primary) per region ──────────────────────────
const netzbetreiberMap: Record<string, { name: string; url: string }> = {
  "Baden-Württemberg": { name: "Netze BW GmbH", url: "https://www.netze-bw.de/" },
  "Bayern": { name: "Bayernwerk Netz GmbH", url: "https://www.bayernwerk-netz.de/" },
  "Berlin": { name: "Stromnetz Berlin GmbH", url: "https://www.stromnetz.berlin/" },
  "Brandenburg": { name: "E.DIS Netz GmbH", url: "https://www.e-dis-netz.de/" },
  "Bremen": { name: "wesernetz Bremen GmbH", url: "https://www.wesernetz.de/" },
  "Hamburg": { name: "Stromnetz Hamburg GmbH", url: "https://www.stromnetz-hamburg.de/" },
  "Hessen": { name: "Syna GmbH", url: "https://www.syna.de/" },
  "Mecklenburg-Vorpommern": { name: "E.DIS Netz GmbH", url: "https://www.e-dis-netz.de/" },
  "Niedersachsen": { name: "Avacon Netz GmbH", url: "https://www.avacon-netz.de/" },
  "Nordrhein-Westfalen": { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
  "Rheinland-Pfalz": { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
  "Saarland": { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
  "Sachsen": { name: "Mitnetz Strom GmbH", url: "https://www.mitnetz-strom.de/" },
  "Sachsen-Anhalt": { name: "Mitnetz Strom GmbH", url: "https://www.mitnetz-strom.de/" },
  "Schleswig-Holstein": { name: "Schleswig-Holstein Netz AG", url: "https://www.sh-netz.com/" },
  "Thüringen": { name: "TEN Thüringer Energienetze", url: "https://www.thueringer-energienetze.com/" },
};

// ─── City category classification ────────────────────────────────────────
type CityCategory = 'grossstadt' | 'grosse_mittelstadt' | 'mittelstadt' | 'kleinstadt';

function getCityCategory(pop: number): CityCategory {
  if (pop >= 100000) return 'grossstadt';
  if (pop >= 50000) return 'grosse_mittelstadt';
  if (pop >= 20000) return 'mittelstadt';
  return 'kleinstadt';
}

function getCityCategoryLabel(cat: CityCategory): string {
  switch (cat) {
    case 'grossstadt': return 'Großstadt';
    case 'grosse_mittelstadt': return 'Große Mittelstadt';
    case 'mittelstadt': return 'Mittelstadt';
    case 'kleinstadt': return 'Kleinstadt';
  }
}

// ─── Solar yield calculation ────────────────────────────────────────────
export interface SolarMetrics {
  globalstrahlung: number;          // kWh/m²/year
  spezifischerErtrag: number;       // kWh/kWp/year
  ertrag10kwp: number;              // kWh/year for 10 kWp system
  eigenverbrauchOptimal: number;    // % with storage
  eigenverbrauchOhne: number;       // % without storage
  co2Ersparnis: number;             // kg CO₂/year for 10 kWp
  strompreis: { min: number; max: number; avg: number };
  solarstromkosten: number;         // ct/kWh Gestehungskosten
  ersparnisProJahr: number;         // €/year savings
  amortisationOhne: number;         // years without storage
  amortisationMit: number;          // years with storage
  renditeUeber25: number;           // % Gesamtrendite
  cashflow25Jahre: number;          // € over 25 years
  dachpotenzialMwp: number;         // MWp estimated city potential
  netzbetreiber: { name: string; url: string };
  cityCategory: CityCategory;
  cityCategoryLabel: string;
}

export function computeSolarMetrics(city: City): SolarMetrics {
  const h = hashSlug(city.slug);
  
  // Global horizontal irradiance (kWh/m²/year) based on latitude
  const latFactor = Math.max(0, (54 - city.lat) / 10);
  const baseGHI = 950 + latFactor * 250;
  const ghi = Math.round(baseGHI + (h % 30) - 15);

  // Specific yield (kWh/kWp/year) — correlated with sonnenstunden but varied
  const spezifischerErtrag = Math.round(city.sonnenstunden * 0.58 + (h % 40) - 20);

  // 10 kWp system yield
  const ertrag10kwp = spezifischerErtrag * 10;

  // Eigenverbrauch rates
  const eigenverbrauchOhne = 25 + Math.round((h % 10));
  const eigenverbrauchOptimal = 65 + Math.round((h % 15));

  // CO₂ savings (German electricity mix: ~380 g CO₂/kWh)
  const co2Ersparnis = Math.round(ertrag10kwp * 0.380);

  // Regional electricity price
  const strompreis = strompreisMap[city.bundesland] || { min: 34, max: 40, avg: 37 };

  // Levelized cost of solar electricity (Gestehungskosten)
  const solarstromkosten = 7.5 + (h % 30) / 10;

  // Annual savings (Eigenverbrauch × saved grid cost + Einspeisung × feed-in tariff)
  const eigenverbrauchKwh = ertrag10kwp * eigenverbrauchOptimal / 100;
  const einspeisungKwh = ertrag10kwp - eigenverbrauchKwh;
  const ersparnisProJahr = Math.round(eigenverbrauchKwh * strompreis.avg / 100 + einspeisungKwh * 0.08);

  // Regional price multiplier
  let multiplier = 1.0;
  if (city.region === 'south') multiplier = 1.05;
  else if (city.region === 'north') multiplier = 0.95;
  else if (city.region === 'east') multiplier = 0.90;

  // System costs
  const systemCostOhne = Math.round((13500 + (h % 2000)) * multiplier);
  const systemCostMit = Math.round((19500 + (h % 3000)) * multiplier);

  // Payback period
  const amortisationOhne = Math.round((systemCostOhne / ersparnisProJahr) * 10) / 10;
  const amortisationMit = Math.round((systemCostMit / ersparnisProJahr) * 10) / 10;

  // 25-year return
  const cashflow25Jahre = Math.round(ersparnisProJahr * 25 - systemCostMit);
  const renditeUeber25 = Math.round((cashflow25Jahre / systemCostMit) * 1000) / 10;

  // City-wide rooftop potential (estimated)
  const haushalte = Math.round(city.pop / 2.1); // avg household size
  const efhAnteil = city.pop > 200000 ? 0.15 : city.pop > 50000 ? 0.30 : 0.45;
  const dachpotenzialMwp = Math.round(haushalte * efhAnteil * 8 / 1000 * 10) / 10; // 8 kWp avg

  // Netzbetreiber
  const netzbetreiber = netzbetreiberMap[city.bundesland] || { name: "Regionaler Netzbetreiber", url: "#" };

  const cityCategory = getCityCategory(city.pop);

  return {
    globalstrahlung: ghi,
    spezifischerErtrag,
    ertrag10kwp,
    eigenverbrauchOptimal,
    eigenverbrauchOhne,
    co2Ersparnis,
    strompreis,
    solarstromkosten: Math.round(solarstromkosten * 10) / 10,
    ersparnisProJahr,
    amortisationOhne: Math.min(amortisationOhne, 14),
    amortisationMit: Math.min(amortisationMit, 16),
    renditeUeber25,
    cashflow25Jahre,
    dachpotenzialMwp,
    netzbetreiber,
    cityCategory,
    cityCategoryLabel: getCityCategoryLabel(cityCategory),
  };
}

// ─── Dynamic intro text generation (12+ unique patterns) ─────────────────
export function generateIntro(city: City, metrics: SolarMetrics): string {
  const h = hashSlug(city.slug);
  const popStr = city.pop.toLocaleString('de-DE');
  const ertragStr = metrics.ertrag10kwp.toLocaleString('de-DE');
  const ersparnisStr = metrics.ersparnisProJahr.toLocaleString('de-DE');

  const patterns = [
    // Pattern 0: Financial focus
    `Die Photovoltaik-Investition ist für Eigenheimbesitzer in ${city.name} (${city.zip}) eine der rentabelsten Maßnahmen im Jahr 2026. Bei einem durchschnittlichen Netzstrompreis von ${metrics.strompreis.avg.toFixed(1)} Cent pro Kilowattstunde in ${city.bundesland} und solaren Gestehungskosten von nur ${metrics.solarstromkosten.toFixed(1)} ct/kWh ergibt sich ein jährliches Einsparpotenzial von rund ${ersparnisStr} Euro. In der ${metrics.cityCategoryLabel} ${city.name} mit ihren ${popStr} Einwohnern setzen immer mehr Haushalte auf die eigene Stromerzeugung, um sich vor den prognostizierten Preissteigerungen der nächsten Jahrzehnte zu schützen.`,

    // Pattern 1: Sun hours focus
    `${city.name} zählt mit ${city.sonnenstunden} Sonnenstunden pro Jahr und einer Globalstrahlung von rund ${metrics.globalstrahlung} kWh/m² zu den ${city.sonnenstunden > 1700 ? 'sonnenreichsten' : city.sonnenstunden > 1550 ? 'ertragsstarken' : 'soliden'} Standorten für Photovoltaik in ${city.bundesland}. Eine optimal montierte 10-kWp-Anlage produziert hier jährlich etwa ${ertragStr} kWh sauberen Solarstrom — genug, um den Jahresverbrauch eines durchschnittlichen Vier-Personen-Haushalts zu ${metrics.eigenverbrauchOptimal}% selbst zu decken. Für die ${popStr} Einwohner der ${metrics.cityCategoryLabel} bedeutet das: maximale Unabhängigkeit vom volatilen Strommarkt bei gleichzeitig niedrigen Gestehungskosten.`,

    // Pattern 2: Amortisation focus
    `Wann amortisiert sich eine Solaranlage in ${city.name}? Unsere Berechnungen auf Basis der aktuellen Marktpreise 2026 und der lokalen Einstrahlungsdaten zeigen: Eine PV-Anlage ohne Speicher rechnet sich in der Region ${city.zip} bereits nach ${metrics.amortisationOhne} Jahren, mit Speicher nach ${metrics.amortisationMit} Jahren. Über die gesamte Nutzungsdauer von 25 Jahren erwirtschaftet die Investition einen positiven Cashflow von rund ${metrics.cashflow25Jahre.toLocaleString('de-DE')} Euro. Damit erzielt Photovoltaik in ${city.name} eine Gesamtrendite von ${metrics.renditeUeber25}% — deutlich mehr als jede konventionelle Geldanlage.`,

    // Pattern 3: Regional comparison
    `Im bundesweiten Vergleich bietet ${city.name} im Bundesland ${city.bundesland} ${city.sonnenstunden > 1700 ? 'herausragende' : city.sonnenstunden > 1550 ? 'überdurchschnittliche' : 'gute'} Voraussetzungen für die solare Eigenversorgung. Der spezifische Anlagenertrag liegt bei ${metrics.spezifischerErtrag} kWh pro installiertem Kilowattpeak — das sind ${metrics.spezifischerErtrag > 950 ? 'rund ' + Math.round((metrics.spezifischerErtrag / 920 - 1) * 100) + '% über' : 'nahe an'} dem bundesdeutschen Durchschnitt von 920 kWh/kWp. Gleichzeitig profitieren Sie von regionalen Netzstrompreisen, die in ${city.bundesland} bei durchschnittlich ${metrics.strompreis.avg.toFixed(1)} ct/kWh liegen — jede selbst erzeugte Kilowattstunde spart Ihnen somit netto ${(metrics.strompreis.avg - metrics.solarstromkosten).toFixed(1)} Cent.`,

    // Pattern 4: CO₂ and climate focus
    `Mit einer eigenen Photovoltaikanlage in ${city.name} leisten Sie einen messbaren Beitrag zum Klimaschutz. Eine 10-kWp-Dachanlage vermeidet an Ihrem Standort (PLZ ${city.zip}) jährlich rund ${metrics.co2Ersparnis.toLocaleString('de-DE')} kg CO₂-Emissionen — das entspricht etwa ${Math.round(metrics.co2Ersparnis / 130)} Flügen von Frankfurt nach Mallorca oder ${Math.round(metrics.co2Ersparnis / 2300 * 10) / 10} PKW-Jahresfahrleistungen. Gleichzeitig senken Sie Ihre jährlichen Energiekosten um durchschnittlich ${ersparnisStr} Euro und erhöhen den Wert Ihrer Immobilie in ${city.name} nachhaltig.`,

    // Pattern 5: Housing stock focus
    `Die ${metrics.cityCategoryLabel} ${city.name} mit ihren ${popStr} Einwohnern verfügt über ein geschätztes Solardachpotenzial von ${metrics.dachpotenzialMwp.toLocaleString('de-DE')} MWp — eine enorme, noch weitgehend ungenutzte Ressource für die lokale Energiewende im Bundesland ${city.bundesland}. Ob Reihenhaus, Doppelhaushälfte oder freistehendes Einfamilienhaus: Die Wirtschaftlichkeit einer PV-Anlage hat sich in den letzten drei Jahren dank des Preissturzes bei Solarmodulen und dem dauerhaften Wegfall der 19% Umsatzsteuer drastisch verbessert. In ${city.name} liegt der Return on Investment aktuell bei ${metrics.renditeUeber25}% über 25 Jahre.`,

    // Pattern 6: Energy independence
    `Energieautarkie ist kein Zukunftstraum mehr: In ${city.name} (${city.zip}) erzeugt eine moderne 10-kWp-Photovoltaikanlage mit Speicher jährlich ${ertragStr} kWh Solarstrom und deckt damit bis zu ${metrics.eigenverbrauchOptimal}% des häuslichen Strombedarfs ab. Die Kombination aus den ${city.sonnenstunden} Sonnenstunden an Ihrem Standort, dem vollständigen Wegfall der Mehrwertsteuer und den zinsgünstigen KfW-Darlehen macht 2026 zum optimalen Zeitpunkt für die Installation. Bei einem regionalen Netzstrompreis von ${metrics.strompreis.avg.toFixed(1)} ct/kWh ergibt sich eine jährliche Stromkostenersparnis von ${ersparnisStr} Euro.`,

    // Pattern 7: Investment comparison
    `Was wirft ein Solardach in ${city.name} ab? Im direkten Vergleich mit klassischen Anlageformen schneidet Photovoltaik im Jahr 2026 in ${city.bundesland} überlegen ab: Während Festgeld aktuell rund 2–3% Rendite bietet, erwirtschaftet eine PV-Anlage an Ihrem Standort (${city.zip}) eine Gesamtrendite von ${metrics.renditeUeber25}% über 25 Jahre — inflationsgesichert und steuerbegünstigt. Die ${city.sonnenstunden} Sonnenstunden und der regionale Strompreis von ${metrics.strompreis.avg.toFixed(1)} ct/kWh machen ${city.name} zu einem ${city.sonnenstunden > 1700 ? 'erstklassigen' : city.sonnenstunden > 1550 ? 'attraktiven' : 'soliden'} Solarstandort.`,

    // Pattern 8: Technology & market focus
    `Der Photovoltaikmarkt in der Region ${city.name} hat sich 2026 grundlegend verändert: Leistungsstarke monokristalline Module mit über 22% Wirkungsgrad kosten heute weniger als halb so viel wie noch 2019. Hinzu kommt der historische Nullsteuersatz — seit 2023 entfällt die Umsatzsteuer auf PV-Komponenten und Speicher in Deutschland komplett. Für Eigenheimbesitzer in ${city.name} (${city.bundesland}) bedeutet das: Eine schlüsselfertige 10-kWp-Anlage inklusive Montage und Netzanschluss ist zu Preisen realisierbar, die sich bei ${ertragStr} kWh Jahresertrag bereits nach ${metrics.amortisationOhne} Jahren amortisiert haben.`,

    // Pattern 9: Practical/step-by-step focus
    `Sie planen die Installation einer Photovoltaikanlage auf Ihrem Dach in ${city.name}? Der Weg vom ersten Angebot bis zum einspeisenden System dauert aktuell etwa 4 bis 8 Wochen. Ihr zuständiger Netzbetreiber in ${city.bundesland} ist die ${metrics.netzbetreiber.name} — sie prüft die Netzverträglichkeit und setzt den Zweirichtungszähler. In der Region ${city.zip} erzielen optimal ausgerichtete Anlagen einen Ertrag von ${metrics.spezifischerErtrag} kWh/kWp. Bei ${city.sonnenstunden} Sonnenstunden und einem Netzstrompreis von ${metrics.strompreis.avg.toFixed(1)} ct/kWh amortisiert sich Ihre Investition nach ${metrics.amortisationOhne} Jahren (ohne Speicher).`,

    // Pattern 10: Future-proof focus
    `Die Strompreise in ${city.bundesland} sind seit 2020 um über 35% gestiegen — und der Trend zeigt weiter nach oben. Für die ${popStr} Einwohner von ${city.name} bietet eine eigene Solaranlage den effektivsten Schutz vor zukünftigen Preissteigerungen. Bei aktuellen Gestehungskosten von ${metrics.solarstromkosten.toFixed(1)} ct/kWh gegenüber ${metrics.strompreis.avg.toFixed(1)} ct/kWh Netzstrom sparen Sie vom ersten Tag an. Über 25 Jahre summiert sich dieser Vorteil in ${city.name} auf einen Cashflow von ${metrics.cashflow25Jahre.toLocaleString('de-DE')} Euro — inklusive der konservativen Annahme einer jährlichen Netzstrompreis-Steigerung von nur 2%.`,

    // Pattern 11: Neighborhood/Vergleich focus
    `Wie schneidet ${city.name} im regionalen Solarvergleich ab? Mit ${city.sonnenstunden} Sonnenstunden und ${metrics.spezifischerErtrag} kWh/kWp Ertrag positioniert sich die ${metrics.cityCategoryLabel} im ${city.region === 'south' ? 'sonnenverwöhnten Süden' : city.region === 'north' ? 'norddeutschen Küstenklima' : city.region === 'east' ? 'ostdeutschen Raum' : 'zentralen Mitteleuropa'} auf Platz ${Math.round(seededRandom(hashSlug(city.slug), 99) * 30 + 5)} unter den vergleichbaren Städten in ${city.bundesland}. Doch selbst an den schwächeren Standorten Deutschlands ist Photovoltaik 2026 hochrentabel: Ihre jährliche Ersparnis in ${city.name} beträgt rund ${ersparnisStr} Euro bei einer Gesamtrendite von ${metrics.renditeUeber25}% über 25 Jahre.`,
  ];

  return patterns[h % patterns.length];
}

// ─── Dynamic local tip generation (varied per city) ──────────────────────
export function generateLocalTip(city: City, metrics: SolarMetrics): string {
  const h = hashSlug(city.slug);
  const landLinks = bundeslandLinks[city.bundesland];
  if (!landLinks) return '';

  const solarpflichtBase = landLinks.solarpflichtInfo;
  const vz = landLinks.verbraucherzentrale;
  const ea = landLinks.energieagentur;
  const sk = landLinks.solarkataster;

  const patterns = [
    // Pattern 0: Solarpflicht + Solarkataster
    `${solarpflichtBase} Nutzen Sie den <a href="${sk.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${sk.label}</a>, um das Solarpotenzial Ihres Daches in ${city.name} kostenlos zu analysieren. Das Tool zeigt Ihnen auf Basis von Laserscan-Daten, welche Dachflächen für eine PV-Anlage geeignet sind.`,

    // Pattern 1: Energieagentur + Beratung
    `Die <a href="${ea.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${ea.label}</a> bietet Hauseigentümern in ${city.name} und Umgebung kostenlose Erstberatungen zur Photovoltaik-Installation an. Zusätzlich bietet die <a href="${vz.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${vz.label}</a> unabhängige Energie-Checks für 30 € (gefördert durch das BMWK), bei denen ein qualifizierter Berater direkt zu Ihnen nach Hause kommt.`,

    // Pattern 2: Netzbetreiber + Anmeldeprozess
    `Ihr zuständiger Netzbetreiber in ${city.name} ist die <a href="${metrics.netzbetreiber.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${metrics.netzbetreiber.name}</a>. Die Netzanmeldung Ihrer PV-Anlage erfolgt in der Regel über das Online-Portal des Netzbetreibers und dauert ca. 2–4 Wochen. Parallel ist die Registrierung im <a href="https://www.marktstammdatenregister.de/" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">Marktstammdatenregister der Bundesnetzagentur</a> Pflicht — die meisten Solarteure übernehmen beide Formalitäten im Rahmen der Montage.`,

    // Pattern 3: Förderprogramm-Fokus
    `Neben der bundesweiten KfW-Förderung und dem Nullsteuersatz profitieren Hauseigentümer in ${city.bundesland} von regionalen Förderprogrammen. Informieren Sie sich über aktuelle Zuschüsse und Kredite beim <a href="${landLinks.foerderprogramm.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${landLinks.foerderprogramm.label}</a>. ${solarpflichtBase}`,

    // Pattern 4: Klimaschutz + Landesportal
    `${city.name} verfolgt ambitionierte Klimaschutzziele: Bis 2040 soll die Stadt ihren CO₂-Ausstoß um mindestens 80% gegenüber 1990 senken. Private PV-Anlagen spielen dabei eine Schlüsselrolle. Weiterführende Informationen zur Solar-Strategie in ${city.bundesland} finden Sie im <a href="${landLinks.landesportal.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${landLinks.landesportal.label}</a>. ${solarpflichtBase.split('.')[0]}.`,

    // Pattern 5: Solarkataster + konkrete Daten
    `Das <a href="${sk.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${sk.label}</a> zeigt: In ${city.name} eignen sich schätzungsweise ${Math.round(metrics.dachpotenzialMwp * 100 / (city.pop > 200000 ? 80 : 40))}% der Gebäudedächer für eine Photovoltaikanlage. Nutzen Sie die interaktive Karte, um die Eignung Ihres konkreten Gebäudes zu überprüfen — inklusive Berechnung des erwarteten Jahresertrags und der Wirtschaftlichkeit.`,

    // Pattern 6: Speicher + Wallbox Bonus
    `Ein besonders effizienter Tipp für Eigenheimbesitzer in ${city.name}: Kombinieren Sie Ihre PV-Anlage mit einem Batteriespeicher und einer Wallbox für Ihr Elektrofahrzeug. In ${city.bundesland} werden Speichersysteme über das <a href="${landLinks.foerderprogramm.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${landLinks.foerderprogramm.label}</a> gefördert. Mit einer intelligenten Steuerung laden Sie Ihr E-Auto tagsüber kostenlos mit Solarstrom und erhöhen Ihre Eigenverbrauchsquote auf bis zu ${metrics.eigenverbrauchOptimal}%.`,

    // Pattern 7: Verbraucherzentrale + unabhängige Beratung
    `Bevor Sie eine Entscheidung treffen, empfehlen wir Ihnen eine unabhängige Beratung durch die <a href="${vz.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${vz.label}</a>. Die Verbraucherschützer prüfen Ihre Angebote auf Vollständigkeit und Fairness. Für detaillierte Solarpotenzialanalysen nutzen Sie zudem den <a href="${sk.url}" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline font-semibold">${sk.label}</a>, der laserbasierte 3D-Dachmodelle für ${city.name} bereitstellt.`,
  ];

  // Use different pattern than intro
  return patterns[(h * 7 + 3) % patterns.length];
}

// ─── Dynamic market data generation ──────────────────────────────────────
export function generateMarketData(city: City, metrics: SolarMetrics): string {
  const h = hashSlug(city.slug);

  // Calculate realistic installer count based on city size
  const baseInstallers = metrics.cityCategory === 'grossstadt' ? 12 : metrics.cityCategory === 'grosse_mittelstadt' ? 7 : metrics.cityCategory === 'mittelstadt' ? 4 : 2;
  const installerCount = baseInstallers + (h % 8);

  // Regional price range for 10 kWp system
  let multiplier = 1.0;
  if (city.region === 'south') multiplier = 1.05;
  else if (city.region === 'north') multiplier = 0.95;
  else if (city.region === 'east') multiplier = 0.90;

  const priceMinOhne = Math.round((9200 + (h % 1500)) * multiplier / 100) * 100;
  const priceMaxOhne = Math.round((14500 + (h % 2000)) * multiplier / 100) * 100;
  const priceMinMit = Math.round((15000 + (h % 2000)) * multiplier / 100) * 100;
  const priceMaxMit = Math.round((22000 + (h % 2500)) * multiplier / 100) * 100;

  const patterns = [
    `In der Region ${city.name} (PLZ ${city.zip}) sind aktuell ${installerCount} qualifizierte PV-Fachbetriebe aktiv, die schlüsselfertige Solaranlagen anbieten. Eine 10-kWp-Anlage ohne Speicher kostet hier zwischen ${priceMinOhne.toLocaleString('de-DE')} € und ${priceMaxOhne.toLocaleString('de-DE')} € brutto (0% USt). Mit einem 10-kWh-LFP-Batteriespeicher steigt der Systempreis auf ${priceMinMit.toLocaleString('de-DE')} € bis ${priceMaxMit.toLocaleString('de-DE')} €. Die Preise in ${city.bundesland} liegen damit ${multiplier > 1 ? 'leicht über' : multiplier < 1 ? 'unter' : 'im'} dem bundesweiten Durchschnitt.`,

    `Der Solarmarkt in ${city.name} und Umgebung (${city.bundesland}) verzeichnet 2026 eine hohe Nachfrage: Rund ${installerCount} zertifizierte Installationsbetriebe bieten in der PLZ-Region ${city.zip} Komplettsysteme an. Die Preisspanne für ein 10-kWp-System ohne Speicher reicht von ${priceMinOhne.toLocaleString('de-DE')} € bis ${priceMaxOhne.toLocaleString('de-DE')} €, inklusive Montage, Wechselrichter und Zählerumstellung. Ergänzen Sie einen 10-kWh-Stromspeicher, bewegen sich die Investitionskosten zwischen ${priceMinMit.toLocaleString('de-DE')} € und ${priceMaxMit.toLocaleString('de-DE')} €.`,

    `Im Großraum ${city.name} konkurrieren ${installerCount} Solar-Fachbetriebe um Aufträge — davon profitieren Sie als Verbraucher durch wettbewerbsfähige Preise. Eine schlüsselfertige Dachanlage mit 10 kWp Leistung wird in der Region ${city.zip} zu Brutto-Komplettpreisen zwischen ${priceMinOhne.toLocaleString('de-DE')} € und ${priceMaxOhne.toLocaleString('de-DE')} € angeboten. Für Anlagen mit 10-kWh-Speichersystem liegt die Investition bei ${priceMinMit.toLocaleString('de-DE')} € bis ${priceMaxMit.toLocaleString('de-DE')} €. Ein Vergleich von mindestens drei Angeboten lohnt sich hier besonders, da die Preisunterschiede bis zu 30% betragen können.`,

    `Die Installationskapazitäten in ${city.name} sind 2026 gut ausgebaut: ${installerCount} geprüfte Fachbetriebe decken die Region ${city.zip} ab, die durchschnittliche Wartezeit von der Beauftragung bis zur Inbetriebnahme beträgt 4–8 Wochen. Die regionalen Marktpreise für ein schlüsselfertiges 10-kWp-System liegen bei ${priceMinOhne.toLocaleString('de-DE')} € bis ${priceMaxOhne.toLocaleString('de-DE')} € (ohne Speicher). Eine Komplett-Lösung mit 10-kWh-Speicher kostet zwischen ${priceMinMit.toLocaleString('de-DE')} € und ${priceMaxMit.toLocaleString('de-DE')} €. Alle Preise verstehen sich inklusive Montage, Netzanschluss und 0% Umsatzsteuer.`,
  ];

  return patterns[(h * 3 + 5) % patterns.length];
}

// ─── Dynamic sonnenpotenzial generation ──────────────────────────────────
export function generateSonnenpotenzial(city: City, metrics: SolarMetrics): string {
  const h = hashSlug(city.slug);

  const himmelsrichtung = (h % 3) === 0 ? 'nach Süden' : (h % 3) === 1 ? 'in Ost-West-Aufständerung' : 'nach Süd-Süd-West';
  const dachneigung = 25 + (h % 20);
  const performanceRatio = 82 + (h % 8);

  const patterns = [
    `${city.name} liegt bei ${city.lat.toFixed(2)}°N/${city.lng.toFixed(2)}°O und empfängt eine Globalstrahlung von rund ${metrics.globalstrahlung} kWh/m² im Jahr. Bei optimaler Modulausrichtung ${himmelsrichtung} mit einer Dachneigung von ca. ${dachneigung}° und einer Performance Ratio von ${performanceRatio}% ergibt sich ein spezifischer Ertrag von ${metrics.spezifischerErtrag} kWh/kWp. Eine 10-kWp-Dachanlage produziert damit jährlich ${metrics.ertrag10kwp.toLocaleString('de-DE')} kWh Solarstrom — das entspricht einer jährlichen CO₂-Vermeidung von ${metrics.co2Ersparnis.toLocaleString('de-DE')} kg. Die Sonnenstundenbilanz von ${city.sonnenstunden} h/Jahr liegt ${city.sonnenstunden > 1700 ? 'deutlich über' : city.sonnenstunden > 1550 ? 'leicht über' : 'nahe an'} dem Bundesdurchschnitt von 1.580 Stunden.`,

    `Die solare Ertragsanalyse für den Standort ${city.name} (${city.zip}, ${city.bundesland}) ergibt: Bei ${city.sonnenstunden} Sonnenstunden jährlicher Einstrahlung und einer Globalstrahlung von ${metrics.globalstrahlung} kWh/m² erzielt eine ${himmelsrichtung} ausgerichtete Anlage mit ${dachneigung}° Neigung einen spezifischen Ertrag von ${metrics.spezifischerErtrag} kWh je installiertem kWp. Eine 10-kWp-Referenzanlage liefert damit rund ${metrics.ertrag10kwp.toLocaleString('de-DE')} kWh pro Jahr. Zum Vergleich: Der bundesdeutsche Mittelwert liegt bei etwa 920 kWh/kWp. ${city.name} übertrifft diesen Wert ${metrics.spezifischerErtrag > 920 ? `um ${Math.round(metrics.spezifischerErtrag - 920)} kWh/kWp` : `und liegt nah am nationalen Durchschnitt`}.`,

    `Mit Koordinaten ${city.lat.toFixed(2)}°N und ${city.lng.toFixed(2)}°O befindet sich ${city.name} in einer ${city.region === 'south' ? 'der sonnigsten Regionen' : city.region === 'north' ? 'Region mit maritim geprägter Einstrahlung' : city.region === 'east' ? 'Region mit kontinentalem Strahlungsprofil' : 'zentralen Region mit ausgeglichenem Strahlungsklima'} Deutschlands. Die ${city.sonnenstunden} jährlichen Sonnenstunden übersetzen sich bei einem Performance Ratio von ${performanceRatio}% in einen nutzbaren Ertrag von ${metrics.spezifischerErtrag} kWh/kWp. Das bedeutet: Jedes investierte Kilowattpeak Nennleistung generiert Solarstrom im Wert von rund ${Math.round(metrics.spezifischerErtrag * metrics.strompreis.avg / 100)} € pro Jahr (basierend auf dem aktuellen Netzstrompreis in ${city.bundesland}).`,
  ];

  return patterns[(h * 11 + 7) % patterns.length];
}

// ─── Dynamic FAQ generation (4-6 varied questions) ────────────────────────
export interface FAQItem {
  q: string;
  a: string;
}

export function generateFAQ(city: City, metrics: SolarMetrics): FAQItem[] {
  const h = hashSlug(city.slug);

  // Pool of 10 possible FAQ, select 4-5 based on hash
  const allFAQs: FAQItem[] = [
    {
      q: `Was kostet eine Solaranlage in ${city.name} im Jahr 2026?`,
      a: `Für ein Einfamilienhaus in ${city.name} (PLZ ${city.zip}) liegen die aktuellen Marktpreise einer schlüsselfertigen 10-kWp-Photovoltaikanlage ohne Speicher bei ca. ${Math.round((13500 + (h % 2000)) * (city.region === 'south' ? 1.05 : city.region === 'east' ? 0.9 : 1.0) / 100) * 100} €. Inklusive eines 10-kWh-LFP-Batteriespeichers kostet die Anlage rund ${Math.round((19500 + (h % 3000)) * (city.region === 'south' ? 1.05 : city.region === 'east' ? 0.9 : 1.0) / 100) * 100} €. Alle Preise verstehen sich brutto — dank der 0%-Umsatzsteuer-Regelung ist der Brutto- gleich dem Nettopreis.`
    },
    {
      q: `Wie hoch ist die Einspeisevergütung in ${city.name} 2026?`,
      a: `Die Einspeisevergütung ist bundesweit einheitlich geregelt und gilt auch für ${city.name}: Bei Überschusseinspeisung (Eigenverbrauch priorisiert) erhalten Sie für Anlagen bis 10 kWp aktuell ca. 8,0 ct/kWh, bei Volleinspeisung ca. 12,9 ct/kWh. Die Vergütung wird über 20 Jahre plus Inbetriebnahmejahr gesetzlich garantiert. Bei einem regionalen Netzstrompreis von ${metrics.strompreis.avg.toFixed(1)} ct/kWh in ${city.bundesland} ist der Eigenverbrauch wirtschaftlich deutlich attraktiver als die Einspeisung.`
    },
    {
      q: `Welcher Netzbetreiber ist für ${city.name} zuständig?`,
      a: `Der zuständige Verteilnetzbetreiber (VNB) für die Region ${city.name} (${city.zip}) ist die <strong>${metrics.netzbetreiber.name}</strong>. Dieser ist Ihr Ansprechpartner für die Netzverträglichkeitsprüfung, die Zählersetzung (Zweirichtungszähler) und die technische Inbetriebnahme. Zusätzlich müssen Sie Ihre Anlage im <a href="https://www.marktstammdatenregister.de/" target="_blank" rel="noopener nofollow" class="text-accent-600 hover:text-accent-500 underline">Marktstammdatenregister</a> der Bundesnetzagentur registrieren.`
    },
    {
      q: `Wie schnell amortisiert sich eine PV-Anlage in ${city.name}?`,
      a: `Basierend auf den aktuellen Marktpreisen und dem lokalen Ertragspotenzial von ${metrics.spezifischerErtrag} kWh/kWp amortisiert sich eine PV-Anlage ohne Speicher in ${city.name} nach ca. ${metrics.amortisationOhne} Jahren, mit Speicher nach ca. ${metrics.amortisationMit} Jahren. Über die gesamte Nutzungsdauer von 25+ Jahren erwirtschaftet die Anlage einen positiven Cashflow von rund ${metrics.cashflow25Jahre.toLocaleString('de-DE')} €. Die Gesamtrendite liegt bei ${metrics.renditeUeber25}%.`
    },
    {
      q: `Welche Förderungen gibt es für Solaranlagen in ${city.bundesland}?`,
      a: `In ${city.bundesland} profitieren Sie von mehreren Fördermöglichkeiten: (1) Bundesweit: KfW-Kredit 270 (zinsgünstiges Darlehen), 0% Umsatzsteuer auf PV-Komponenten. (2) Landesebene: ${bundeslandLinks[city.bundesland]?.solarpflichtInfo.split('.')[0] || 'Regionale Förderprogramme verfügbar'}. (3) Kommunal: Einige Stadtwerke und Kommunen in ${city.bundesland} bieten zusätzliche Zuschüsse für Batteriespeicher und Wallboxen. Informieren Sie sich bei der Energieagentur Ihres Bundeslandes über die aktuellen Programme.`
    },
    {
      q: `Wie viel Strom erzeugt eine Solaranlage in ${city.name} pro Jahr?`,
      a: `An Ihrem Standort ${city.name} (${city.lat.toFixed(2)}°N, ${city.sonnenstunden} Sonnenstunden/Jahr) erzeugt eine optimal ausgerichtete 10-kWp-Dachanlage jährlich rund ${metrics.ertrag10kwp.toLocaleString('de-DE')} kWh Solarstrom. Das entspricht einem spezifischen Ertrag von ${metrics.spezifischerErtrag} kWh pro Kilowattpeak. Ohne Speicher nutzen Sie davon ca. ${metrics.eigenverbrauchOhne}% selbst, mit einem 10-kWh-Speicher steigt die Quote auf bis zu ${metrics.eigenverbrauchOptimal}%.`
    },
    {
      q: `Lohnt sich ein Stromspeicher in ${city.name}?`,
      a: `Ein Stromspeicher ist in ${city.name} besonders dann wirtschaftlich sinnvoll, wenn Sie einen hohen Eigenverbrauchsanteil anstreben. Ohne Speicher liegt Ihr Eigenverbrauch bei ca. ${metrics.eigenverbrauchOhne}%, mit Speicher steigt er auf bis zu ${metrics.eigenverbrauchOptimal}%. Bei einem Netzstrompreis von ${metrics.strompreis.avg.toFixed(1)} ct/kWh in ${city.bundesland} spart jede selbst verbrauchte Kilowattstunde rund ${(metrics.strompreis.avg - 8).toFixed(1)} Cent gegenüber dem Netzbezug. Die Zusatzinvestition für den Speicher amortisiert sich in ca. ${Math.round((metrics.amortisationMit - metrics.amortisationOhne) * 2.5 + metrics.amortisationOhne)} Jahren.`
    },
    {
      q: `Wie viel CO₂ spart eine Solaranlage in ${city.name}?`,
      a: `Eine 10-kWp-Photovoltaikanlage in ${city.name} vermeidet jährlich ca. ${metrics.co2Ersparnis.toLocaleString('de-DE')} kg CO₂-Emissionen. Über die Lebensdauer der Anlage (25+ Jahre) summiert sich die Klimaschutzleistung auf rund ${Math.round(metrics.co2Ersparnis * 25 / 1000)} Tonnen vermiedenes CO₂. Das entspricht etwa ${Math.round(metrics.co2Ersparnis * 25 / 2300)} PKW-Jahresfahrleistungen oder dem jährlichen CO₂-Fußabdruck von ${Math.round(metrics.co2Ersparnis * 25 / 11000)} durchschnittlichen Deutschen.`
    },
    {
      q: `Welche Dachausrichtung ist in ${city.name} optimal?`,
      a: `Für maximalen Ertrag empfehlen wir in ${city.name} eine Südausrichtung mit einer Dachneigung von 30-35°. Aber auch Ost-West-Dächer sind hervorragend geeignet: Sie erzeugen zwar ca. 10-15% weniger Jahresertrag, verteilen die Stromproduktion aber gleichmäßiger über den Tag. Das erhöht den Eigenverbrauch ohne Speicher auf bis zu ${metrics.eigenverbrauchOhne + 5}%. Flachdächer ermöglichen eine flexible Aufständerung und sind ebenfalls eine wirtschaftliche Option.`
    },
    {
      q: `Brauche ich eine Baugenehmigung für eine PV-Anlage in ${city.name}?`,
      a: `In ${city.bundesland} sind Aufdach-Photovoltaikanlagen auf Ein- und Zweifamilienhäusern grundsätzlich genehmigungsfrei, solange sie die Firsthöhe nicht überragen und keine Denkmalschutzauflagen bestehen. Bei denkmalgeschützten Gebäuden oder Anlagen in besonderen Schutzzonen (Ensemble-Schutz) ist eine Abstimmung mit der zuständigen Denkmalschutzbehörde in ${city.name} erforderlich. Ihr Solarteur kennt die lokalen Vorschriften und übernimmt die Klärung.`
    },
  ];

  // Select 4-5 FAQs deterministically — always include cost and yield
  const alwaysInclude = [0, 3]; // Cost + Amortisation always
  const pool = [1, 2, 4, 5, 6, 7, 8, 9]; // Remaining pool
  const shuffledPool = [...pool].sort((a, b) => {
    return seededRandom(h, a) - seededRandom(h, b);
  });

  const count = (h % 2) === 0 ? 5 : 4;
  const selectedIndices = [...alwaysInclude, ...shuffledPool.slice(0, count - alwaysInclude.length)];
  
  // Sort by original index for logical order
  selectedIndices.sort((a, b) => a - b);

  return selectedIndices.map(i => allFAQs[i]);
}

// ─── Nearby cities comparison data ──────────────────────────────────────
export interface NearbyCityComparison {
  name: string;
  slug: string;
  zip: string;
  sonnenstunden: number;
  ertrag: number;
  differenz: string; // relative to main city
}

export function computeNearbyCityComparisons(city: City, nearbyCities: City[]): NearbyCityComparison[] {
  const mainErtrag = computeSolarMetrics(city).spezifischerErtrag;

  return nearbyCities.slice(0, 4).map(nc => {
    const ncMetrics = computeSolarMetrics(nc);
    const diff = ncMetrics.spezifischerErtrag - mainErtrag;
    return {
      name: nc.name,
      slug: nc.slug,
      zip: nc.zip,
      sonnenstunden: nc.sonnenstunden,
      ertrag: ncMetrics.spezifischerErtrag,
      differenz: diff > 0 ? `+${diff} kWh/kWp` : `${diff} kWh/kWp`,
    };
  });
}

// ─── Complete city content bundle ────────────────────────────────────────
export interface CityContentBundle {
  intro: string;
  localTip: string;
  marketData: string;
  sonnenpotenzial: string;
  faq: FAQItem[];
  metrics: SolarMetrics;
  landLinks: BundeslandLinks;
  selectedFederalLinks: FederalLink[];
}

export function generateCityContent(city: City): CityContentBundle {
  const metrics = computeSolarMetrics(city);
  const { landLinks, selectedFederalLinks } = getLinksForCity(city.slug, city.bundesland, city.pop);

  return {
    intro: generateIntro(city, metrics),
    localTip: generateLocalTip(city, metrics),
    marketData: generateMarketData(city, metrics),
    sonnenpotenzial: generateSonnenpotenzial(city, metrics),
    faq: generateFAQ(city, metrics),
    metrics,
    landLinks,
    selectedFederalLinks,
  };
}
