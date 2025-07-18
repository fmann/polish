import { VocabularyWord } from "../types";

/**
 * Utilities for managing favorite vocabulary words in localStorage
 */

const FAVORITES_KEY = "polish-app-favorites";

/**
 * Get all favorite word IDs from localStorage
 */
export const getFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
};

/**
 * Add a word to favorites
 */
export const addToFavorites = (wordId: number): number[] => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(wordId)) {
      const updatedFavorites = [...favorites, wordId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    return favorites;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return getFavorites();
  }
};

/**
 * Remove a word from favorites
 */
export const removeFromFavorites = (wordId: number): number[] => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== wordId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return getFavorites();
  }
};

/**
 * Toggle favorite status of a word
 */
export const toggleFavorite = (wordId: number): number[] => {
  const favorites = getFavorites();
  if (favorites.includes(wordId)) {
    return removeFromFavorites(wordId);
  } else {
    return addToFavorites(wordId);
  }
};

/**
 * Check if a word is favorited
 */
export const isFavorite = (wordId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(wordId);
};

/**
 * Get favorite words from the vocabulary data
 */
export const getFavoriteWords = (
  vocabularyData: VocabularyWord[]
): VocabularyWord[] => {
  const favoriteIds = getFavorites();
  return vocabularyData.filter((word) => favoriteIds.includes(word.id));
};
