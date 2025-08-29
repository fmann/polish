import React, { useState, useCallback, useEffect } from "react";
import { CustomWord } from "../types";
import {
  parseGoogleTranslateCSV,
  saveCustomWords,
  loadCustomWords,
  clearCustomWords,
  ParsedCSVResult,
} from "../utils/csvParser";
import { shuffleArray } from "../utils/textUtils";
import { useAutoSpeech } from "../hooks/useAutoSpeech";
import SpeechButton from "./SpeechButton";

const MyWordsQuiz: React.FC = () => {
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<ParsedCSVResult | null>(
    null
  );

  // Load saved words on component mount
  useEffect(() => {
    const savedWords = loadCustomWords();
    if (savedWords.length > 0) {
      setCustomWords(shuffleArray(savedWords));
    }
  }, []);

  // Auto-speech for Polish words when first displayed
  const currentWord = customWords[currentIndex];

  useAutoSpeech({
    text: currentWord && !isRevealed ? currentWord.polish : "",
    enabled: !!(currentWord && !isRevealed),
    language: "pl-PL",
    rate: 0.8,
    delay: 300,
  });

  const handleNext = useCallback((): void => {
    setCurrentIndex((prev) => (prev + 1) % customWords.length);
    setIsRevealed(false);
  }, [customWords.length]);

  const handlePrevious = useCallback((): void => {
    setCurrentIndex(
      (prev) => (prev - 1 + customWords.length) % customWords.length
    );
    setIsRevealed(false);
  }, [customWords.length]);

  const handleReveal = useCallback((): void => {
    setIsRevealed(true);
  }, []);

  const handleFileUpload = async (file: File): Promise<void> => {
    setIsUploading(true);
    setUploadResult(null);

    try {
      const content = await file.text();
      const result = parseGoogleTranslateCSV(content);

      if (result.words.length > 0) {
        const shuffledWords = shuffleArray(result.words);
        setCustomWords(shuffledWords);
        saveCustomWords(result.words); // Save unshuffled for consistency
        setCurrentIndex(0);
        setIsRevealed(false);
      }

      setUploadResult(result);
    } catch (error) {
      setUploadResult({
        words: [],
        errors: [
          error instanceof Error ? error.message : "Unknown error occurred",
        ],
        totalRows: 0,
        successfulRows: 0,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(
      (file) =>
        file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv")
    );

    if (csvFile) {
      handleFileUpload(csvFile);
    } else {
      setUploadResult({
        words: [],
        errors: ["Please upload a CSV file"],
        totalRows: 0,
        successfulRows: 0,
      });
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
      // Reset input value to allow re-uploading the same file
      e.target.value = "";
    },
    []
  );

  const handleClearWords = useCallback((): void => {
    if (
      window.confirm("Are you sure you want to clear all your custom words?")
    ) {
      clearCustomWords();
      setCustomWords([]);
      setCurrentIndex(0);
      setIsRevealed(false);
      setUploadResult(null);
    }
  }, []);

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

  // No words uploaded yet
  if (customWords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📚 My Words</h2>
          <p className="text-gray-600">
            Upload your Google Translate saved words CSV file to start studying
          </p>
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {isDragOver
              ? "Drop your CSV file here"
              : "Upload Google Translate CSV"}
          </h3>
          <p className="text-gray-500 mb-4">
            Drag and drop your translations.csv file or click to browse
          </p>

          <label className="inline-block">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploading}
            />
            <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block">
              {isUploading ? "Processing..." : "Choose File"}
            </span>
          </label>
        </div>

        {/* Upload Result */}
        {uploadResult && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50">
            {uploadResult.words.length > 0 ? (
              <div className="text-green-700">
                <p className="font-semibold">✅ Upload successful!</p>
                <p>
                  Loaded {uploadResult.successfulRows} words from{" "}
                  {uploadResult.totalRows} rows
                </p>
              </div>
            ) : (
              <div className="text-red-700">
                <p className="font-semibold">❌ Upload failed</p>
                <ul className="text-sm mt-2">
                  {uploadResult.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-left bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">
            How to get your CSV file:
          </h4>
          <ol className="text-blue-800 space-y-2 text-sm">
            <li>1. Open Google Translate in your browser</li>
            <li>
              2. Click on the star (⭐) icon to view your saved translations
            </li>
            <li>3. Click "Export" and choose "Download as CSV"</li>
            <li>4. Upload the downloaded file here</li>
          </ol>
        </div>
      </div>
    );
  }

  // Words loaded - show flashcard interface
  return (
    <div
      className="max-w-2xl mx-auto"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="application"
      aria-label="My words quiz"
    >
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 mt-2">
          {currentIndex + 1} of {customWords.length} words
        </p>
      </div>

      {/* Navigation and Controls */}
      <div className="flex justify-center items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={handleClearWords}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
          >
            Clear All
          </button>
          <label className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploading}
            />
            Upload New
          </label>
        </div>
      </div>

      {/* Main Card */}
      <div
        onClick={() => !isRevealed && handleReveal()}
        className="bg-white rounded-lg shadow-lg p-8 mb-6 cursor-pointer hover:shadow-xl transition-shadow border-2 border-gray-100"
        role="button"
        tabIndex={0}
        aria-label={
          isRevealed
            ? `Polish: ${currentWord.polish}, English: ${currentWord.english}`
            : `Polish word: ${currentWord.polish}. Click to reveal English translation.`
        }
      >
        <div className="text-center">
          {/* Polish Word */}
          <div className="mb-6">
            <h3 className="text-lg text-gray-600 mb-2">Polish</h3>
            <div className="flex items-center justify-center">
              <p className="text-3xl font-bold">{currentWord.polish}</p>
              <SpeechButton
                text={currentWord.polish}
                language="pl-PL"
                className="ml-3 text-2xl"
              />
            </div>
          </div>

          {/* Reveal/English Section */}
          {!isRevealed ? (
            <div className="py-8">
              <button
                onClick={handleReveal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
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
                  {currentWord.english}
                </p>
                <SpeechButton
                  text={currentWord.english}
                  language="en-US"
                  className="ml-3 text-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
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

export default MyWordsQuiz;
