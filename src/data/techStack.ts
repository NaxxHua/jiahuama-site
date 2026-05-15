import {
  siFlutter,
  siDart,
  siSwift,
  siReact,
  siTypescript,
  siFigma,
  siPython,
  siR,
  siGit,
  siTailwindcss,
} from "simple-icons";

export interface TechIcon {
  /** Display name. */
  name: string;
  /** Single SVG path string (24×24 viewBox) from simple-icons. */
  svgPath: string;
}

/** Tech-stack logos for the home-page marquee. */
export const techStack: TechIcon[] = [
  { name: siFlutter.title, svgPath: siFlutter.path },
  { name: siDart.title, svgPath: siDart.path },
  { name: siSwift.title, svgPath: siSwift.path },
  { name: siReact.title, svgPath: siReact.path },
  { name: siTypescript.title, svgPath: siTypescript.path },
  { name: siFigma.title, svgPath: siFigma.path },
  { name: siPython.title, svgPath: siPython.path },
  { name: siR.title, svgPath: siR.path },
  { name: siGit.title, svgPath: siGit.path },
  { name: siTailwindcss.title, svgPath: siTailwindcss.path },
];
