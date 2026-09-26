import React, { useState, useRef } from "react";
import sqlWasmUrl from "sql.js/dist/sql-wasm-browser.wasm?url";
import { getRandomItems } from "../utils/textUtils";
import {
  Deck,
  DeckCard,
  importApkgFile,
  loadDeck,
  saveDeck,
  clearDeck,
} from "../utils/ankiDeck";
import { useAutoSpeech } from "../hooks/useAutoSpeech";
import SpeechButton from "./SpeechButton";

const shuffleDeck = (deck: Deck | null): DeckCard[] =>
  deck ? getRandomItems(deck.cards, deck.cards.length) : [];

const DecksQuiz: React.FC = () => {
  const [deck, setDeck] = useState<Deck | null>(loadDeck);
  const [currentItems, setCurrentItems] = useState<DeckCard[]>(() =>
    shuffleDeck(deck)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentItem = currentItems[currentIndex];

  // Speak the Polish front when a card is first displayed
  useAutoSpeech({
    text: currentItem?.front ?? "",
    enabled: !!currentItem && !showAnswer,
    language: "pl-PL",
    rate: 0.8,
    delay: 300,
  });

  const startDeck = (newDeck: Deck | null): void => {
    setDeck(newDeck);
    setCurrentItems(shuffleDeck(newDeck));
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setImporting(true);
    setError(null);
    try {
      const newDeck = await importApkgFile(file, sqlWasmUrl);
      saveDeck(newDeck);
      startDeck(newDeck);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setImporting(false);
    }
  };

  const handleRemoveDeck = (): void => {
    clearDeck();
    startDeck(null);
  };

  const handleNext = (): void => {
    if (currentIndex < currentItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentItems(shuffleDeck(deck));
      setCurrentIndex(0);
    }
    setShowAnswer(false);
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept=".apkg"
      onChange={handleFileChange}
      className="hidden"
    />
  );

  const importButton = (label: string, className: string) => (
    <button
      onClick={() => fileInputRef.current?.click()}
      disabled={importing}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {importing ? "Importing..." : label}
    </button>
  );

  const errorMessage = error && (
    <div className="text-red-600 text-sm text-center">
      <p className="font-medium">Couldn't import deck</p>
      <p className="mt-1">{error}</p>
    </div>
  );

  if (!deck || !currentItem) {
    return (
      <div className="quiz-card text-center space-y-4">
        {fileInput}
        <div className="text-6xl">🗂️</div>
        <div>
          <p className="text-gray-600 font-medium">No deck imported yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Export a deck from Anki as an .apkg file, then import it here to
            review it as flashcards.
          </p>
        </div>
        {importButton("Import Anki Deck", "nav-button")}
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {fileInput}
      <div className="flex flex-wrap justify-between items-center gap-2 text-sm text-gray-600">
        <span className="font-medium text-gray-900">
          {deck.name}{" "}
          <span className="font-normal text-gray-500">
            ({deck.cards.length} cards)
          </span>
        </span>
        <div className="space-x-3">
          {importButton("Replace Deck", "text-blue-600 hover:text-blue-800")}
          <button
            onClick={handleRemoveDeck}
            className="text-gray-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
      {errorMessage}

      <div className="text-center text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {currentIndex + 1} of {currentItems.length}
        </span>
      </div>

      <div className="quiz-card text-center min-h-[300px] flex flex-col justify-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <p className="text-3xl font-bold text-gray-900 whitespace-pre-line">
              {currentItem.front}
            </p>
            <SpeechButton
              text={currentItem.front}
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
            Reveal Answer
          </button>
        ) : (
          <p className="text-xl text-green-700 whitespace-pre-line">
            {currentItem.back}
          </p>
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

        <button onClick={handleNext} className="nav-button">
          {currentIndex === currentItems.length - 1 ? "Reshuffle" : "Next"} →
        </button>
      </div>
    </div>
  );
};

export default DecksQuiz;
