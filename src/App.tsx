import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import VocabularyQuiz from "./components/VocabularyQuiz";
import TensesQuiz from "./components/TensesQuiz";
import CasesQuiz from "./components/CasesQuiz";
import DatesQuiz from "./components/DatesQuiz";
import NumbersQuiz from "./components/NumbersQuiz";
import MyWordsQuiz from "./components/MyWordsQuiz";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🇵🇱 Polish Language Learning Tool
          </h1>
        </div>
      </header>

      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/polish-to-english"
            element={<VocabularyQuiz direction="polish-to-english" />}
          />
          <Route
            path="/english-to-polish"
            element={<VocabularyQuiz direction="english-to-polish" />}
          />
          <Route
            path="/favorites"
            element={
              <VocabularyQuiz
                direction="polish-to-english"
                favoriteMode={true}
              />
            }
          />
          <Route path="/numbers" element={<NumbersQuiz />} />
          <Route path="/dates" element={<DatesQuiz />} />
          <Route path="/my-words" element={<MyWordsQuiz />} />
          <Route path="/tenses" element={<TensesQuiz />} />
          <Route path="/cases" element={<CasesQuiz />} />
          <Route
            path="/"
            element={<Navigate to="/polish-to-english" replace />}
          />
        </Routes>
      </main>

      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>
            Learn Polish with interactive quizzes and progressive disclosure
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
