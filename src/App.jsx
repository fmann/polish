import React, { useState } from "react";
import Navigation from "./components/Navigation";
import VocabularyQuiz from "./components/VocabularyQuiz";
import TensesQuiz from "./components/TensesQuiz";
import CasesQuiz from "./components/CasesQuiz";

function App() {
  const [currentView, setCurrentView] = useState("polish-to-english");

  const renderCurrentView = () => {
    switch (currentView) {
      case "polish-to-english":
        return <VocabularyQuiz direction="polish-to-english" />;
      case "english-to-polish":
        return <VocabularyQuiz direction="english-to-polish" />;
      case "favorites":
        return (
          <VocabularyQuiz direction="polish-to-english" favoriteMode={true} />
        );
      case "tenses":
        return <TensesQuiz />;
      case "cases":
        return <CasesQuiz />;
      default:
        return <VocabularyQuiz direction="polish-to-english" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🇵🇱 Polish Language Learning
          </h1>
          <p className="text-gray-600 mt-1">
            Master vocabulary, tenses, and grammatical cases
          </p>
        </div>
      </header>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="max-w-4xl mx-auto px-4 py-6">{renderCurrentView()}</main>

      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>
            Learn Polish with interactive quizzes and progressive disclosure
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
