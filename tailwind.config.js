/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        // Light-blue palette — driven by CSS vars on <html data-theme>.
        // Vars hold space-separated RGB channels so the `<alpha-value>`
        // placeholder lets opacity modifiers work (e.g. bg-panel/70).
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-1": "rgb(var(--bg-1) / <alpha-value>)",
        "bg-2": "rgb(var(--bg-2) / <alpha-value>)",
        "bg-3": "rgb(var(--bg-3) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-2": "rgb(var(--border-2) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-1": "rgb(var(--fg-1) / <alpha-value>)",
        "fg-2": "rgb(var(--fg-2) / <alpha-value>)",
        "fg-3": "rgb(var(--fg-3) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
