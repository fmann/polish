import React, { useState, useEffect } from "react";
import { useTensesData } from "../hooks/useData";
import { decodePolishText, getRandomItems } from "../utils/textUtils";
import SpeechButton from "./SpeechButton";
import { TenseConjugation, TenseKey } from "../types";

interface TenseOption {
  key: TenseKey;
  label: string;
  desc: string;
}

const TensesQuiz: React.FC = () => {
  const { data, loading, error } = useTensesData();
  const [currentItems, setCurrentItems] = useState<TenseConjugation[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedTenses, setSelectedTenses] = useState<TenseKey[]>([
    "perfectivePast",
    "imperfectivePast",
  ]);
  const [activeTense, setActiveTense] = useState<TenseKey>("perfectivePast");

  const tenseOptions: TenseOption[] = [
    {
      key: "perfectivePast",
      label: "Perfective Past",
      desc: "Completed action",
    },
    {
      key: "imperfectivePast",
      label: "Imperfective Past",
      desc: "Ongoing/repeated past",
    },
    {
      key: "perfectivePresent",
      label: "Perfective Present",
      desc: "Present action",
    },
    {
      key: "imperfectivePresent",
      label: "Imperfective Present",
      desc: "Ongoing present",
    },
    {
      key: "perfectiveFuture",
      label: "Perfective Future",
      desc: "Will complete",
    },
    {
      key: "imperfectiveFuture",
      label: "Imperfective Future",
      desc: "Will be doing",
    },
  ];

  useEffect(() => {
    if (data.length > 0) {
      const quizItems = getRandomItems(data, 15);
      setCurrentItems(quizItems);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  }, [data]);

  const currentItem = currentItems[currentIndex];
  const currentTense = activeTense;

  // Helper function to safely get tense value
  const getTenseValue = (
    item: TenseConjugation,
    tenseKey: TenseKey
  ): string => {
    return item[tenseKey];
  };

  // Helper function to get English equivalent key
  const getEnglishTenseKey = (tenseKey: TenseKey): keyof TenseConjugation => {
    const mapping: Record<TenseKey, keyof TenseConjugation> = {
      perfectivePast: "englishPerfectivePast",
      imperfectivePast: "englishImperfectivePast",
      perfectivePresent: "englishPerfectivePresent",
      imperfectivePresent: "englishImperfectivePresent",
      perfectiveFuture: "englishPerfectiveFuture",
      imperfectiveFuture: "englishImperfectiveFuture",
    };
    return mapping[tenseKey];
  };

  // Helper function to get opposite aspect tense
  const getOppositeAspectTense = (tenseKey: TenseKey): TenseKey => {
    if (tenseKey.includes("imperfective")) {
      return tenseKey.replace("imperfective", "perfective") as TenseKey;
    } else {
      return tenseKey.replace("perfective", "imperfective") as TenseKey;
    }
  };

  const handleNext = (): void => {
    if (currentIndex < currentItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      const quizItems = getRandomItems(data, 15);
      setCurrentItems(quizItems);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleTense = (tenseKey: TenseKey): void => {
    setActiveTense(tenseKey);
    // Also update selectedTenses for practice variety if needed
    if (!selectedTenses.includes(tenseKey)) {
      setSelectedTenses([...selectedTenses, tenseKey]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading verb tenses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-card text-center">
        <div className="text-red-600">
          <p className="font-medium">Error loading tenses data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="quiz-card text-center">
        <p className="text-gray-600">No tenses data available</p>
      </div>
    );
  }

  const selectedTenseInfo = tenseOptions.find((t) => t.key === currentTense);
  const polishText = decodePolishText(getTenseValue(currentItem, currentTense));
  const englishKey = getEnglishTenseKey(currentTense);
  const englishText = currentItem[englishKey];

  return (
    <div className="space-y-6">
      {/* Tense Selection */}
      <div className="quiz-card">
        <h3 className="font-medium text-gray-900 mb-3">Select Active Tense:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tenseOptions.map((tense) => (
            <button
              key={tense.key}
              onClick={() => toggleTense(tense.key)}
              className={`
                p-3 rounded-lg border text-left transition-colors
                ${
                  activeTense === tense.key
                    ? "bg-blue-50 border-blue-300 text-blue-900"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <div className="font-medium text-sm">{tense.label}</div>
              <div className="text-xs opacity-75">{tense.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} of {currentItems.length}
        </span>
        <span className="ml-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          {selectedTenseInfo?.label}
        </span>
      </div>

      <div className="quiz-card text-center min-h-[300px] flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-sm text-gray-500 mb-2">
            {selectedTenseInfo?.label} ({selectedTenseInfo?.desc})
          </h2>
          <div className="flex items-center justify-center mb-6">
            <p className="text-3xl font-bold text-gray-900">{polishText}</p>
            <SpeechButton
              text={polishText}
              language="pl-PL"
              className="ml-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
            />
          </div>
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="reveal-button mx-auto"
          >
            Reveal English
          </button>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">
                English Translation
              </h3>
              <p className="text-2xl font-semibold text-green-700 mb-6">
                {englishText}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm text-gray-500 mb-3">Aspect Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-medium text-blue-900 text-sm mb-2">
                    Perfective
                  </h4>
                  <div className="flex items-center">
                    <p className="text-sm text-blue-800">
                      {decodePolishText(
                        getTenseValue(
                          currentItem,
                          currentTense.includes("imperfective")
                            ? getOppositeAspectTense(currentTense)
                            : currentTense
                        )
                      )}
                    </p>
                    <SpeechButton
                      text={decodePolishText(
                        getTenseValue(
                          currentItem,
                          currentTense.includes("imperfective")
                            ? getOppositeAspectTense(currentTense)
                            : currentTense
                        )
                      )}
                      language="pl-PL"
                      className="ml-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer text-sm"
                    />
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-medium text-green-900 text-sm mb-2">
                    Imperfective
                  </h4>
                  <div className="flex items-center">
                    <p className="text-sm text-green-800">
                      {decodePolishText(
                        getTenseValue(
                          currentItem,
                          currentTense.includes("perfective")
                            ? getOppositeAspectTense(currentTense)
                            : currentTense
                        )
                      )}
                    </p>
                    <SpeechButton
                      text={decodePolishText(
                        getTenseValue(
                          currentItem,
                          currentTense.includes("perfective")
                            ? getOppositeAspectTense(currentTense)
                            : currentTense
                        )
                      )}
                      language="pl-PL"
                      className="ml-2 text-green-500 hover:text-green-700 transition-colors cursor-pointer text-sm"
                    />
                  </div>
                </div>
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
              Next will restart with new verbs
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

export default TensesQuiz;
