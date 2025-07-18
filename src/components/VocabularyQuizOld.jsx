import React, { useState, useEffect } from "react";
import { useVocabularyData } from "../hooks/useData";
import { decodePolishText, getRandomItems } from "../utils/textUtils";
import { getFavoriteWords, toggleFavorite, isFavorite } from "../utils/favorites";

const VocabularyQuiz = ({ direction, favoriteMode = false }) => {
  const { data, loading, error } = useVocabularyData();
  const [currentItems, setCurrentItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load favorites on mount
  useEffect(() => {
    if (data.length > 0) {
      setFavorites(getFavoriteWords(data));
    }
  }, [data]);

  // Load new set of quiz items
  useEffect(() => {
    if (data.length > 0) {
      let quizItems;
      if (favoriteMode) {
        const favoriteWords = getFavoriteWords(data);
        if (favoriteWords.length === 0) {
          quizItems = [];
        } else {
          // Get all favorites in random order (allow more than 20)
          quizItems = getRandomItems(favoriteWords, favoriteWords.length);
        }
      } else {
        quizItems = getRandomItems(data, 20); // Get 20 random items
      }
      setCurrentItems(quizItems);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  }, [data, favoriteMode]);

  const currentItem = currentItems[currentIndex];
  const isPolishToEnglish = direction === "polish-to-english";

  const handleToggleFavorite = () => {
    if (currentItem) {
      const updatedFavoriteIds = toggleFavorite(currentItem.id);
      const updatedFavorites = data.filter(word => updatedFavoriteIds.includes(word.id));
      setFavorites(updatedFavorites);
      
      // If we're in favorite mode and this was the last favorite, update items
      if (favoriteMode && !isFavorite(currentItem.id)) {
        const remainingFavorites = getFavoriteWords(data);
        if (remainingFavorites.length === 0) {
          setCurrentItems([]);
        } else {
          // Remove this item from current items
          const updatedItems = currentItems.filter(item => item.id !== currentItem.id);
          setCurrentItems(updatedItems);
          if (currentIndex >= updatedItems.length && updatedItems.length > 0) {
            setCurrentIndex(updatedItems.length - 1);
          }
        }
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < currentItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Restart with new random items
      let quizItems;
      if (favoriteMode) {
        const favoriteWords = getFavoriteWords(data);
        quizItems = favoriteWords.length > 0 ? getRandomItems(favoriteWords, favoriteWords.length) : [];
      } else {
        quizItems = getRandomItems(data, 20);
      }
      setCurrentItems(quizItems);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  // Derive values from current item
  const questionText = currentItem 
    ? (isPolishToEnglish ? decodePolishText(currentItem.word) : currentItem.translation)
    : "";
  const answerText = currentItem 
    ? (isPolishToEnglish ? currentItem.translation : decodePolishText(currentItem.word))
    : "";
  const polishExample = currentItem ? decodePolishText(currentItem.exampleSentence) : "";
  const englishExample = currentItem ? currentItem.exampleSentenceTranslate : "";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-card text-center">
        <div className="text-red-600">
          <p className="font-medium">Error loading vocabulary data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    if (favoriteMode && currentItems.length === 0) {
      return (
        <div className="quiz-card text-center">
          <div className="space-y-4">
            <div className="text-6xl">⭐</div>
            <div>
              <p className="text-gray-600 font-medium">No favorite words yet!</p>
              <p className="text-sm text-gray-500 mt-2">
                Start by marking some vocabulary words as favorites using the star icon, 
                then come back here to practice them.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="quiz-card text-center">
        <p className="text-gray-600">No vocabulary data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} of {currentItems.length}
        </span>
        <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {currentItem.category}
        </span>
      </div>

      <div className="quiz-card text-center min-h-[300px] flex flex-col justify-center relative">
        {/* Star icon for favorites */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-4 left-4 text-2xl transition-colors ${
            isFavorite(currentItem.id) 
              ? 'text-yellow-400 hover:text-yellow-500' 
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          title={isFavorite(currentItem.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          ⭐
        </button>
        
        <div className="mb-8">
          <h2 className="text-sm text-gray-500 mb-2">
            {isPolishToEnglish ? "Polish Word" : "English Word"}
          </h2>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            {questionText}
          </p>
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="reveal-button mx-auto"
          >
            Reveal Answer
          </button>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">
                {isPolishToEnglish
                  ? "English Translation"
                  : "Polish Translation"}
              </h3>
              <p className="text-2xl font-semibold text-green-700 mb-6">
                {answerText}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm text-gray-500 mb-3">Example Usage</h3>
              <div className="space-y-2">
                <p className="polish-text">🇵🇱 {polishExample}</p>
                <p className="english-text">🇺🇸 {englishExample}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="nav-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="text-center text-sm text-gray-600">
          {currentIndex === currentItems.length - 1 ? (
            <span className="text-blue-600 font-medium">
              Next will restart with new words
            </span>
          ) : (
            <span>
              Progress:{" "}
              {Math.round(((currentIndex + 1) / currentItems.length) * 100)}%
            </span>
          )}
        </div>

        <button onClick={handleNext} className="nav-button">
          {currentIndex === currentItems.length - 1 ? "New Set" : "Next"} →
        </button>
      </div>
    </div>
  );
};

export default VocabularyQuiz;
