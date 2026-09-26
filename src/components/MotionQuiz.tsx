import React, { useMemo, useState } from "react";
import {
  generateMotionCards,
  MotionCard,
  MotionFrequency,
  MotionMode,
  MotionTense,
} from "../data/motionVerbs";
import { getRandomItems } from "../utils/textUtils";
import { useAutoSpeech } from "../hooks/useAutoSpeech";
import SpeechButton from "./SpeechButton";

const ALL_CARDS = generateMotionCards();

const MODE_LABELS: Record<MotionMode, string> = {
  foot: "🚶 On foot",
  vehicle: "🚗 By vehicle",
  plane: "✈️ By plane",
  any: "↩️ Any means",
};

type Filter<T> = T | "all";

interface FilterOption<T> {
  value: Filter<T>;
  label: string;
}

const MODE_OPTIONS: FilterOption<MotionMode>[] = [
  { value: "all", label: "All" },
  { value: "foot", label: MODE_LABELS.foot },
  { value: "vehicle", label: MODE_LABELS.vehicle },
  { value: "plane", label: MODE_LABELS.plane },
];

const TENSE_OPTIONS: FilterOption<MotionTense>[] = [
  { value: "all", label: "All" },
  { value: "past", label: "Past" },
  { value: "present", label: "Present" },
  { value: "future", label: "Future" },
];

const FREQUENCY_OPTIONS: FilterOption<MotionFrequency>[] = [
  { value: "all", label: "All" },
  { value: "once", label: "One trip" },
  { value: "repeated", label: "Repeated" },
];

const stripBrackets = (text: string): string => text.replace(/[[\]]/g, "");

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption<T>[];
  value: Filter<T>;
  onChange: (value: Filter<T>) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 w-20">{label}</span>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 rounded-full border text-sm transition-colors ${
            value === option.value
              ? "bg-blue-50 border-blue-300 text-blue-900"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const CheatSheet: React.FC = () => (
  <div className="space-y-4 text-sm text-gray-700">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">One direction, in progress</th>
            <th className="px-3 py-2">Repeated, habitual, around</th>
            <th className="px-3 py-2">One completed trip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-2 font-medium">🚶 On foot</td>
            <td className="px-3 py-2">iść</td>
            <td className="px-3 py-2">chodzić</td>
            <td className="px-3 py-2">pójść</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-3 py-2 font-medium">🚗 Vehicle / bike</td>
            <td className="px-3 py-2">jechać</td>
            <td className="px-3 py-2">jeździć</td>
            <td className="px-3 py-2">pojechać</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">✈️ Plane</td>
            <td className="px-3 py-2">lecieć</td>
            <td className="px-3 py-2">latać</td>
            <td className="px-3 py-2">polecieć</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <p className="font-medium text-gray-900 mb-1">Prefixes</p>
      <ul className="space-y-1">
        <li>
          <strong>przy-</strong> arrive: przyjść / przychodzić, przyjechać /
          przyjeżdżać, przylecieć
        </li>
        <li>
          <strong>wy-</strong> go out, leave: wyjść / wychodzić, wyjechać /
          wyjeżdżać, wylecieć
        </li>
        <li>
          <strong>w-</strong> go in, go up onto: wejść / wchodzić
        </li>
        <li>
          <strong>prze-</strong> through, across: przejść / przechodzić
        </li>
        <li>
          <strong>pod-</strong> approach, walk up to: podejść / podchodzić
        </li>
        <li>
          <strong>do-</strong> reach, get to: dojść / dochodzić, dojechać /
          dojeżdżać
        </li>
      </ul>
      <p className="mt-2">
        With a prefix there are only two verbs: the perfective (wyjść) for one
        completed action, and the imperfective (wychodzić) for both “right now”
        and “usually”.
      </p>
    </div>

    <div>
      <p className="font-medium text-gray-900 mb-1">Two things English hides</p>
      <ul className="space-y-1 list-disc pl-5">
        <li>
          Plans use the present: <em>Jutro jadę do Łodzi</em> (I'm going to Łódź
          tomorrow).
        </li>
        <li>
          A trip that's over is often just “I was”:{" "}
          <em>Wczoraj byłem w kinie</em> (I went to the cinema yesterday).
        </li>
      </ul>
    </div>
  </div>
);

const MotionQuiz: React.FC = () => {
  const [mode, setMode] = useState<Filter<MotionMode>>("all");
  const [tense, setTense] = useState<Filter<MotionTense>>("all");
  const [frequency, setFrequency] = useState<Filter<MotionFrequency>>("all");
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffleCount, setShuffleCount] = useState<number>(0);

  const currentItems = useMemo<MotionCard[]>(() => {
    const matching = ALL_CARDS.filter(
      (card) =>
        (mode === "all" || card.mode === mode || card.mode === "any") &&
        (tense === "all" || card.tense === tense) &&
        (frequency === "all" || card.frequency === frequency)
    );
    return getRandomItems(matching, matching.length);
    // shuffleCount forces a fresh shuffle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, tense, frequency, shuffleCount]);

  const currentItem = currentItems[currentIndex];

  useAutoSpeech({
    text: currentItem ? stripBrackets(currentItem.polish) : "",
    enabled: !!currentItem && showAnswer,
    language: "pl-PL",
    rate: 0.8,
    delay: 300,
  });

  const resetPosition = (): void => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const updateFilter =
    <T,>(setter: (value: T) => void) =>
    (value: T): void => {
      setter(value);
      resetPosition();
    };

  const handleNext = (): void => {
    if (currentIndex < currentItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setShuffleCount(shuffleCount + 1);
      resetPosition();
    }
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="quiz-card space-y-3">
        <FilterRow
          label="Travel"
          options={MODE_OPTIONS}
          value={mode}
          onChange={updateFilter(setMode)}
        />
        <FilterRow
          label="Time"
          options={TENSE_OPTIONS}
          value={tense}
          onChange={updateFilter(setTense)}
        />
        <FilterRow
          label="How often"
          options={FREQUENCY_OPTIONS}
          value={frequency}
          onChange={updateFilter(setFrequency)}
        />
        <div className="border-t pt-3">
          <button
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            aria-expanded={showCheatSheet}
            className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center"
          >
            <span
              className={`inline-block mr-1 transition-transform ${
                showCheatSheet ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
            Cheat sheet
          </button>
          {showCheatSheet && (
            <div className="mt-3">
              <CheatSheet />
            </div>
          )}
        </div>
      </div>

      {!currentItem ? (
        <div className="quiz-card text-center text-gray-600">
          No cards match these filters.
        </div>
      ) : (
        <>
          <div className="text-center text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {currentIndex + 1} of {currentItems.length}
            </span>
            <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {MODE_LABELS[currentItem.mode]}
            </span>
          </div>

          <div className="quiz-card text-center min-h-[300px] flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-sm text-gray-500 mb-2">How do you say…</h2>
              <p className="text-2xl font-bold text-gray-900">
                {currentItem.english}
              </p>
            </div>

            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="reveal-button mx-auto"
              >
                Reveal Polish
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <p className="text-2xl text-gray-900">
                    {currentItem.polish.split(/(\[[^\]]+\])/).map((part, i) =>
                      part.startsWith("[") ? (
                        <strong key={i} className="text-green-700">
                          {part.slice(1, -1)}
                        </strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                  <SpeechButton
                    text={stripBrackets(currentItem.polish)}
                    language="pl-PL"
                    className="ml-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                  />
                </div>
                <div className="border-t pt-4 text-sm text-gray-700 max-w-xl mx-auto">
                  <p>
                    <strong>{currentItem.verb}</strong>{" "}
                    <span className="text-gray-500">
                      — {currentItem.verbKind}
                    </span>
                  </p>
                  <p className="mt-1">{currentItem.why}</p>
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

            <button onClick={handleNext} className="nav-button">
              {currentIndex === currentItems.length - 1 ? "Reshuffle" : "Next"}{" "}
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MotionQuiz;
