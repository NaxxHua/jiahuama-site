import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Keep <html data-theme> in sync with the system preference unless the user
// has explicitly chosen a theme (persisted as "jiahuama:theme").
(function bindThemeToSystem() {
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    const override = localStorage.getItem("jiahuama:theme");
    const theme =
      override === "dark" || override === "light"
        ? override
        : mql.matches
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", theme);
  };
  apply();
  try {
    mql.addEventListener("change", apply);
  } catch {
    mql.addListener(apply);
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
