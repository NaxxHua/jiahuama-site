import React, { useState, useEffect } from "react";

export default function LanguageToggle() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Get saved language preference from localStorage
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);
    document.documentElement.setAttribute("lang", savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "zh" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.setAttribute("lang", newLang);

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent("languageChange", { detail: newLang })
    );
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-20 right-6 z-50 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium"
      aria-label={language === "en" ? "Switch to Chinese" : "Switch to English"}
      aria-pressed={language !== "en"}
    >
      {language === "en" ? "中文" : "EN"}
    </button>
  );
}
