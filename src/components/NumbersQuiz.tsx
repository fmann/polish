import React, { useState, useCallback } from "react";
import { polishNumbers, NumberItem } from "../data/numbers";
import { shuffleArray } from "../utils/textUtils";
import { useAutoSpeech } from "../hooks/useAutoSpeech";
import SpeechButton from "./SpeechButton";

const NumbersQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showAsDigits, setShowAsDigits] = useState<boolean>(true);
  const [numbers] = useState<NumberItem[]>(() => shuffleArray(polishNumbers));

  const currentNumber = numbers[currentIndex];

  // Calculate what text should be automatically spoken
  const autoSpeechText = (() => {
    if (!currentNumber) return "";

    // Speak Polish if showing Polish text initially (not digits)
    if (!showAsDigits && !isRevealed) {
      return currentNumber.polish;
    }
    // Or speak Polish when revealed and showing Polish translation
    else if (isRevealed && showAsDigits) {
      return currentNumber.polish;
    }

    return "";
  })();

  // Use the auto-speech hook
  useAutoSpeech({
    text: autoSpeechText,
    enabled: !!autoSpeechText,
    language: "pl-PL",
    rate: 0.8,
    delay: 300,
  });

  const handleNext = useCallback((): void => {
    setCurrentIndex((prev) => (prev + 1) % numbers.length);
    setIsRevealed(false);
  }, [numbers.length]);

  const handlePrevious = useCallback((): void => {
    setCurrentIndex((prev) => (prev - 1 + numbers.length) % numbers.length);
    setIsRevealed(false);
  }, [numbers.length]);

  const handleReveal = useCallback((): void => {
    setIsRevealed(true);
  }, []);

  const handleCardClick = useCallback((): void => {
    if (!isRevealed) {
      handleReveal();
    }
  }, [isRevealed, handleReveal]);

  const toggleDisplayMode = useCallback((): void => {
    setShowAsDigits(!showAsDigits);
  }, [showAsDigits]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (!isRevealed) {
          handleReveal();
        } else {
          handleNext();
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "t" || event.key === "T") {
        event.preventDefault();
        toggleDisplayMode();
      }
    },
    [isRevealed, handleReveal, handleNext, handlePrevious, toggleDisplayMode]
  );

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "basic":
        return "bg-blue-100 text-blue-800";
      case "tens":
        return "bg-green-100 text-green-800";
      case "hundreds":
        return "bg-purple-100 text-purple-800";
      case "large":
        return "bg-red-100 text-red-800";
      case "compound":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!currentNumber) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No numbers available</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="application"
      aria-label="Polish numbers quiz"
    >
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 mt-2">
          {currentIndex + 1} of {numbers.length}
        </p>
      </div>

      {/* Main card */}
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg shadow-lg p-8 mb-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-gray-100"
        role="button"
        tabIndex={0}
        aria-label={
          isRevealed
            ? `Number ${currentNumber.number}: Polish: ${currentNumber.polish}, English: ${currentNumber.english}`
            : `Number ${
                showAsDigits ? currentNumber.number : currentNumber.polish
              }. Click to reveal ${
                showAsDigits ? "Polish" : "English"
              } translation.`
        }
      >
        <div className="text-center">
          {/* Category badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                currentNumber.category
              )}`}
            >
              {currentNumber.category}
            </span>
          </div>

          {/* Main number display */}
          <div className="mb-6">
            <h3 className="text-lg text-gray-600 mb-2">
              {showAsDigits ? "Number" : "Polish Number"}
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-4xl font-bold text-blue-600">
                {showAsDigits
                  ? currentNumber.number.toLocaleString()
                  : currentNumber.polish}
              </p>
              {!showAsDigits && (
                <SpeechButton
                  text={currentNumber.polish}
                  language="pl-PL"
                  className="ml-3 text-2xl"
                />
              )}
            </div>
          </div>

          {/* Reveal/Translation section */}
          {!isRevealed ? (
            <div className="py-8">
              <button onClick={handleReveal} className="reveal-button mx-auto">
                Reveal {showAsDigits ? "Polish" : "English"}
              </button>
            </div>
          ) : (
            <div className="border-t pt-6">
              <h3 className="text-lg text-gray-600 mb-2">
                {showAsDigits ? "Polish" : "English"}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <p className="text-3xl font-bold text-green-600">
                  {showAsDigits ? currentNumber.polish : currentNumber.english}
                </p>
                <SpeechButton
                  text={
                    showAsDigits ? currentNumber.polish : currentNumber.english
                  }
                  language={showAsDigits ? "pl-PL" : "en-US"}
                  className="ml-3 text-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue button (when revealed) */}
      {isRevealed && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
};

export default NumbersQuiz;
