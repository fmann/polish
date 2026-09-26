// Noun and adjective forms for the Case Reference, taken from the przypadki
// declension database.

export type NounGender = "m1" | "m2" | "m3" | "f" | "n";

export interface ReferenceNoun {
  word: string;
  english: string;
  gender: NounGender;
  forms: Record<string, string>;
}

export interface ReferenceAdjective {
  word: string;
  english: string;
  m: Record<string, string>;
  f: Record<string, string>;
  n: Record<string, string>;
  vir_pl: Record<string, string>;
  nvir_pl: Record<string, string>;
}

export const REFERENCE_NOUNS: ReferenceNoun[] = [
  {
    word: "student",
    english: "student",
    gender: "m1",
    forms: {
      nom_sg: "student",
      gen_sg: "studenta",
      dat_sg: "studentowi",
      acc_sg: "studenta",
      ins_sg: "studentem",
      loc_sg: "studencie",
      voc_sg: "studencie",
      nom_pl: "studenci",
      gen_pl: "studentów",
      dat_pl: "studentom",
      acc_pl: "studentów",
      ins_pl: "studentami",
      loc_pl: "studentach",
      voc_pl: "studenci",
    },
  },
  {
    word: "kot",
    english: "cat",
    gender: "m2",
    forms: {
      nom_sg: "kot",
      gen_sg: "kota",
      dat_sg: "kotu",
      acc_sg: "kota",
      ins_sg: "kotem",
      loc_sg: "kocie",
      voc_sg: "kocie",
      nom_pl: "koty",
      gen_pl: "kotów",
      dat_pl: "kotom",
      acc_pl: "koty",
      ins_pl: "kotami",
      loc_pl: "kotach",
      voc_pl: "koty",
    },
  },
  {
    word: "dom",
    english: "house/home",
    gender: "m3",
    forms: {
      nom_sg: "dom",
      gen_sg: "domu",
      dat_sg: "domowi",
      acc_sg: "dom",
      ins_sg: "domem",
      loc_sg: "domu",
      voc_sg: "domu",
      nom_pl: "domy",
      gen_pl: "domów",
      dat_pl: "domom",
      acc_pl: "domy",
      ins_pl: "domami",
      loc_pl: "domach",
      voc_pl: "domy",
    },
  },
  {
    word: "kobieta",
    english: "woman",
    gender: "f",
    forms: {
      nom_sg: "kobieta",
      gen_sg: "kobiety",
      dat_sg: "kobiecie",
      acc_sg: "kobietę",
      ins_sg: "kobietą",
      loc_sg: "kobiecie",
      voc_sg: "kobieto",
      nom_pl: "kobiety",
      gen_pl: "kobiet",
      dat_pl: "kobietom",
      acc_pl: "kobiety",
      ins_pl: "kobietami",
      loc_pl: "kobietach",
      voc_pl: "kobiety",
    },
  },
  {
    word: "dziecko",
    english: "child",
    gender: "n",
    forms: {
      nom_sg: "dziecko",
      gen_sg: "dziecka",
      dat_sg: "dziecku",
      acc_sg: "dziecko",
      ins_sg: "dzieckiem",
      loc_sg: "dziecku",
      voc_sg: "dziecko",
      nom_pl: "dzieci",
      gen_pl: "dzieci",
      dat_pl: "dzieciom",
      acc_pl: "dzieci",
      ins_pl: "dziećmi",
      loc_pl: "dzieciach",
      voc_pl: "dzieci",
    },
  },
];

export const REFERENCE_ADJECTIVES: ReferenceAdjective[] = [
  {
    word: "dobry",
    english: "good",
    m: {
      nom: "dobry",
      gen: "dobrego",
      dat: "dobremu",
      acc_anim: "dobrego",
      acc_inan: "dobry",
      ins: "dobrym",
      loc: "dobrym",
    },
    f: {
      nom: "dobra",
      gen: "dobrej",
      dat: "dobrej",
      acc: "dobrą",
      ins: "dobrą",
      loc: "dobrej",
    },
    n: {
      nom: "dobre",
      gen: "dobrego",
      dat: "dobremu",
      acc: "dobre",
      ins: "dobrym",
      loc: "dobrym",
    },
    vir_pl: {
      nom: "dobrzy",
      gen: "dobrych",
      dat: "dobrym",
      acc: "dobrych",
      ins: "dobrymi",
      loc: "dobrych",
    },
    nvir_pl: {
      nom: "dobre",
      gen: "dobrych",
      dat: "dobrym",
      acc: "dobre",
      ins: "dobrymi",
      loc: "dobrych",
    },
  },
  {
    word: "młody",
    english: "young",
    m: {
      nom: "młody",
      gen: "młodego",
      dat: "młodemu",
      acc_anim: "młodego",
      acc_inan: "młody",
      ins: "młodym",
      loc: "młodym",
    },
    f: {
      nom: "młoda",
      gen: "młodej",
      dat: "młodej",
      acc: "młodą",
      ins: "młodą",
      loc: "młodej",
    },
    n: {
      nom: "młode",
      gen: "młodego",
      dat: "młodemu",
      acc: "młode",
      ins: "młodym",
      loc: "młodym",
    },
    vir_pl: {
      nom: "młodzi",
      gen: "młodych",
      dat: "młodym",
      acc: "młodych",
      ins: "młodymi",
      loc: "młodych",
    },
    nvir_pl: {
      nom: "młode",
      gen: "młodych",
      dat: "młodym",
      acc: "młode",
      ins: "młodymi",
      loc: "młodych",
    },
  },
  {
    word: "tani",
    english: "cheap",
    m: {
      nom: "tani",
      gen: "taniego",
      dat: "taniemu",
      acc_anim: "taniego",
      acc_inan: "tani",
      ins: "tanim",
      loc: "tanim",
    },
    f: {
      nom: "tania",
      gen: "taniej",
      dat: "taniej",
      acc: "tanią",
      ins: "tanią",
      loc: "taniej",
    },
    n: {
      nom: "tanie",
      gen: "taniego",
      dat: "taniemu",
      acc: "tanie",
      ins: "tanim",
      loc: "tanim",
    },
    vir_pl: {
      nom: "tani",
      gen: "tanich",
      dat: "tanim",
      acc: "tanich",
      ins: "tanimi",
      loc: "tanich",
    },
    nvir_pl: {
      nom: "tanie",
      gen: "tanich",
      dat: "tanim",
      acc: "tanie",
      ins: "tanimi",
      loc: "tanich",
    },
  },
];
