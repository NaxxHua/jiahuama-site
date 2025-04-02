import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 border-t-4 border-b-4 border-gray-500 p-4">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          <li>
            <a
              href="/"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-colors"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="/resume"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-colors"
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
