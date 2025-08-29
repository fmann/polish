import { CustomWord } from "../types";

export interface ParsedCSVResult {
  words: CustomWord[];
  errors: string[];
  totalRows: number;
  successfulRows: number;
}

/**
 * Parse Google Translate CSV format
 * Format: sourceLanguage,targetLanguage,sourceText,targetText
 */
export const parseGoogleTranslateCSV = (
  csvContent: string
): ParsedCSVResult => {
  const result: ParsedCSVResult = {
    words: [],
    errors: [],
    totalRows: 0,
    successfulRows: 0,
  };

  try {
    // Split into lines and remove empty lines
    const lines = csvContent.split("\n").filter((line) => line.trim());
    result.totalRows = lines.length;

    lines.forEach((line, index) => {
      try {
        // Simple CSV parsing - split by comma but handle quoted values
        const columns = parseCSVLine(line);

        if (columns.length < 4) {
          result.errors.push(
            `Row ${index + 1}: Not enough columns (expected 4, got ${
              columns.length
            })`
          );
          return;
        }

        const sourceLanguage = columns[0].trim();
        const targetLanguage = columns[1].trim();
        const sourceText = columns[2].trim();
        const targetText = columns[3].trim();

        if (!sourceText || !targetText) {
          result.errors.push(`Row ${index + 1}: Empty source or target text`);
          return;
        }

        // Determine which is Polish and which is English
        let polish = "";
        let english = "";

        if (
          sourceLanguage.toLowerCase().includes("polish") ||
          sourceLanguage.toLowerCase().includes("pol")
        ) {
          polish = sourceText;
          english = targetText;
        } else if (
          targetLanguage.toLowerCase().includes("polish") ||
          targetLanguage.toLowerCase().includes("pol")
        ) {
          polish = targetText;
          english = sourceText;
        } else if (
          sourceLanguage.toLowerCase().includes("english") ||
          sourceLanguage.toLowerCase().includes("eng")
        ) {
          english = sourceText;
          polish = targetText;
        } else if (
          targetLanguage.toLowerCase().includes("english") ||
          targetLanguage.toLowerCase().includes("eng")
        ) {
          english = targetText;
          polish = sourceText;
        } else {
          // Fallback: assume source is Polish if we can't determine
          result.errors.push(
            `Row ${
              index + 1
            }: Could not determine Polish/English languages, assuming source is Polish`
          );
          polish = sourceText;
          english = targetText;
        }

        const customWord: CustomWord = {
          id: index + 1,
          polish: polish.trim(),
          english: english.trim(),
          sourceLanguage,
          targetLanguage,
        };

        result.words.push(customWord);
        result.successfulRows++;
      } catch (error) {
        result.errors.push(
          `Row ${index + 1}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    });
  } catch (error) {
    result.errors.push(
      `Failed to parse CSV: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

  return result;
};

/**
 * Simple CSV line parser that handles quoted values
 */
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
};

/**
 * Save custom words to localStorage
 */
export const saveCustomWords = (words: CustomWord[]): void => {
  try {
    localStorage.setItem("customWords", JSON.stringify(words));
  } catch (error) {
    console.error("Failed to save custom words to localStorage:", error);
    throw new Error("Failed to save words. Storage might be full.");
  }
};

/**
 * Load custom words from localStorage
 */
export const loadCustomWords = (): CustomWord[] => {
  try {
    const stored = localStorage.getItem("customWords");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load custom words from localStorage:", error);
    return [];
  }
};

/**
 * Clear custom words from localStorage
 */
export const clearCustomWords = (): void => {
  try {
    localStorage.removeItem("customWords");
  } catch (error) {
    console.error("Failed to clear custom words from localStorage:", error);
  }
};
