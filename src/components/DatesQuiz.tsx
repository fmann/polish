import React, { useState, useCallback } from "react";
import { sampleDates, DateItem } from "../data/dates";
import { useAutoSpeech } from "../hooks/useAutoSpeech";
import SpeechButton from "./SpeechButton";

const DatesQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [dates] = useState<DateItem[]>(sampleDates);

  const currentDate = dates[currentIndex];

  // Automatically speak the Polish date when it first appears
  useAutoSpeech({
    text: currentDate?.polish || "",
    enabled: !!currentDate && !isRevealed,
    language: "pl-PL",
  });

  const handleNext = useCallback((): void => {
    setCurrentIndex((prev) => (prev + 1) % dates.length);
    setIsRevealed(false);
  }, [dates.length]);

  const handlePrevious = useCallback((): void => {
    setCurrentIndex((prev) => (prev - 1 + dates.length) % dates.length);
    setIsRevealed(false);
  }, [dates.length]);

  const handleReveal = useCallback((): void => {
    setIsRevealed(true);
  }, []);

  const handleCardClick = useCallback((): void => {
    if (!isRevealed) {
      handleReveal();
    }
  }, [isRevealed, handleReveal]);

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
      }
    },
    [isRevealed, handleReveal, handleNext, handlePrevious]
  );

  if (!currentDate) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No dates available</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="application"
      aria-label="Polish dates quiz"
    >
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 mt-2">
          {currentIndex + 1} of {dates.length}
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
            ? `Polish date: ${currentDate.polish}, English: ${currentDate.english}`
            : `Polish date: ${currentDate.polish}. Click to reveal English translation.`
        }
      >
        <div className="text-center">
          {/* Polish date */}
          <div className="mb-6">
            <h3 className="text-lg text-gray-600 mb-2">Polish Date</h3>
            <div className="flex items-center justify-center">
              <p className="text-3xl font-bold">{currentDate.polish}</p>
              <SpeechButton
                text={currentDate.polish}
                language="pl-PL"
                className="ml-3 text-2xl"
              />
            </div>
          </div>

          {/* Reveal/English section */}
          {!isRevealed ? (
            <div className="py-8">
              <button onClick={handleReveal} className="reveal-button mx-auto">
                Reveal English Translation
              </button>
            </div>
          ) : (
            <div className="border-t pt-6">
              <h3 className="text-lg text-gray-600 mb-2">
                English Translation
              </h3>
              <div className="flex items-center justify-center mb-4">
                <p className="text-2xl font-bold text-green-600">
                  {currentDate.english}
                </p>
                <SpeechButton
                  text={currentDate.english}
                  language="en-US"
                  className="ml-3 text-xl"
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

export default DatesQuiz;
