import { unzipSync } from "fflate";
import { decompress } from "fzstd";
import type { Database, SqlJsStatic } from "sql.js";

/**
 * Import Anki .apkg decks and store them in localStorage.
 *
 * An .apkg is a zip holding a SQLite collection. Newer exports store it
 * zstd-compressed as collection.anki21b, leaving collection.anki2 as a stub
 * that only says "please update Anki"; older exports use the plain files.
 */

export interface DeckCard {
  id: number;
  front: string;
  back: string;
}

export interface Deck {
  name: string;
  importedAt: string;
  cards: DeckCard[];
}

const DECK_KEY = "polish-app-deck";
const FIELD_SEPARATOR = "\x1f";

/**
 * Convert Anki field HTML to plain text, keeping line breaks
 */
export const ankiHtmlToText = (html: string): string =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(div|p|li)[^>]*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/**
 * Pull the SQLite collection bytes out of an unzipped .apkg
 */
const getCollectionBytes = (files: Record<string, Uint8Array>): Uint8Array => {
  if (files["collection.anki21b"]) {
    return decompress(files["collection.anki21b"]);
  }
  const legacy = files["collection.anki21"] ?? files["collection.anki2"];
  if (!legacy) {
    throw new Error("This file doesn't look like an Anki deck (.apkg)");
  }
  return legacy;
};

/**
 * Name of the deck the cards belong to, or null if it's Anki's "Default"
 * deck or the collection predates the decks table
 */
const getDeckName = (db: Database): string | null => {
  try {
    const result = db.exec(
      "SELECT name FROM decks WHERE id IN (SELECT did FROM cards) LIMIT 1"
    );
    const name = String(result[0]?.values[0]?.[0] ?? "").replace(/\x1f/g, "::");
    return name && name !== "Default" ? name : null;
  } catch {
    return null;
  }
};

/**
 * Read the cards from an .apkg file. Uses the first field of each note as
 * the front and the second as the back.
 */
export const parseApkg = (
  apkg: Uint8Array,
  SQL: SqlJsStatic,
  fallbackName: string
): Deck => {
  const db = new SQL.Database(getCollectionBytes(unzipSync(apkg)));
  try {
    const result = db.exec("SELECT id, flds FROM notes");
    const rows = result[0]?.values ?? [];

    const cards: DeckCard[] = [];
    for (const [id, flds] of rows) {
      const [front = "", back = ""] = String(flds)
        .split(FIELD_SEPARATOR)
        .map(ankiHtmlToText);
      if (front) {
        cards.push({ id: Number(id), front, back });
      }
    }

    if (
      cards.length === 1 &&
      cards[0].front.startsWith("Please update to the latest Anki version")
    ) {
      throw new Error("This deck format isn't supported. Try exporting again.");
    }
    if (cards.length === 0) {
      throw new Error("No cards found in this deck");
    }

    return {
      name: getDeckName(db) ?? fallbackName,
      importedAt: new Date().toISOString(),
      cards,
    };
  } finally {
    db.close();
  }
};

/**
 * Load sql.js on demand and import an .apkg file chosen by the user
 */
export const importApkgFile = async (
  file: File,
  wasmUrl: string
): Promise<Deck> => {
  const { default: initSqlJs } = await import("sql.js");
  const SQL = await initSqlJs({ locateFile: () => wasmUrl });
  const bytes = new Uint8Array(await file.arrayBuffer());
  return parseApkg(bytes, SQL, file.name.replace(/\.apkg$/i, ""));
};

export const loadDeck = (): Deck | null => {
  try {
    const deck = localStorage.getItem(DECK_KEY);
    return deck ? JSON.parse(deck) : null;
  } catch (error) {
    console.error("Error reading deck from localStorage:", error);
    return null;
  }
};

export const saveDeck = (deck: Deck): void => {
  localStorage.setItem(DECK_KEY, JSON.stringify(deck));
};

export const clearDeck = (): void => {
  localStorage.removeItem(DECK_KEY);
};
