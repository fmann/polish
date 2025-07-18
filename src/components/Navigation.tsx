import React from "react";
import { NavLink } from "react-router-dom";
import { ViewType } from "../types";

interface NavItem {
  id: ViewType;
  label: string;
  icon: string;
  path: string;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    {
      id: "polish-to-english",
      label: "Polish → English",
      icon: "🇵🇱→🇨🇦",
      path: "/polish-to-english",
    },
    {
      id: "english-to-polish",
      label: "English → Polish",
      icon: "🇨🇦→🇵🇱",
      path: "/english-to-polish",
    },
    { id: "favorites", label: "Favourites", icon: "⭐", path: "/favorites" },
    { id: "tenses", label: "Tenses", icon: "⏰", path: "/tenses" },
    { id: "cases", label: "Cases", icon: "📝", path: "/cases" },
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
