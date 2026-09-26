/**
 * Content for the Case Reference tab, one entry per case. Words wrapped in
 * [brackets] in example sentences are the ones in that case.
 */

export type CaseAbbr = "nom" | "gen" | "dat" | "acc" | "ins" | "loc" | "voc";

export interface Term {
  pl: string;
  en: string;
}

export interface EndingRow {
  category: string;
  ending: string;
  example: string;
}

export interface SentenceFrame {
  pl: string;
  en: string;
  example: string;
}

export interface CaseReference {
  abbr: CaseAbbr;
  pl: string;
  en: string;
  questions: Term[];
  description: string;
  prepositions: Term[];
  prepositionNote?: string;
  verbs: Term[];
  verbNote?: string;
  nounEndings: EndingRow[];
  adjectiveEndings: EndingRow[];
  examples: Term[];
  frames: SentenceFrame[];
}

export const CASE_REFERENCE: CaseReference[] = [
  {
    abbr: "nom",
    pl: "Mianownik",
    en: "Nominative",
    questions: [
      { pl: "Kto?", en: "Who?" },
      { pl: "Co?", en: "What?" },
    ],
    description:
      "The dictionary form — how a noun looks when you look it up. Used for the subject of a sentence (the one doing the action), and for the complement after “to jest / to są” (this is / these are).",
    prepositions: [],
    prepositionNote:
      "No prepositions govern the nominative — it's the “base” case.",
    verbs: [],
    verbNote: "Not triggered by specific verbs — it's the subject of any verb.",
    nounEndings: [
      {
        category: "Masculine (sing.)",
        ending: "consonant (no change)",
        example: "dom, kot, student",
      },
      {
        category: "Feminine (sing.)",
        ending: "-a / -i / consonant (rare)",
        example: "kobieta, pani, noc",
      },
      {
        category: "Neuter (sing.)",
        ending: "-o / -e / -ę",
        example: "dziecko, morze, imię",
      },
      {
        category: "Masc. personal (plural)",
        ending: "-i / -y / -owie",
        example: "studenci, panowie",
      },
      {
        category: "Everything else (plural)",
        ending: "-y / -i / -e / -a",
        example: "kobiety, dzieci, koty",
      },
    ],
    adjectiveEndings: [
      {
        category: "Masculine (sing.)",
        ending: "-y / -i (soft/velar stems)",
        example: "dobry, tani",
      },
      { category: "Feminine (sing.)", ending: "-a", example: "dobra" },
      { category: "Neuter (sing.)", ending: "-e", example: "dobre" },
      {
        category: "Masc. personal (plural)",
        ending: "-y / -i (+ softening)",
        example: "dobrzy, młodzi",
      },
      { category: "Everything else (plural)", ending: "-e", example: "dobre" },
    ],
    examples: [
      { pl: "[Kot] śpi na kanapie.", en: "The cat is sleeping on the couch." },
      { pl: "To jest [mój brat].", en: "This is my brother." },
      {
        pl: "[Moja mama] pracuje w szpitalu.",
        en: "My mom works in a hospital.",
      },
      {
        pl: "[Ta książka] jest bardzo ciekawa.",
        en: "This book is very interesting.",
      },
      {
        pl: "[Dzieci] bawią się w parku.",
        en: "The children are playing in the park.",
      },
    ],
    frames: [
      { pl: "To jest ___.", en: "This is ___.", example: "To jest kot." },
      {
        pl: "To są ___.",
        en: "These are ___. (plural)",
        example: "To są koty.",
      },
    ],
  },
  {
    abbr: "gen",
    pl: "Dopełniacz",
    en: "Genitive",
    questions: [
      { pl: "Kogo?", en: "Whom?" },
      { pl: "Czego?", en: "Of what?" },
    ],
    description:
      "The hardest-working case. Shows possession (“of”), is used after negation (nie ma + genitive = “there isn't / doesn't have”), after numbers 5 and up, after words like dużo / mało / kilka (a lot / a little / a few), and as the object of many common verbs and prepositions.",
    prepositions: [
      { pl: "bez", en: "without" },
      { pl: "dla", en: "for" },
      { pl: "do", en: "to, into" },
      { pl: "od", en: "from" },
      { pl: "z / ze", en: "out of, from" },
      { pl: "u", en: "at [someone]'s place" },
      { pl: "obok", en: "next to" },
      { pl: "koło", en: "near" },
      { pl: "blisko", en: "close to" },
      { pl: "podczas", en: "during" },
      { pl: "oprócz", en: "except" },
      { pl: "według", en: "according to" },
      { pl: "wśród", en: "among" },
      { pl: "z powodu", en: "because of" },
      { pl: "naprzeciwko", en: "opposite" },
      { pl: "wzdłuż", en: "along" },
      { pl: "zamiast", en: "instead of" },
    ],
    prepositionNote:
      "By far the longest preposition list — worth memorizing in chunks. Note: z meaning “with” takes the instrumental.",
    verbs: [
      { pl: "szukać", en: "to look for" },
      { pl: "słuchać", en: "to listen to" },
      { pl: "potrzebować", en: "to need" },
      { pl: "używać", en: "to use" },
      { pl: "unikać", en: "to avoid" },
      { pl: "życzyć", en: "to wish" },
      { pl: "bać się", en: "to be afraid of" },
      { pl: "uczyć się", en: "to study [a subject]" },
      { pl: "zapomnieć", en: "to forget" },
      { pl: "pilnować", en: "to watch over" },
    ],
    verbNote:
      "Any verb that normally takes the accusative switches to the genitive when negated: Mam kota → Nie mam kota.",
    nounEndings: [
      {
        category: "Masc. animate (sing.)",
        ending: "-a",
        example: "kota, brata",
      },
      {
        category: "Masc. inanimate (sing.)",
        ending: "-a or -u (learn per noun)",
        example: "stołu, chleba",
      },
      {
        category: "Feminine (sing.)",
        ending: "-y / -i",
        example: "kobiety, książki, pani",
      },
      {
        category: "Neuter (sing.)",
        ending: "-a",
        example: "dziecka, mieszkania",
      },
      {
        category: "Masculine (plural)",
        ending: "-ów / -i / -y",
        example: "kotów, studentów, gości",
      },
      {
        category: "Fem. / Neut. (plural)",
        ending: "no ending (often + inserted e) / -i",
        example: "kobiet, książek, rzeczy",
      },
    ],
    adjectiveEndings: [
      { category: "Masc. & Neut. (sing.)", ending: "-ego", example: "dobrego" },
      { category: "Feminine (sing.)", ending: "-ej", example: "dobrej" },
      {
        category: "Plural — all genders",
        ending: "-ych / -ich",
        example: "dobrych, tanich",
      },
    ],
    examples: [
      { pl: "Nie mam [czasu].", en: "I don't have time." },
      {
        pl: "To jest samochód [mojego brata].",
        en: "This is my brother's car.",
      },
      { pl: "Idę do [sklepu].", en: "I'm going to the shop." },
      { pl: "Piję kawę bez [cukru].", en: "I drink coffee without sugar." },
      { pl: "Szukam [kluczy].", en: "I'm looking for my keys." },
      { pl: "Mam pięć [kotów].", en: "I have five cats." },
    ],
    frames: [
      { pl: "Nie ma ___.", en: "There is no ___.", example: "Nie ma kota." },
      {
        pl: "Szukam ___.",
        en: "I'm looking for ___.",
        example: "Szukam książki.",
      },
    ],
  },
  {
    abbr: "dat",
    pl: "Celownik",
    en: "Dative",
    questions: [
      { pl: "Komu?", en: "To whom?" },
      { pl: "Czemu?", en: "To what?" },
    ],
    description:
      "Marks the indirect object — the receiver of an action, usually the person something is given, told, shown, or done for. Answers “to / for whom?”",
    prepositions: [
      { pl: "dzięki", en: "thanks to" },
      { pl: "przeciwko / przeciw", en: "against" },
      { pl: "wbrew", en: "contrary to" },
      { pl: "ku", en: "towards (formal)" },
    ],
    prepositionNote:
      "The shortest preposition list of all the cases — the dative rarely follows a preposition.",
    verbs: [
      { pl: "dawać / dać", en: "to give" },
      { pl: "mówić", en: "to tell" },
      { pl: "pomagać", en: "to help" },
      { pl: "dziękować", en: "to thank" },
      { pl: "wierzyć", en: "to believe" },
      { pl: "ufać", en: "to trust" },
      { pl: "radzić", en: "to advise" },
      { pl: "pokazywać", en: "to show" },
      { pl: "przeszkadzać", en: "to bother" },
      { pl: "podobać się", en: "to be pleasing to (“like”)" },
    ],
    nounEndings: [
      {
        category: "Masculine (sing.)",
        ending: "-owi (most nouns)",
        example: "studentowi, Adamowi",
      },
      {
        category: "Masculine (sing.), common set",
        ending: "-u (a few frequent nouns)",
        example: "psu, kotu, bratu, ojcu, panu",
      },
      {
        category: "Feminine (sing.)",
        ending: "-e (+ softening) / -i",
        example: "kobiecie, Polsce, pani",
      },
      {
        category: "Neuter (sing.)",
        ending: "-u",
        example: "dziecku, mieszkaniu",
      },
      {
        category: "Plural — all genders",
        ending: "-om (very regular!)",
        example: "kotom, kobietom, dzieciom",
      },
    ],
    adjectiveEndings: [
      { category: "Masc. & Neut. (sing.)", ending: "-emu", example: "dobremu" },
      { category: "Feminine (sing.)", ending: "-ej", example: "dobrej" },
      {
        category: "Plural — all genders",
        ending: "-ym / -im",
        example: "dobrym, tanim",
      },
    ],
    examples: [
      { pl: "Daję prezent [mamie].", en: "I'm giving mom a present." },
      {
        pl: "Pomagam [młodszemu bratu].",
        en: "I'm helping my younger brother.",
      },
      { pl: "Dziękuję [panu]!", en: "Thank you, sir!" },
      {
        pl: "Ten film podoba się [dzieciom].",
        en: "The children like this film.",
      },
      { pl: "Nie ufam [temu człowiekowi].", en: "I don't trust that man." },
      {
        pl: "Dzięki [tobie] zdałem egzamin.",
        en: "Thanks to you, I passed the exam.",
      },
    ],
    frames: [
      { pl: "Pomagam ___.", en: "I'm helping ___.", example: "Pomagam bratu." },
      {
        pl: "Daję prezent ___.",
        en: "I'm giving a present to ___.",
        example: "Daję prezent kobiecie.",
      },
    ],
  },
  {
    abbr: "acc",
    pl: "Biernik",
    en: "Accusative",
    questions: [
      { pl: "Kogo?", en: "Whom?" },
      { pl: "Co?", en: "What?" },
    ],
    description:
      "Marks the direct object — the thing or person directly receiving the action of most everyday verbs (having, liking, reading, buying…). Also used after several prepositions to show motion “into / onto” something, and in set time phrases.",
    prepositions: [
      { pl: "na", en: "onto, for (motion / purpose)" },
      { pl: "w", en: "into; on (days: w sobotę)" },
      { pl: "przez", en: "through; for (duration)" },
      { pl: "o", en: "for (prosić o, pytać o)" },
      { pl: "za", en: "in exchange for; in (time: za tydzień)" },
      { pl: "po", en: "to fetch (iść po chleb)" },
    ],
    prepositionNote:
      "Several of these (na, w, za, o, po) take other cases when they describe a fixed location rather than motion. Accusative = motion into / onto something.",
    verbs: [
      { pl: "mieć", en: "to have" },
      { pl: "lubić", en: "to like" },
      { pl: "kochać", en: "to love" },
      { pl: "czytać", en: "to read" },
      { pl: "pisać", en: "to write" },
      { pl: "jeść", en: "to eat" },
      { pl: "pić", en: "to drink" },
      { pl: "oglądać", en: "to watch" },
      { pl: "kupować", en: "to buy" },
      { pl: "widzieć", en: "to see" },
      { pl: "znać", en: "to know [sb/sth]" },
      { pl: "czekać na", en: "to wait for" },
    ],
    verbNote:
      "When these verbs are negated, the object switches to the genitive: Widzę kota → Nie widzę kota.",
    nounEndings: [
      {
        category: "Masc. inanimate (sing.)",
        ending: "= nominative (no change)",
        example: "Mam dom.",
      },
      {
        category: "Masc. animate (sing.)",
        ending: "= genitive (-a)",
        example: "Mam kota, brata.",
      },
      {
        category: "Feminine (sing.)",
        ending: "-ę (most) / -ą (pani) / unchanged if consonant-final",
        example: "kobietę, mamę / panią / noc",
      },
      {
        category: "Neuter (sing.)",
        ending: "= nominative (no change)",
        example: "Mam dziecko.",
      },
      {
        category: "Masc. personal (plural)",
        ending: "= genitive plural",
        example: "Widzę studentów.",
      },
      {
        category: "Everything else (plural)",
        ending: "= nominative plural",
        example: "Mam koty, kobiety, dzieci.",
      },
    ],
    adjectiveEndings: [
      {
        category: "Masc. inanimate (sing.)",
        ending: "= nominative",
        example: "dobry",
      },
      {
        category: "Masc. animate (sing.)",
        ending: "= genitive (-ego)",
        example: "dobrego",
      },
      { category: "Feminine (sing.)", ending: "-ą", example: "dobrą" },
      { category: "Neuter (sing.)", ending: "= nominative", example: "dobre" },
      {
        category: "Masc. personal (plural)",
        ending: "= genitive plural",
        example: "dobrych",
      },
      {
        category: "Everything else (plural)",
        ending: "= nominative plural",
        example: "dobre",
      },
    ],
    examples: [
      { pl: "Mam [psa].", en: "I have a dog." },
      {
        pl: "Czytam [ciekawą książkę].",
        en: "I'm reading an interesting book.",
      },
      { pl: "Kocham [moją mamę].", en: "I love my mom." },
      { pl: "Widzę [nowego studenta].", en: "I see the new student." },
      { pl: "Idę na [pocztę].", en: "I'm going to the post office." },
      {
        pl: "W [sobotę] jadę do Gdańska.",
        en: "On Saturday I'm going to Gdańsk.",
      },
    ],
    frames: [
      { pl: "Mam ___.", en: "I have ___.", example: "Mam kota." },
      { pl: "Lubię ___.", en: "I like ___.", example: "Lubię kawę." },
    ],
  },
  {
    abbr: "ins",
    pl: "Narzędnik",
    en: "Instrumental",
    questions: [
      { pl: "(Z) kim?", en: "(With) whom?" },
      { pl: "(Z) czym?", en: "(With) what?" },
    ],
    description:
      "Shows the means or instrument used to do something (“by / with”), accompaniment (with z = “together with”), and profession or role after być (to be) — “Jestem nauczycielem” (I am a teacher).",
    prepositions: [
      { pl: "z / ze", en: "with, together with" },
      { pl: "nad", en: "above, over" },
      { pl: "pod", en: "under, below" },
      { pl: "za", en: "behind" },
      { pl: "przed", en: "in front of, before" },
      { pl: "między", en: "between, among" },
    ],
    prepositionNote:
      "nad / pod / za / przed / między take the instrumental for a fixed location, but the accusative when describing motion toward that spot.",
    verbs: [
      { pl: "być", en: "to be (role / profession)" },
      { pl: "zostać", en: "to become" },
      { pl: "interesować się", en: "to be interested in" },
      { pl: "zajmować się", en: "to deal with" },
      { pl: "opiekować się", en: "to take care of" },
      { pl: "cieszyć się", en: "to be happy about" },
      { pl: "kierować", en: "to manage, direct" },
      { pl: "rządzić", en: "to rule, govern" },
    ],
    nounEndings: [
      {
        category: "Masculine (sing.)",
        ending: "-em / -iem (after k, g)",
        example: "kotem, bratem, nauczycielem",
      },
      { category: "Feminine (sing.)", ending: "-ą", example: "kobietą, mamą" },
      {
        category: "Neuter (sing.)",
        ending: "-em / -iem (after k, g)",
        example: "mieszkaniem, dzieckiem",
      },
      {
        category: "Plural — all genders",
        ending: "-ami (mostly) / -mi (a few)",
        example: "kotami, kobietami / dziećmi",
      },
    ],
    adjectiveEndings: [
      {
        category: "Masc. & Neut. (sing.)",
        ending: "-ym / -im",
        example: "dobrym, tanim",
      },
      { category: "Feminine (sing.)", ending: "-ą", example: "dobrą" },
      {
        category: "Plural — all genders",
        ending: "-ymi / -imi",
        example: "dobrymi, tanimi",
      },
    ],
    examples: [
      { pl: "Jestem [nauczycielem].", en: "I'm a teacher." },
      {
        pl: "Idę do kina z [przyjaciółką].",
        en: "I'm going to the cinema with my friend.",
      },
      { pl: "Piszę [długopisem].", en: "I'm writing with a pen." },
      {
        pl: "Kot śpi pod [stołem].",
        en: "The cat is sleeping under the table.",
      },
      {
        pl: "Interesuję się [polską historią].",
        en: "I'm interested in Polish history.",
      },
      { pl: "Jadę do pracy [autobusem].", en: "I go to work by bus." },
    ],
    frames: [
      { pl: "Idę z ___.", en: "I'm going with ___.", example: "Idę z bratem." },
      {
        pl: "Jestem ___.",
        en: "I am [a/an] ___. (profession / role)",
        example: "Jestem nauczycielem.",
      },
    ],
  },
  {
    abbr: "loc",
    pl: "Miejscownik",
    en: "Locative",
    questions: [
      { pl: "O kim?", en: "About whom?" },
      { pl: "O czym?", en: "About what?" },
      { pl: "Gdzie?", en: "Where? (with w / na)" },
    ],
    description:
      "The one case that NEVER stands alone — it only ever appears after a preposition. Used for fixed location (“in / at / on” with w and na) and topic (“about” with o).",
    prepositions: [
      { pl: "w / we", en: "in" },
      { pl: "na", en: "on, at" },
      { pl: "o", en: "about" },
      { pl: "po", en: "after; around (po mieście)" },
      { pl: "przy", en: "by, near, at" },
    ],
    prepositionNote:
      "w and na take the accusative instead when they describe motion (“into / onto”) rather than a fixed location.",
    verbs: [],
    verbNote:
      "No verbs govern this case directly — it's entirely preposition-driven. Common combos: mówić o (talk about), myśleć o (think about), marzyć o (dream about), pracować w / na (work in / at).",
    nounEndings: [
      {
        category: "Masculine (sing.)",
        ending: "-e (+ softening) / -u",
        example: "bracie, studencie / domu, synu",
      },
      {
        category: "Feminine (sing.)",
        ending: "-e (+ softening) / -i",
        example: "kobiecie, Polsce / pani",
      },
      {
        category: "Neuter (sing.)",
        ending: "-e (+ softening) / -u",
        example: "oknie, mieście / dziecku, mieszkaniu",
      },
      {
        category: "Plural — all genders",
        ending: "-ach (very regular!)",
        example: "kotach, kobietach, dzieciach",
      },
    ],
    adjectiveEndings: [
      {
        category: "Masc. & Neut. (sing.)",
        ending: "-ym / -im",
        example: "dobrym, tanim",
      },
      { category: "Feminine (sing.)", ending: "-ej", example: "dobrej" },
      {
        category: "Plural — all genders",
        ending: "-ych / -ich",
        example: "dobrych, tanich",
      },
    ],
    examples: [
      { pl: "Mieszkam w [Warszawie].", en: "I live in Warsaw." },
      { pl: "Książka jest na [stole].", en: "The book is on the table." },
      { pl: "Myślę o [tobie].", en: "I'm thinking about you." },
      {
        pl: "Rozmawiamy o [nowym filmie].",
        en: "We're talking about the new film.",
      },
      {
        pl: "Po [obiedzie] idziemy na spacer.",
        en: "After lunch we're going for a walk.",
      },
      { pl: "Pracuję w [dużej firmie].", en: "I work at a big company." },
    ],
    frames: [
      {
        pl: "Myślę o ___.",
        en: "I'm thinking about ___.",
        example: "Myślę o tobie.",
      },
      {
        pl: "Jestem w ___.",
        en: "I am in / at ___.",
        example: "Jestem w domu.",
      },
    ],
  },
  {
    abbr: "voc",
    pl: "Wołacz",
    en: "Vocative",
    questions: [{ pl: "Hej!", en: "no question word — direct address" }],
    description:
      "Used only when directly calling out to or addressing someone — names, titles, terms of endearment. Not connected to any verb or preposition; it just marks “I'm speaking TO you right now.” In casual speech many people use the nominative for first names instead.",
    prepositions: [],
    prepositionNote:
      "None — the vocative stands alone, often with an interjection (ej, halo, o).",
    verbs: [],
    verbNote: "None — it isn't a verb's object; it's purely a form of address.",
    nounEndings: [
      {
        category: "Masculine (sing.)",
        ending: "-e (+ softening) / -u (soft & velar stems)",
        example: "bracie!, Piotrze!, panie! / Tomku!, synu!",
      },
      {
        category: "Feminine (sing.)",
        ending: "-o / -u (names in -ia, -sia) / -i (unchanged)",
        example: "mamo!, kobieto! / Kasiu! / pani!",
      },
      {
        category: "Neuter (sing.)",
        ending: "= nominative (no change)",
        example: "dziecko!, kochanie!",
      },
      {
        category: "Plural — all genders",
        ending: "= nominative plural (no change)",
        example: "dzieci!, studenci!",
      },
    ],
    adjectiveEndings: [
      {
        category: "All genders & numbers",
        ending: "= nominative (no separate vocative form)",
        example: "dobry! dobra! dobre!",
      },
    ],
    examples: [
      { pl: "[Mamo], gdzie są moje klucze?", en: "Mom, where are my keys?" },
      {
        pl: "Dzień dobry, [panie profesorze]!",
        en: "Good morning, professor!",
      },
      { pl: "[Piotrze], chodź tutaj!", en: "Piotr, come here!" },
      { pl: "Cześć, [Kasiu]!", en: "Hi, Kasia!" },
      {
        pl: "[Drogi przyjacielu], dziękuję za pomoc.",
        en: "Dear friend, thank you for your help.",
      },
    ],
    frames: [
      { pl: "Cześć, ___!", en: "Hi, ___!", example: "Cześć, Piotrze!" },
      {
        pl: "___, chodź tutaj!",
        en: "___, come here!",
        example: "Mamo, chodź tutaj!",
      },
    ],
  },
];
