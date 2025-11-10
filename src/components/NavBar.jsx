import React from "react";

export default function NavBar() {
  return (
    <nav
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
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/portfolio"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="/recipes"
                className="px-2 md:px-4 py-2 text-gray-200 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg transition-all duration-200 font-medium text-sm md:text-base"
              >
                Recipes
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="px-2 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:from-blue-600 focus:to-indigo-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
