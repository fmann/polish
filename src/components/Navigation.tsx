import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ViewType } from "../types";

interface NavItem {
  id: ViewType;
  label: string;
  icon: string;
  path: string;
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    { id: "numbers", label: "Numbers", icon: "🔢", path: "/numbers" },
    { id: "dates", label: "Dates", icon: "📅", path: "/dates" },
    { id: "tenses", label: "Tenses", icon: "⏰", path: "/tenses" },
    { id: "cases", label: "Cases", icon: "📝", path: "/cases" },
    { id: "favorites", label: "Favourites", icon: "⭐", path: "/favorites" },
  ];

  // Find current active item
  const currentItem =
    navItems.find((item) => item.path === location.pathname) || navItems[0];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Current Section Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-2xl">{currentItem.icon}</span>
            <span className="font-medium text-lg">{currentItem.label}</span>
          </div>

          {/* Spacer to balance the layout */}
          <div className="w-10"></div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={closeMenu}
          >
            <div
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

              {/* Menu Items */}
              <div className="py-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 text-base font-medium transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
