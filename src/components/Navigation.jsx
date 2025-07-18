import React from "react";

const Navigation = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: "polish-to-english", label: "Polish → English", icon: "🇵🇱→🇺🇸" },
    { id: "english-to-polish", label: "English → Polish", icon: "🇺🇸→🇵🇱" },
    { id: "tenses", label: "Verb Tenses", icon: "⏰" },
    { id: "cases", label: "Grammatical Cases", icon: "📝" },
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap
                ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
