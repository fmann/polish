import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to handle jumping to a specific item in a quiz
 * Reads 'jumpToId' or 'jumpTo' parameter from URL and provides functionality to jump to that item
 */
export const useQuizNavigation = (
  allData: any[], // Full dataset to search for items by ID
  currentItems: any[], // Current quiz items
  setCurrentItems: (items: any[]) => void, // Function to update current items
  setCurrentIndex: (index: number) => void,
  setShowAnswer: (show: boolean) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const jumpToIdParam = searchParams.get("jumpToId");
    const jumpToParam = searchParams.get("jumpTo");

    if (currentItems.length > 0) {
      let targetIndex = -1;

      // First try to find by ID (more reliable)
      if (jumpToIdParam) {
        const targetId = parseInt(jumpToIdParam, 10);

        // Check if item already exists in current items
        targetIndex = currentItems.findIndex((item) => item.id === targetId);

        // If not found in current items, try to add it from full dataset
        if (targetIndex === -1 && allData.length > 0) {
          const targetItem = allData.find((item) => item.id === targetId);
          if (targetItem) {
            // Add the target item to the beginning of current items
            const newItems = [
              targetItem,
              ...currentItems.slice(0, Math.min(currentItems.length - 1, 19)),
            ];
            setCurrentItems(newItems);
            targetIndex = 0; // Item is now at index 0
          }
        }
      }

      // Fallback to index-based navigation (for current items only)
      if (targetIndex === -1 && jumpToParam) {
        const jumpToIndex = parseInt(jumpToParam, 10);
        if (jumpToIndex >= 0 && jumpToIndex < currentItems.length) {
          targetIndex = jumpToIndex;
        }
      }

      // If we found a valid target, navigate to it
      if (targetIndex >= 0) {
        setCurrentIndex(targetIndex);
        setShowAnswer(false);

        // Clear the navigation parameters from URL
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("jumpToId");
        newSearchParams.delete("jumpTo");
        setSearchParams(newSearchParams, { replace: true });
      }
    }
  }, [
    allData,
    currentItems,
    searchParams,
    setCurrentIndex,
    setShowAnswer,
    setSearchParams,
    setCurrentItems,
  ]);

  return {
    // This hook primarily handles side effects, no return values needed for now
  };
};

/**
 * Simpler version for static quiz data (numbers, dates) that don't change
 */
export const useSimpleQuizNavigation = (
  items: any[],
  setCurrentIndex: (index: number) => void,
  setShowAnswer: (show: boolean) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const jumpToIdParam = searchParams.get("jumpToId");
    const jumpToParam = searchParams.get("jumpTo");

    if (items.length > 0) {
      let targetIndex = -1;

      // First try to find by ID (more reliable)
      if (jumpToIdParam) {
        const targetId = parseInt(jumpToIdParam, 10);
        targetIndex = items.findIndex((item) => item.id === targetId);
      }

      // Fallback to index-based navigation
      if (targetIndex === -1 && jumpToParam) {
        const jumpToIndex = parseInt(jumpToParam, 10);
        if (jumpToIndex >= 0 && jumpToIndex < items.length) {
          targetIndex = jumpToIndex;
        }
      }

      // If we found a valid target, navigate to it
      if (targetIndex >= 0) {
        setCurrentIndex(targetIndex);
        setShowAnswer(false);

        // Clear the navigation parameters from URL
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("jumpToId");
        newSearchParams.delete("jumpTo");
        setSearchParams(newSearchParams, { replace: true });
      }
    }
  }, [items, searchParams, setCurrentIndex, setShowAnswer, setSearchParams]);

  return {
    // This hook primarily handles side effects, no return values needed for now
  };
};
