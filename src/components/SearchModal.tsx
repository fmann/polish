import React, { useState, useEffect, useRef } from "react";
import { SearchResult, performGlobalSearch } from "../utils/search";
import {
  useVocabularyData,
  useTensesData,
  useCasesData,
} from "../hooks/useData";
import { polishNumbers } from "../data/numbers";
import { sampleDates } from "../data/dates";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToItem: (path: string, itemId?: number, itemIndex?: number) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToItem,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    vocabulary: SearchResult[];
    numbers: SearchResult[];
    dates: SearchResult[];
    myWords: SearchResult[];
    tenses: SearchResult[];
    cases: SearchResult[];
    totalResults: number;
  }>({
    vocabulary: [],
    numbers: [],
    dates: [],
    myWords: [],
    tenses: [],
    cases: [],
    totalResults: 0,
  });
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Data hooks
  const { data: vocabularyData } = useVocabularyData();
  const { data: tensesData } = useTensesData();
  const { data: casesData } = useCasesData();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults({
        vocabulary: [],
        numbers: [],
        dates: [],
        myWords: [],
        tenses: [],
        cases: [],
        totalResults: 0,
      });
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults({
          vocabulary: [],
          numbers: [],
          dates: [],
          myWords: [],
          tenses: [],
          cases: [],
          totalResults: 0,
        });
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await performGlobalSearch(
          query,
          vocabularyData,
          polishNumbers,
          sampleDates,
          tensesData,
          casesData
        );
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, vocabularyData, tensesData, casesData]);

  const handleResultClick = (result: SearchResult) => {
    onNavigateToItem(result.path, result.itemId, result.itemIndex);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSectionIcon = (type: string): string => {
    switch (type) {
      case "vocabulary":
        return "📖";
      case "numbers":
        return "🔢";
      case "dates":
        return "📅";
      case "mywords":
        return "📚";
      case "tenses":
        return "⏰";
      case "cases":
        return "📝";
      default:
        return "🔍";
    }
  };

  const renderResultSection = (
    title: string,
    icon: string,
    results: SearchResult[]
  ) => {
    if (results.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <span className="mr-2">{icon}</span>
          {title} ({results.length})
        </h3>
        <div className="space-y-1">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left p-3 rounded-lg hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors"
            >
              <div className="font-medium text-gray-900">{result.title}</div>
              <div className="text-sm text-gray-600">{result.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="flex items-start justify-center min-h-screen pt-16 px-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search Polish words, translations, numbers..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            )}

            {!isSearching && query && results.totalResults === 0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="h-12 w-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">
                  Try searching for Polish words, English translations, or
                  numbers
                </p>
              </div>
            )}

            {!isSearching && !query && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="h-12 w-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p>Search across all Polish learning content</p>
                <p className="text-sm mt-1">
                  Find vocabulary, numbers, dates, tenses, and cases
                </p>
              </div>
            )}

            {!isSearching && results.totalResults > 0 && (
              <div>
                <div className="mb-4 text-sm text-gray-600">
                  Found {results.totalResults} result
                  {results.totalResults !== 1 ? "s" : ""}
                </div>

                {renderResultSection(
                  "Vocabulary",
                  getSectionIcon("vocabulary"),
                  results.vocabulary
                )}
                {renderResultSection(
                  "Numbers",
                  getSectionIcon("numbers"),
                  results.numbers
                )}
                {renderResultSection(
                  "Dates",
                  getSectionIcon("dates"),
                  results.dates
                )}
                {renderResultSection(
                  "My Words",
                  getSectionIcon("mywords"),
                  results.myWords
                )}
                {renderResultSection(
                  "Tenses",
                  getSectionIcon("tenses"),
                  results.tenses
                )}
                {renderResultSection(
                  "Cases",
                  getSectionIcon("cases"),
                  results.cases
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
