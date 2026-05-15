import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { useLenis, scrollToTop } from "@/hooks/useLenis";
import { useLang } from "@/i18n/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

export default function RootLayout() {
  const { t } = useLang();
  useLenis();

  return (
    <div className="flex min-h-full flex-col">
      <a href="#main" className="skip-link">
        {t.common.skipToContent}
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
