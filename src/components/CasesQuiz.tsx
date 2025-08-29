import React, { useState, useEffect } from "react";
import { useCasesData } from "../hooks/useData";
import { decodePolishText, getRandomItems } from "../utils/textUtils";
import { GrammaticalCase } from "../types";
import SpeechButton from "./SpeechButton";

type CaseKey =
  | "nominative"
  | "genitive"
  | "dative"
  | "accusative"
  | "instrumental"
  | "locative"
  | "vocative";

const CasesQuiz: React.FC = () => {
  const { data, descriptions, loading, error } = useCasesData();
  const [currentItems, setCurrentItems] = useState<GrammaticalCase[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<CaseKey>("nominative");

  const caseOptions: CaseKey[] = [
    "nominative",
    "genitive",
    "dative",
    "accusative",
    "instrumental",
    "locative",
    "vocative",
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
  const currentDescription = descriptions.find(
    (d) => d.name && d.name.toLowerCase() === selectedCase.toLowerCase()
  );

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading grammatical cases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-card text-center">
        <div className="text-red-600">
          <p className="font-medium">Error loading cases data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="quiz-card text-center">
        <p className="text-gray-600">No cases data available</p>
      </div>
    );
  }

  const baseWord = decodePolishText(currentItem.base.nominative);
  const caseForm = decodePolishText(currentItem.base[selectedCase]);
  const translation = currentItem.translation;
  const example = currentItem.examples?.[selectedCase];

  return (
    <div className="space-y-6">
      {/* Case Selection */}
      <div className="quiz-card">
        <h3 className="font-medium text-gray-900 mb-3">
          Select Grammatical Case:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {caseOptions.map((caseKey) => (
            <button
              key={caseKey}
              onClick={() => setSelectedCase(caseKey)}
              className={`
                p-2 rounded-lg border text-center transition-colors capitalize
                ${
                  selectedCase === caseKey
                    ? "bg-blue-50 border-blue-300 text-blue-900"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {caseKey}
            </button>
          ))}
        </div>

        {currentDescription && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{currentDescription.name}:</span>{" "}
              {currentDescription.description}
            </p>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} of {currentItems.length}
        </span>
        <span className="ml-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full capitalize">
          {selectedCase}
        </span>
      </div>

      <div className="quiz-card text-center min-h-[300px] flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-sm text-gray-500 mb-2">
            Base Word: {baseWord} ({translation})
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            What is the <strong className="capitalize">{selectedCase}</strong>{" "}
            form?
          </p>
          <div className="text-3xl font-bold text-gray-900 mb-6">
            {baseWord} → ?
          </div>
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="reveal-button mx-auto"
          >
            Reveal Case Form
          </button>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-2 capitalize">
                {selectedCase} Form
              </h3>
              <div className="flex items-center justify-center mb-6">
                <p className="text-3xl font-semibold text-green-700">
                  {caseForm}
                </p>
                <SpeechButton
                  text={caseForm}
                  language="pl-PL"
                  className="ml-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                />
              </div>
            </div>

            {example && (
              <div className="border-t pt-6">
                <h3 className="text-sm text-gray-500 mb-3">Example Usage</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <p className="polish-text">
                      🇵🇱 {decodePolishText(example.pl)}
                    </p>
                    <SpeechButton
                      text={decodePolishText(example.pl)}
                      language="pl-PL"
                      className="ml-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                    />
                  </div>
                  <p className="english-text text-center">🇨🇦 {example.en}</p>
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-sm text-gray-500 mb-3">All Case Forms</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {caseOptions.map((caseKey) => (
                  <div
                    key={caseKey}
                    className={`
                      p-2 rounded border text-center
                      ${
                        caseKey === selectedCase
                          ? "bg-green-50 border-green-300 text-green-900"
                          : "bg-gray-50 border-gray-200"
                      }
                    `}
                  >
                    <div className="font-medium capitalize text-xs">
                      {caseKey}
                    </div>
                    <div>{decodePolishText(currentItem.base[caseKey])}</div>
                  </div>
                ))}
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

export default CasesQuiz;
