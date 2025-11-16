import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  const changeLanguage = (lang) => {
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
    setIsDropdownOpen(false);
  };

  // Initialize and listen for language changes
  useEffect(() => {
    // Set initial language from localStorage
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    // Listen for language change events
    const handleLanguageChange = (e) => {
      setCurrentLang(e.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update nav link text based on language
  useEffect(() => {
    if (navRef.current) {
      const links = navRef.current.querySelectorAll("[data-en][data-zh]");
      links.forEach((link) => {
        const text =
          currentLang === "zh"
            ? link.getAttribute("data-zh")
            : link.getAttribute("data-en");
        if (text) link.textContent = text;
      });
    }
  }, [currentLang]);

  return (
    <nav
      ref={navRef}
      className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 backdrop-blur-lg shadow-lg"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <a
            href="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 flex-shrink-0"
            aria-label="Jiahua Ma - Home"
          >
            JM
          </a>

          {/* Navigation Links */}
          <ul
            className="flex items-center space-x-0.5 md:space-x-1"
            role="list"
          >
            <li className="hidden md:block">
              <a
                href="/"
                className="px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
                data-en="Home"
                data-zh="首页"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
                data-en="About"
                data-zh="关于"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/portfolio"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
                data-en="Portfolio"
                data-zh="作品"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="/recipes"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
                data-en="Recipes"
                data-zh="食谱"
              >
                Recipes
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="px-2 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:from-blue-600 focus:to-indigo-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm md:text-base"
                data-en="Contact"
                data-zh="联系"
              >
                Contact
              </a>
            </li>
            {/* Language Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2 md:px-3 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 flex items-center"
                aria-label="Change language"
                aria-expanded={isDropdownOpen}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="w-full text-left px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-sm"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("zh")}
                    className="w-full text-left px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-sm"
                  >
                    中文
                  </button>
                </div>
              )}
            </li>
            {/* Dark Mode Toggle */}
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
