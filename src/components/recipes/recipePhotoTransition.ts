import { scrollImmediatelyTo } from "@/hooks/useLenis";

let lastThumbnail: { id: string; top: number } | undefined;
const owners = new WeakMap<HTMLElement, symbol>();

export function recipeScrollPosition(pathname: string) {
  if (!lastThumbnail || !/^\/recipes\/?$/.test(pathname)) return 0;
  const frame = document.getElementById(`recipe-photo-${lastThumbnail.id}`);
  if (!frame) return 0;
  const top = Math.min(lastThumbnail.top, window.innerHeight - 64);
  return Math.max(0, window.scrollY + frame.getBoundingClientRect().top - top);
}

export function recipePhotoTransition(from: string, to: string, animate: boolean) {
  const returning = /^\/recipes\/?$/.test(to);
  if (!returning && !/^\/recipes\/?$/.test(from)) {
    lastThumbnail = undefined;
    return;
  }
  const id = /^\/recipes\/([\w-]+)\/?$/.exec(returning ? from : to)?.[1];
  if (!id || (returning && lastThumbnail?.id !== id)) {
    lastThumbnail = undefined;
    return;
  }

  const name = `recipe-photo-${id}`;
  const source = document.getElementById(name);
  if (!source) {
    lastThumbnail = undefined;
    return;
  }
  const position = source.getBoundingClientRect();
  const visible = position.bottom > 0 && position.top < window.innerHeight;
  if (!returning) {
    lastThumbnail = undefined;
    if (!visible) return;
    lastThumbnail = { id, top: position.top };
  }
  if (!animate) return;

  const owner = Symbol();
  const mark = (element: HTMLElement) => {
    owners.set(element, owner);
    element.style.viewTransitionName = name;
    element.classList.add("recipe-photo-active");
  };
  if (visible) mark(source);
  let destination: HTMLElement | null = null;

  return {
    afterNavigation() {
      destination = document.getElementById(name);
      if (!destination) return;
      if (visible) mark(destination);
      if (returning) scrollImmediatelyTo(recipeScrollPosition(to));
    },
    finish() {
      for (const element of [source, destination]) {
        if (!element || owners.get(element) !== owner) continue;
        owners.delete(element);
        element.style.removeProperty("view-transition-name");
        element.classList.remove("recipe-photo-active");
      }
    },
  };
}
