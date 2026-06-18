import { lazy, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import RootLayout from "@/components/layout/RootLayout";

// Route-level code splitting — each page ships as its own chunk.
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const RecipesPage = lazy(() => import("@/pages/RecipesPage"));
const RecipeDetailPage = lazy(() => import("@/pages/RecipeDetailPage"));
const GuestbookPage = lazy(() => import("@/pages/GuestbookPage"));
const GamePage = lazy(() => import("@/pages/GamePage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

interface ViewTransitionLike {
  ready?: Promise<unknown>;
  finished?: Promise<unknown>;
  updateCallbackDone?: Promise<unknown>;
}
type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

/**
 * Cross-fade between routes with the View Transitions API. We render a lagging
 * `display` location and only advance it inside startViewTransition, so the
 * browser snapshots the old page, swaps synchronously, then animates to the
 * new one. Browsers without the API (or reduced-motion) just swap instantly.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const [display, setDisplay] = useState(location);

  useEffect(() => {
    if (location.key === display.key) return;
    const startViewTransition = (document as DocumentWithVT).startViewTransition;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && typeof startViewTransition === "function") {
      const transition = startViewTransition.call(document, () => {
        flushSync(() => setDisplay(location));
      });
      // A rapid follow-up navigation aborts the in-flight transition; swallow
      // its rejection so it doesn't surface as an unhandled error.
      const ignore = () => {};
      transition?.ready?.catch?.(ignore);
      transition?.finished?.catch?.(ignore);
      transition?.updateCallbackDone?.catch?.(ignore);
    } else {
      setDisplay(location);
    }
  }, [location, display.key]);

  return (
    <Routes location={display}>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailPage />} />
        <Route path="guestbook" element={<GuestbookPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AnimatedRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}
