import {
  siFlutter,
  siDart,
  siSwift,
  siReact,
  siAngular,
  siTypescript,
  siJavascript,
  siPython,
  siR,
  siHtml5,
  siCss,
  siFastapi,
  siNodedotjs,
  siPostgresql,
  siFirebase,
  siDocker,
  siGit,
  siGithubactions,
  siFigma,
  siGodotengine,
  siUnity,
  siClaude,
} from "simple-icons";

export interface TechIcon {
  /** Display name — used as the accessible label. */
  name: string;
  /** Single SVG path string (24×24 viewBox) from simple-icons. */
  svgPath: string;
}

/** Tech-stack logos for the home-page marquee, drawn from the résumé. */
export const techStack: TechIcon[] = [
  siFlutter,
  siDart,
  siSwift,
  siReact,
  siAngular,
  siTypescript,
  siJavascript,
  siPython,
  siR,
  siHtml5,
  siCss,
  siFastapi,
  siNodedotjs,
  siPostgresql,
  siFirebase,
  siDocker,
  siGit,
  siGithubactions,
  siFigma,
  siGodotengine,
  siUnity,
  siClaude,
].map((icon) => ({ name: icon.title, svgPath: icon.path }));
