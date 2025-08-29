import {
  VocabularyWord,
  TenseConjugation,
  GrammaticalCase,
  DateItem,
  NumberItem,
} from "../types";
import { loadCustomWords } from "./csvParser";

// Normalize Polish text for searching (remove diacritics and normalize case)
export const normalizePolishText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .trim();
};

// Check if a string contains the search query (handles partial matches and diacritics)
export const matchesQuery = (text: string, query: string): boolean => {
  const normalizedText = normalizePolishText(text);
  const normalizedQuery = normalizePolishText(query);
  return normalizedText.includes(normalizedQuery);
};

export interface SearchResult {
  id: string;
  type: "vocabulary" | "numbers" | "dates" | "mywords" | "tenses" | "cases";
  title: string;
  subtitle: string;
  polishText: string;
  englishText: string;
  path: string;
  itemId?: number; // Use actual item ID instead of array index
  itemIndex?: number; // Keep for backwards compatibility
}

// Search vocabulary words
export const searchVocabulary = (
  data: VocabularyWord[],
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  return data
    .filter(
      (item) =>
        matchesQuery(item.word, query) ||
        matchesQuery(item.translation, query) ||
        matchesQuery(item.exampleSentence, query) ||
        matchesQuery(item.exampleSentenceTranslate, query)
    )
    .slice(0, 10) // Limit results
    .map((item) => ({
      id: `vocab-${item.id}`,
      type: "vocabulary",
      title: item.word,
      subtitle: item.translation,
      polishText: item.word,
      englishText: item.translation,
      path: "/polish-to-english",
      itemId: item.id, // Use the actual vocabulary word ID
      itemIndex: data.findIndex((w) => w.id === item.id),
    }));
};

// Search numbers
export const searchNumbers = (
  data: NumberItem[],
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  return data
    .filter(
      (item) =>
        matchesQuery(item.polish, query) ||
        matchesQuery(item.english, query) ||
        item.number.toString().includes(query.trim())
    )
    .slice(0, 5)
    .map((item) => ({
      id: `number-${item.id}`,
      type: "numbers",
      title: item.polish,
      subtitle: `${item.number} - ${item.english}`,
      polishText: item.polish,
      englishText: item.english,
      path: "/numbers",
      itemId: item.id,
      itemIndex: data.findIndex((n) => n.id === item.id),
    }));
};

// Search dates
export const searchDates = (
  data: DateItem[],
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  return data
    .filter(
      (item) =>
        matchesQuery(item.polish, query) ||
        matchesQuery(item.english, query) ||
        matchesQuery(item.dayOfWeek, query) ||
        matchesQuery(item.month, query)
    )
    .slice(0, 5)
    .map((item) => ({
      id: `date-${item.id}`,
      type: "dates",
      title: item.polish,
      subtitle: item.english,
      polishText: item.polish,
      englishText: item.english,
      path: "/dates",
      itemId: item.id,
      itemIndex: data.findIndex((d) => d.id === item.id),
    }));
};

// Search custom words
export const searchCustomWords = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const customWords = loadCustomWords();
  return customWords
    .filter(
      (item) =>
        matchesQuery(item.polish, query) || matchesQuery(item.english, query)
    )
    .slice(0, 5)
    .map((item) => ({
      id: `custom-${item.id}`,
      type: "mywords",
      title: item.polish,
      subtitle: item.english,
      polishText: item.polish,
      englishText: item.english,
      path: "/my-words",
      itemId: item.id,
      itemIndex: customWords.findIndex((w) => w.id === item.id),
    }));
};

// Search tenses
export const searchTenses = (
  data: TenseConjugation[],
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  data.forEach((item, dataIndex) => {
    // Search through all tense forms
    const tenseKeys = [
      "perfectivePast",
      "imperfectivePast",
      "perfectivePresent",
      "imperfectivePresent",
      "perfectiveFuture",
      "imperfectiveFuture",
    ] as const;

    const englishKeys = [
      "englishPerfectivePast",
      "englishImperfectivePast",
      "englishPerfectivePresent",
      "englishImperfectivePresent",
      "englishPerfectiveFuture",
      "englishImperfectiveFuture",
    ] as const;

    tenseKeys.forEach((key, keyIndex) => {
      const polishForm = item[key];
      const englishForm = item[englishKeys[keyIndex]];

      if (matchesQuery(polishForm, query) || matchesQuery(englishForm, query)) {
        results.push({
          id: `tense-${dataIndex}-${key}`,
          type: "tenses",
          title: polishForm,
          subtitle: `${key
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} - ${englishForm}`,
          polishText: polishForm,
          englishText: englishForm,
          path: "/tenses",
          itemIndex: dataIndex,
        });
      }
    });
  });

  return results.slice(0, 8);
};

// Search cases
export const searchCases = (
  data: GrammaticalCase[],
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  data.forEach((item, dataIndex) => {
    // Search base forms
    const caseKeys = [
      "nominative",
      "genitive",
      "dative",
      "accusative",
      "instrumental",
      "locative",
      "vocative",
    ] as const;

    caseKeys.forEach((caseKey) => {
      const polishForm = item.base[caseKey];
      if (
        matchesQuery(polishForm, query) ||
        matchesQuery(item.translation, query)
      ) {
        results.push({
          id: `case-${dataIndex}-${caseKey}`,
          type: "cases",
          title: polishForm,
          subtitle: `${caseKey} case - ${item.translation}`,
          polishText: polishForm,
          englishText: item.translation,
          path: "/cases",
          itemIndex: dataIndex,
        });
      }
    });

    // Search example sentences
    caseKeys.forEach((caseKey) => {
      const example = item.examples[caseKey];
      if (matchesQuery(example.pl, query) || matchesQuery(example.en, query)) {
        results.push({
          id: `case-example-${dataIndex}-${caseKey}`,
          type: "cases",
          title: example.pl,
          subtitle: `${caseKey} example - ${example.en}`,
          polishText: example.pl,
          englishText: example.en,
          path: "/cases",
          itemIndex: dataIndex,
        });
      }
    });
  });

  return results.slice(0, 8);
};

// Main search function that searches all data types
export const performGlobalSearch = async (
  query: string,
  vocabularyData: VocabularyWord[],
  numbersData: NumberItem[],
  datesData: DateItem[],
  tensesData: TenseConjugation[],
  casesData: GrammaticalCase[]
): Promise<{
  vocabulary: SearchResult[];
  numbers: SearchResult[];
  dates: SearchResult[];
  myWords: SearchResult[];
  tenses: SearchResult[];
  cases: SearchResult[];
  totalResults: number;
}> => {
  if (!query.trim()) {
    return {
      vocabulary: [],
      numbers: [],
      dates: [],
      myWords: [],
      tenses: [],
      cases: [],
      totalResults: 0,
    };
  }

  const vocabulary = searchVocabulary(vocabularyData, query);
  const numbers = searchNumbers(numbersData, query);
  const dates = searchDates(datesData, query);
  const myWords = searchCustomWords(query);
  const tenses = searchTenses(tensesData, query);
  const cases = searchCases(casesData, query);

  const totalResults =
    vocabulary.length +
    numbers.length +
    dates.length +
    myWords.length +
    tenses.length +
    cases.length;

  return {
    vocabulary,
    numbers,
    dates,
    myWords,
    tenses,
    cases,
    totalResults,
  };
};
