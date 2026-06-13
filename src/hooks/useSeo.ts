import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, getRouteSeo } from "@/lib/seo";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keep document title and key <head> tags in sync with the current route as
 * the user navigates the SPA. The static build already ships correct per-route
 * metadata (scripts/prerender-meta.mjs) for crawlers; this mirrors it for
 * in-app navigation and JS-rendering crawlers. Both read from src/lib/seo.ts.
 */
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(pathname);
    const url = `${SITE.origin}${seo.path === "/" ? "/" : seo.path}`;
    const ogImage = `${SITE.origin}${seo.ogImage}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', "name", "description", seo.description);
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);

    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
  }, [pathname]);
}
