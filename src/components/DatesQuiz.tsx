import React, { useState, useCallback, useEffect } from "react";
import { sampleDates, DateItem } from "../data/dates";
import SpeechButton from "./SpeechButton";

const DatesQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [dates] = useState<DateItem[]>(sampleDates);

  const currentDate = dates[currentIndex];

  // Automatically speak the Polish date when it first appears
  useEffect(() => {
    if (currentDate && !isRevealed && 'speechSynthesis' in window) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(currentDate.polish);
        utterance.lang = "pl-PL";
        utterance.rate = 0.8;
        
        // Try to select a better Polish voice (same logic as SpeechButton)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoiceNames = ["Zosia", "Polish", "Maja", "Katarzyna", "pl-PL"];
        
        let selectedVoice = null;
        for (const voiceName of preferredVoiceNames) {
          selectedVoice = voices.find(
            (voice) =>
              voice.name.includes(voiceName) ||
              (voice.lang.includes("pl") && voice.name.includes(voiceName))
          );
          if (selectedVoice) break;
        }
        
        if (!selectedVoice) {
          selectedVoice = voices.find(
            (voice) =>
              voice.lang.includes("pl") &&
              (voice.name.includes("Premium") ||
                voice.name.includes("Enhanced") ||
                voice.name.includes("Neural") ||
                !voice.name.includes("Google"))
          );
        }
        
        if (!selectedVoice) {
          selectedVoice = voices.find((voice) => voice.lang.includes("pl"));
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentDate, isRevealed]);

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📅 Polish Dates
        </h2>
        <p className="text-gray-600">
          Learn Polish date formats - click to reveal translation
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {currentIndex + 1} of {dates.length}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          aria-label="Previous date"
        >
          ← Previous
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Use ← → arrow keys to navigate, Space/Enter to reveal
          </p>
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          aria-label="Next date"
        >
          Next →
        </button>
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
              <p className="text-3xl font-bold text-blue-600">
                {currentDate.polish}
              </p>
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

              {/* Additional info */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Date Components:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Day:</span>{" "}
                    {currentDate.dayOfWeek}
                  </div>
                  <div>
                    <span className="font-medium">Number:</span>{" "}
                    {currentDate.dayNumber}
                  </div>
                  <div>
                    <span className="font-medium">Month:</span>{" "}
                    {currentDate.month}
                  </div>
                </div>
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
