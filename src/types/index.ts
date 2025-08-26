// Types for Polish language learning data

export interface VocabularyWord {
  id: number;
  word: string;
  translation: string;
  category: string;
  exampleSentence: string;
  exampleSentenceTranslate: string;
}

export interface TenseConjugation {
  perfectivePast: string;
  imperfectivePast: string;
  perfectivePresent: string;
  imperfectivePresent: string;
  perfectiveFuture: string;
  imperfectiveFuture: string;
  englishPerfectivePast: string;
  englishImperfectivePast: string;
  englishPerfectivePresent: string;
  englishImperfectivePresent: string;
  englishPerfectiveFuture: string;
  englishImperfectiveFuture: string;
}

export interface CaseExample {
  nominative: string;
  genitive: string;
  dative: string;
  accusative: string;
  instrumental: string;
  locative: string;
  vocative: string;
}

export interface CaseExampleSentence {
  pl: string;
  en: string;
}

export interface CaseExamples {
  nominative: CaseExampleSentence;
  genitive: CaseExampleSentence;
  dative: CaseExampleSentence;
  accusative: CaseExampleSentence;
  instrumental: CaseExampleSentence;
  locative: CaseExampleSentence;
  vocative: CaseExampleSentence;
}

export interface GrammaticalCase {
  id: number;
  base: CaseExample;
  translation: string;
  examples: CaseExamples;
}

export interface CaseDescription {
  name: string;
  description: string;
}

export interface DateItem {
  id: number;
  polish: string;
  english: string;
  dayOfWeek: string;
  dayNumber: number;
  month: string;
}

export interface NumberItem {
  id: number;
  number: number;
  polish: string;
  english: string;
  category: string;
}

export type QuizDirection = "polish-to-english" | "english-to-polish";

export type ViewType =
  | "polish-to-english"
  | "english-to-polish"
  | "favorites"
  | "numbers"
  | "dates"
  | "tenses"
  | "cases";

export type TenseKey =
  | "perfectivePast"
  | "imperfectivePast"
  | "perfectivePresent"
  | "imperfectivePresent"
  | "perfectiveFuture"
  | "imperfectiveFuture";

export interface DataHookResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}
