/**
 * Decode Unicode escape sequences in Polish text
 * Handles sequences like \xf3 for ó, \u0119 for ę
 */
export const decodePolishText = (text) => {
  if (!text) return "";

  return (
    text
      // Handle hex escapes like \xf3
      .replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      // Handle unicode escapes like \u0119
      .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
  );
};

/**
 * Shuffle array randomly
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get random items from array
 */
export const getRandomItems = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
