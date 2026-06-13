import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import Analytics from "./Analytics";
import CommandPalette from "@/components/ui/CommandPalette";
import { useLenis, scrollToTop } from "@/hooks/useLenis";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/i18n/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Loader2 size={22} className="animate-spin text-fg-3" />
    </div>
  );
}

export default function RootLayout() {
  const { t } = useLang();
  useLenis();
  useSeo();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t.common.skipToContent}
      </a>
      <ScrollToTop />
      <Analytics />
      <Nav />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
