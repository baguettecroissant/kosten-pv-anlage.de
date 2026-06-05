/**
 * 🔗 Autoritative externe Links — kosten-pv-anlage.de
 * E-E-A-T Signale: Offizielle Quellen, Behörden, Energieagenturen
 * Jede Stadt-Seite bekommt 3–5 variierte Links aus diesem Pool.
 */

// ─── Bundesland-spezifische Ressourcen ─────────────────────────────────────
export interface BundeslandLinks {
  solarkataster: { url: string; label: string };
  energieagentur: { url: string; label: string };
  foerderprogramm: { url: string; label: string };
  solarpflichtInfo: string; // Kurzbeschreibung der Solarpflicht-Regelung
  verbraucherzentrale: { url: string; label: string };
  netzbetreiber: { name: string; url: string }[];
  landesportal: { url: string; label: string };
}

export const bundeslandLinks: Record<string, BundeslandLinks> = {
  "Baden-Württemberg": {
    solarkataster: { url: "https://www.energieatlas-bw.de/sonne/dachflachen/solarpotenzial-auf-dachflachen", label: "Energieatlas Baden-Württemberg — Solarpotenzial auf Dachflächen" },
    energieagentur: { url: "https://www.kea-bw.de/", label: "KEA Klimaschutz- und Energieagentur Baden-Württemberg" },
    foerderprogramm: { url: "https://www.l-bank.de/produkte/finanzhilfen/photovoltaik-und-speicher.html", label: "L-Bank — Förderprogramme Photovoltaik & Speicher" },
    solarpflichtInfo: "In Baden-Württemberg gilt seit 2023 eine Solarpflicht für alle Neubauten und seit Mai 2022 bei grundlegenden Dachsanierungen. Mindestens 60 % der geeigneten Dachfläche müssen mit PV-Modulen belegt werden (§ 8a Klimaschutzgesetz BW).",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-bawue.de/energie", label: "Verbraucherzentrale Baden-Württemberg — Energieberatung" },
    netzbetreiber: [
      { name: "Netze BW GmbH", url: "https://www.netze-bw.de/" },
      { name: "TransnetBW GmbH", url: "https://www.transnetbw.de/" },
    ],
    landesportal: { url: "https://um.baden-wuerttemberg.de/de/energie/erneuerbare-energien/sonnenenergie/", label: "Ministerium für Umwelt BW — Sonnenenergie" },
  },
  "Bayern": {
    solarkataster: { url: "https://www.energieatlas.bayern.de/thema_sonne/photovoltaik/solarpotenzial.html", label: "Energie-Atlas Bayern — Solarpotenzial-Rechner" },
    energieagentur: { url: "https://www.lez.bayern.de/", label: "Landesenergieagentur Bayern (LEZ)" },
    foerderprogramm: { url: "https://www.lfa.de/website/de/foerderangebote/energiekredit/index.php", label: "LfA Förderbank Bayern — Energiekredit" },
    solarpflichtInfo: "Bayern plant schrittweise Solarpflichten: Ab 2025 für gewerbliche Neubauten, ab 2026 für Wohngebäude-Neubauten. Bestandsgebäude sind bei grundlegenden Dachsanierungen betroffen. Dank der hervorragenden Globalstrahlungswerte (bis 1.300 kWh/m²) erzielen Anlagen hier bundesweit die höchsten Erträge.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-bayern.de/energie", label: "Verbraucherzentrale Bayern — Energieberatung" },
    netzbetreiber: [
      { name: "Bayernwerk Netz GmbH", url: "https://www.bayernwerk-netz.de/" },
      { name: "Stadtwerke München (SWM)", url: "https://www.swm.de/privatkunden/strom" },
      { name: "LEW Verteilnetz GmbH", url: "https://www.lew-verteilnetz.de/" },
    ],
    landesportal: { url: "https://www.stmwi.bayern.de/energie/erneuerbare-energien/photovoltaik/", label: "Bayerisches Wirtschaftsministerium — Photovoltaik" },
  },
  "Berlin": {
    solarkataster: { url: "https://www.solarwende-berlin.de/solardachkataster", label: "Solarwende Berlin — Solardachkataster" },
    energieagentur: { url: "https://www.berlin-energie.de/", label: "Berliner Energieagentur" },
    foerderprogramm: { url: "https://www.ibb.de/de/foerderprogramme/solarplus.html", label: "IBB — SolarPLUS Förderprogramm Berlin" },
    solarpflichtInfo: "Das Berliner Solargesetz (SolG Bln) schreibt seit 2023 eine Solarpflicht für alle Neubauten und bei wesentlichen Dachsanierungen vor. Über das Programm 'SolarPLUS' der IBB können Zuschüsse für Batteriespeicher, Steckersolargeräte und Dachgutachten beantragt werden.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-berlin.de/energie", label: "Verbraucherzentrale Berlin — Energieberatung" },
    netzbetreiber: [
      { name: "Stromnetz Berlin GmbH", url: "https://www.stromnetz.berlin/" },
    ],
    landesportal: { url: "https://www.berlin.de/sen/energie/erneuerbare-energien/", label: "Senatsverwaltung Berlin — Erneuerbare Energien" },
  },
  "Brandenburg": {
    solarkataster: { url: "https://energieportal-brandenburg.de/", label: "Energieportal Brandenburg — Solarpotenzialrechner" },
    energieagentur: { url: "https://www.wfbb.de/de/energie", label: "WFBB Energie — Wirtschaftsförderung Brandenburg" },
    foerderprogramm: { url: "https://www.ilb.de/de/wirtschaft/zuschuesse/kleine-photovoltaikanlagen/", label: "ILB — Förderung kleine PV-Anlagen Brandenburg" },
    solarpflichtInfo: "Brandenburg hat aktuell keine landesweite Solarpflicht, plant aber eine stufenweise Einführung bis 2027. Das Land fördert PV-Anlagen über die ILB (Investitionsbank des Landes Brandenburg) und setzt auf Bürokratieabbau bei Netzanschlüssen.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-brandenburg.de/energie", label: "Verbraucherzentrale Brandenburg — Energieberatung" },
    netzbetreiber: [
      { name: "E.DIS Netz GmbH", url: "https://www.e-dis-netz.de/" },
    ],
    landesportal: { url: "https://mwae.brandenburg.de/de/erneuerbare-energien/", label: "MWAE Brandenburg — Erneuerbare Energien" },
  },
  "Bremen": {
    solarkataster: { url: "https://www.solardach.bremen.de/", label: "Solardachkataster Bremen" },
    energieagentur: { url: "https://energiekonsens.de/", label: "energiekonsens — Bremer Klimaschutzagentur" },
    foerderprogramm: { url: "https://www.bab-bremen.de/de/foerderung/energetische-sanierung.html", label: "BAB — Förderprogramme Energie Bremen" },
    solarpflichtInfo: "Bremen führt eine Solarpflicht stufenweise ein: Seit 2025 für Neubauten und ab 2026 auch bei umfassenden Dachsanierungen von Bestandsgebäuden. Das Solardachkataster Bremen bietet eine exzellente Vorabanalyse für jedes Gebäude in der Stadt.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-bremen.de/energie", label: "Verbraucherzentrale Bremen — Energieberatung" },
    netzbetreiber: [
      { name: "wesernetz Bremen GmbH", url: "https://www.wesernetz.de/" },
    ],
    landesportal: { url: "https://www.bauumwelt.bremen.de/klima/solar-6793", label: "Senatorin für Bau und Umwelt Bremen — Solar" },
  },
  "Hamburg": {
    solarkataster: { url: "https://www.hamburg.de/solaratlas/", label: "Hamburg Solaratlas — Solarpotenzial-Karte" },
    energieagentur: { url: "https://www.hamburg.de/energiewende/", label: "Hamburg Energiewende" },
    foerderprogramm: { url: "https://www.ifbhh.de/foerderprogramm/erneuerbare-waerme", label: "IFB Hamburg — Erneuerbare Energien & Speicher" },
    solarpflichtInfo: "In Hamburg gilt seit 2025 eine Solarpflicht für alle Neubauten. Ab 2027 wird diese auf Bestandsgebäude bei vollständiger Dacherneuerung ausgeweitet. Die IFB Hamburg bezuschusst Batteriespeicher mit bis zu 1.500 € (Stand 2026).",
    verbraucherzentrale: { url: "https://www.vzhh.de/themen/energie", label: "Verbraucherzentrale Hamburg — Energieberatung" },
    netzbetreiber: [
      { name: "Stromnetz Hamburg GmbH", url: "https://www.stromnetz-hamburg.de/" },
    ],
    landesportal: { url: "https://www.hamburg.de/solaranlagen/", label: "Freie und Hansestadt Hamburg — Solaranlagen" },
  },
  "Hessen": {
    solarkataster: { url: "https://www.solarkataster.hessen.de/", label: "Solarkataster Hessen — Dachanalyse" },
    energieagentur: { url: "https://www.lea-hessen.de/", label: "LEA LandesEnergieAgentur Hessen" },
    foerderprogramm: { url: "https://www.wibank.de/wibank/foerderfinder/solarthermie-und-photovoltaik-404744", label: "WIBank Hessen — Solarförderung" },
    solarpflichtInfo: "Hessen hat eine Solarpflicht für landeseigene Gebäude und Parkplätze ab 50 Stellplätzen eingeführt. Für private Neubauten ist die Pflicht ab 2026 geplant. Der Solarkataster Hessen bietet eine der besten kostenlosen Dachanalysen Deutschlands.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-hessen.de/energie", label: "Verbraucherzentrale Hessen — Energieberatung" },
    netzbetreiber: [
      { name: "Syna GmbH", url: "https://www.syna.de/" },
      { name: "e-netz Südhessen AG", url: "https://www.e-netz-suedhessen.de/" },
    ],
    landesportal: { url: "https://www.energieland.hessen.de/solar", label: "Energieland Hessen — Solar" },
  },
  "Mecklenburg-Vorpommern": {
    solarkataster: { url: "https://www.regierung-mv.de/Landesregierung/em/Energie/Erneuerbare-Energien/", label: "Landesregierung MV — Erneuerbare Energien" },
    energieagentur: { url: "https://www.leo-mv.de/", label: "Landesenergie- und Klimaschutzagentur MV (LEA)" },
    foerderprogramm: { url: "https://www.lfi-mv.de/", label: "Landesförderinstitut MV — Förderprogramme" },
    solarpflichtInfo: "Mecklenburg-Vorpommern hat aktuell keine Solarpflicht, setzt aber auf freiwillige Anreize durch Förderprogramme und vereinfachte Netzanschlussverfahren. Die Nähe zur Ostsee sorgt für überdurchschnittliche Sonnenstunden an der Küste.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-mv.eu/energie", label: "Verbraucherzentrale MV — Energieberatung" },
    netzbetreiber: [
      { name: "E.DIS Netz GmbH", url: "https://www.e-dis-netz.de/" },
      { name: "WEMAG Netz GmbH", url: "https://www.wemag-netz.de/" },
    ],
    landesportal: { url: "https://www.regierung-mv.de/Landesregierung/em/Energie/", label: "Energieministerium Mecklenburg-Vorpommern" },
  },
  "Niedersachsen": {
    solarkataster: { url: "https://www.solarkataster.niedersachsen.de/", label: "Solarkataster Niedersachsen" },
    energieagentur: { url: "https://www.klimaschutz-niedersachsen.de/", label: "KEAN — Klimaschutz- und Energieagentur Niedersachsen" },
    foerderprogramm: { url: "https://www.nbank.de/F%C3%B6rderprogramme/Aktuelle-F%C3%B6rderprogramme/", label: "NBank — Förderprogramme Niedersachsen" },
    solarpflichtInfo: "Niedersachsen hat ab 2025 eine Solarpflicht für gewerbliche Neubauten und ab 2026 für Wohngebäude-Neubauten sowie bei grundlegenden Dacherneuerungen eingeführt. Die KEAN berät kostenlos zu Solaranlagen und Fördermitteln.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-niedersachsen.de/energie", label: "Verbraucherzentrale Niedersachsen — Energieberatung" },
    netzbetreiber: [
      { name: "Avacon Netz GmbH", url: "https://www.avacon-netz.de/" },
      { name: "EWE NETZ GmbH", url: "https://www.ewe-netz.de/" },
    ],
    landesportal: { url: "https://www.umwelt.niedersachsen.de/startseite/themen/energie/erneuerbare_energien/", label: "Umweltministerium Niedersachsen — Erneuerbare Energien" },
  },
  "Nordrhein-Westfalen": {
    solarkataster: { url: "https://www.energieatlas.nrw.de/site/karte_solarkataster", label: "Energieatlas NRW — Solarkataster" },
    energieagentur: { url: "https://www.energieagentur.nrw/", label: "EnergieAgentur.NRW" },
    foerderprogramm: { url: "https://www.nrwbank.de/de/foerderung/foerderprodukte/15078/progres-nrw.html", label: "NRW.BANK — progres.nrw Förderprogramm" },
    solarpflichtInfo: "In Nordrhein-Westfalen greift ab 2024 eine Solarpflicht für gewerbliche Neubauten und Parkplätze. Ab 2025 für öffentliche Gebäude und ab 2026 bei umfassenden Dachsanierungen im Wohngebäudebestand. NRW fördert über progres.nrw auch Batteriespeicher und Steckersolargeräte.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale.nrw/energie", label: "Verbraucherzentrale NRW — Energieberatung" },
    netzbetreiber: [
      { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
      { name: "Stadtwerke Köln (RheinEnergie)", url: "https://www.rheinenergie.com/" },
      { name: "Stadtwerke Düsseldorf Netz", url: "https://www.swd-netz.de/" },
    ],
    landesportal: { url: "https://www.wirtschaft.nrw/photovoltaik", label: "MWIKE NRW — Photovoltaik-Ausbau" },
  },
  "Rheinland-Pfalz": {
    solarkataster: { url: "https://www.solarkataster.rlp.de/", label: "Solarkataster Rheinland-Pfalz" },
    energieagentur: { url: "https://www.energieagentur.rlp.de/", label: "Energieagentur Rheinland-Pfalz" },
    foerderprogramm: { url: "https://isb.rlp.de/foerderung/solarspeicherprogramm.html", label: "ISB — Solarspeicher-Förderprogramm RLP" },
    solarpflichtInfo: "Rheinland-Pfalz setzt auf starke Anreize statt Pflichten: Das Solar-Speicherprogramm der ISB bezuschusst Batteriespeicher in Kombination mit neuen PV-Anlagen. Zudem bieten die regionalen Energieagenturen kostenlose Erstberatungen an.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-rlp.de/energie", label: "Verbraucherzentrale Rheinland-Pfalz — Energieberatung" },
    netzbetreiber: [
      { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
      { name: "Pfalzwerke Netz AG", url: "https://www.pfalzwerke-netz.de/" },
    ],
    landesportal: { url: "https://mwvlw.rlp.de/themen/energiepolitik/erneuerbare-energien/solarenergie", label: "MWVLW RLP — Solarenergie" },
  },
  "Saarland": {
    solarkataster: { url: "https://geoportal.saarland.de/mapbender/geoportal/solarpotenzial.html", label: "Geoportal Saarland — Solarpotenzial" },
    energieagentur: { url: "https://www.arge-solar.de/", label: "ARGE SOLAR e.V. — Energieberatung Saarland" },
    foerderprogramm: { url: "https://www.sikb.de/fuer-unternehmen/alle-angebote/energiekredite/", label: "SIKB — Energiekredite Saarland" },
    solarpflichtInfo: "Das Saarland hat aktuell keine Solarpflicht, bietet aber über die SIKB zinsgünstige Energiekredite für PV-Anlagen und Speicher. Die ARGE SOLAR berät kostenlos und unterstützt bei der Antragstellung für KfW-Fördermittel.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-saarland.de/energie", label: "Verbraucherzentrale Saarland — Energieberatung" },
    netzbetreiber: [
      { name: "Westnetz GmbH", url: "https://www.westnetz.de/" },
      { name: "energis-Netzgesellschaft mbH", url: "https://www.energis-netzgesellschaft.de/" },
    ],
    landesportal: { url: "https://www.saarland.de/mwide/DE/portale/energie/erneuerbare-energien/photovoltaik/photovoltaik.html", label: "Landesregierung Saarland — Photovoltaik" },
  },
  "Sachsen": {
    solarkataster: { url: "https://www.energieportal-sachsen.de/", label: "Energieportal Sachsen — Solarpotenzialanalyse" },
    energieagentur: { url: "https://www.saena.de/", label: "SAENA — Sächsische Energieagentur" },
    foerderprogramm: { url: "https://www.sab.sachsen.de/f%C3%B6rderprogramme/sie-m%C3%B6chten-wohnraum-schaffen-oder-sanieren/speicher-f%C3%BCr-photovoltaik.jsp", label: "SAB Sachsen — Speicher-Förderung" },
    solarpflichtInfo: "Sachsen fördert die Solarenergie über zinsgünstige SAB-Kredite und das Speicherförderprogramm der SAENA. Die Sächsische Energieagentur bietet zudem kostenlose Energieberatungen und unterstützt den Bürokratieabbau bei PV-Netzanschlüssen.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-sachsen.de/energie", label: "Verbraucherzentrale Sachsen — Energieberatung" },
    netzbetreiber: [
      { name: "Mitnetz Strom GmbH", url: "https://www.mitnetz-strom.de/" },
      { name: "SachsenNetze GmbH", url: "https://www.sachsennetze.de/" },
    ],
    landesportal: { url: "https://www.energie.sachsen.de/photovoltaik.html", label: "Freistaat Sachsen — Photovoltaik" },
  },
  "Sachsen-Anhalt": {
    solarkataster: { url: "https://www.energieportal-sachsen-anhalt.de/", label: "Energieportal Sachsen-Anhalt" },
    energieagentur: { url: "https://www.lena-lsa.de/", label: "LENA — Landesenergieagentur Sachsen-Anhalt" },
    foerderprogramm: { url: "https://www.ib-sachsen-anhalt.de/", label: "IB Sachsen-Anhalt — Förderprogramme" },
    solarpflichtInfo: "Sachsen-Anhalt hat aktuell keine Solarpflicht, bietet aber über die Investitionsbank und die LENA verschiedene Fördermöglichkeiten für PV-Anlagen und Speichersysteme. Die Region profitiert von überdurchschnittlichen Sonnenstunden für Ostdeutschland.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale-sachsen-anhalt.de/energie", label: "Verbraucherzentrale Sachsen-Anhalt — Energieberatung" },
    netzbetreiber: [
      { name: "Mitnetz Strom GmbH", url: "https://www.mitnetz-strom.de/" },
      { name: "Avacon Netz GmbH", url: "https://www.avacon-netz.de/" },
    ],
    landesportal: { url: "https://mwu.sachsen-anhalt.de/energie/erneuerbare-energien/", label: "MWU Sachsen-Anhalt — Erneuerbare Energien" },
  },
  "Schleswig-Holstein": {
    solarkataster: { url: "https://www.solaratlas.sh/", label: "Solaratlas Schleswig-Holstein" },
    energieagentur: { url: "https://www.eek-sh.de/", label: "EEK.SH — Gesellschaft für Energie und Klimaschutz" },
    foerderprogramm: { url: "https://www.ib-sh.de/foerderlotse/", label: "IB.SH — Förderlotse Schleswig-Holstein" },
    solarpflichtInfo: "Schleswig-Holstein hat ab 2025 eine Solarpflicht für gewerbliche Neubauten eingeführt. Für Wohngebäude wird eine stufenweise Ausweitung geprüft. Das nördlichste Bundesland erzielt trotz der nördlichen Lage dank der maritimen Sonneneinstrahlung solide Erträge.",
    verbraucherzentrale: { url: "https://www.verbraucherzentrale.sh/energie", label: "Verbraucherzentrale Schleswig-Holstein — Energieberatung" },
    netzbetreiber: [
      { name: "Schleswig-Holstein Netz AG", url: "https://www.sh-netz.com/" },
    ],
    landesportal: { url: "https://www.schleswig-holstein.de/DE/fachinhalte/E/erneuerbare_energien/erneuerbare_energien.html", label: "Land Schleswig-Holstein — Erneuerbare Energien" },
  },
  "Thüringen": {
    solarkataster: { url: "https://www.thega.de/solarrechner/", label: "ThEGA Thüringen — Solarrechner" },
    energieagentur: { url: "https://www.thega.de/", label: "ThEGA — Thüringer Energie- und GreenTech-Agentur" },
    foerderprogramm: { url: "https://www.aufbaubank.de/Foerderprogramme/Solar-Invest", label: "TAB — Solar Invest Thüringen" },
    solarpflichtInfo: "Thüringen betreibt das bundesweit einmalige Programm 'Solar Invest' über die Thüringer Aufbaubank (TAB), das sowohl PV-Anlagen als auch Speicher mit Investitionszuschüssen fördert. Eine Solarpflicht ist aktuell in Vorbereitung.",
    verbraucherzentrale: { url: "https://www.vzth.de/energie", label: "Verbraucherzentrale Thüringen — Energieberatung" },
    netzbetreiber: [
      { name: "TEN Thüringer Energienetze GmbH & Co. KG", url: "https://www.thueringer-energienetze.com/" },
    ],
    landesportal: { url: "https://www.thueringen.de/th5/tmuen/energie/erneuerbar/solarenergie/", label: "TMUEN Thüringen — Solarenergie" },
  },
};

// ─── Bundesweite Ressourcen (rotiert pro Seite) ────────────────────────────
export interface FederalLink {
  url: string;
  label: string;
  description: string;
  category: 'register' | 'foerderung' | 'verband' | 'forschung' | 'beratung' | 'recht';
}

export const federalLinks: FederalLink[] = [
  {
    url: "https://www.marktstammdatenregister.de/",
    label: "Marktstammdatenregister (MaStR)",
    description: "Pflichtregistrierung jeder PV-Anlage bei der Bundesnetzagentur — Voraussetzung für die Einspeisevergütung.",
    category: "register",
  },
  {
    url: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Erneuerbare-Energien-Standard-(270)/",
    label: "KfW-Förderkredit 270 — Erneuerbare Energien",
    description: "Zinsgünstige Darlehen der Kreditanstalt für Wiederaufbau für PV-Anlagen, Speicher und Zählerplatzmodernisierung.",
    category: "foerderung",
  },
  {
    url: "https://www.solarwirtschaft.de/",
    label: "BSW — Bundesverband Solarwirtschaft e.V.",
    description: "Der Branchenverband der deutschen Solarindustrie mit aktuellen Marktdaten, Statistiken und Preisentwicklungen.",
    category: "verband",
  },
  {
    url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/aktuelle-fakten-zur-photovoltaik-in-deutschland.html",
    label: "Fraunhofer ISE — Aktuelle Fakten zur Photovoltaik",
    description: "Wissenschaftliche Daten und Fakten zur Photovoltaik in Deutschland vom renommierten Fraunhofer-Institut für Solare Energiesysteme.",
    category: "forschung",
  },
  {
    url: "https://www.verbraucherzentrale.de/wissen/energie/erneuerbare-energien/photovoltaik-was-bei-der-planung-einer-solaranlage-wichtig-ist-5574",
    label: "Verbraucherzentrale — Photovoltaik-Ratgeber",
    description: "Unabhängiger Ratgeber der Verbraucherzentrale zu Planung, Kosten und Wirtschaftlichkeit von PV-Anlagen.",
    category: "beratung",
  },
  {
    url: "https://www.dgs.de/",
    label: "DGS — Deutsche Gesellschaft für Sonnenenergie e.V.",
    description: "Die älteste Solarorganisation Deutschlands bietet unabhängige Informationen, Veranstaltungen und Weiterbildungen rund um Photovoltaik.",
    category: "verband",
  },
  {
    url: "https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/start.html",
    label: "Bundesnetzagentur — Erneuerbare Energien",
    description: "Offizielle Daten zu Einspeisevergütungen, Ausschreibungen und dem EEG-Register.",
    category: "recht",
  },
  {
    url: "https://solar.htw-berlin.de/rechner/unabhaengigkeitsrechner/",
    label: "HTW Berlin — Unabhängigkeitsrechner",
    description: "Wissenschaftlicher Rechner der Hochschule für Technik und Wirtschaft Berlin zur Bestimmung des optimalen Eigenverbrauchs und Autarkiegrads.",
    category: "forschung",
  },
];

// ─── Helper: Links für eine Stadt auswählen ─────────────────────────────────
export function getLinksForCity(slug: string, bundesland: string, pop: number): {
  landLinks: BundeslandLinks;
  selectedFederalLinks: FederalLink[];
} {
  const landLinks = bundeslandLinks[bundesland] || bundeslandLinks["Nordrhein-Westfalen"];

  // Deterministic selection based on slug hash — 3-4 federal links per page
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const count = pop > 200000 ? 4 : 3;

  // Always include MaStR and KfW, then rotate others
  const mandatory = federalLinks.filter(l => l.category === 'register' || l.category === 'foerderung');
  const optional = federalLinks.filter(l => l.category !== 'register' && l.category !== 'foerderung');

  // Deterministic shuffle of optional links
  const shuffled = [...optional].sort((a, b) => {
    const hA = (hash * a.url.length) % 1000;
    const hB = (hash * b.url.length) % 1000;
    return hA - hB;
  });

  const selectedFederalLinks = [...mandatory, ...shuffled.slice(0, count - mandatory.length)];

  return { landLinks, selectedFederalLinks };
}
