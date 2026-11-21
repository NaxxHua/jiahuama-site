/**
 * Threads — animated flowing-line WebGL background.
 * Ported from React Bits (MIT) — https://reactbits.dev/backgrounds/threads
 */
import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import "./Threads.css";

interface ThreadsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  interactionTarget?: React.RefObject<HTMLElement>;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform float uPointerInfluence;


const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float dx = st.x - mouse.x;
    float reach = exp(-dx * dx * 22.0);
    float lift = clamp((mouse.y - y) * 0.72, -0.26, 0.26);
    float ripple = 0.028 * cos(dx * 24.0 - time * 2.7 + perc * 2.2);
    y += uPointerInfluence * reach * (lift + ripple);

    float feather = width / 2.0 + u_line_blur * pixel(1.0, iResolution.xy) * blur;
    float line_start = 1.0 - smoothstep(y, y + feather, st.y);
    float line_end = 1.0 - smoothstep(y - feather, y, st.y);

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

type RGB = [number, number, number];

interface Appearance {
  color: RGB;
  amplitude: number;
  distance: number;
}

interface PointerState {
  x: number;
  y: number;
  influence: number;
}

interface WaveRenderer {
  canvas: HTMLCanvasElement;
  resize: (width: number, height: number) => void;
  draw: (time: number, pointer: PointerState, style: Appearance) => void;
  dispose: () => void;
}

function createWebGLWave(): WaveRenderer | null {
  if (typeof WebGLRenderingContext === "undefined") return null;
  const canvas = document.createElement("canvas");
  let renderer: Renderer;
  try {
    const options: WebGLContextAttributes = { alpha: true, depth: false, premultipliedAlpha: false, powerPreference: "low-power" };
    const modern = canvas.getContext("webgl2", options);
    const context = (modern ?? canvas.getContext("webgl", options)) as WebGLRenderingContext | WebGL2RenderingContext | null;
    if (!context) return null;
    if (!modern && !context.getExtension("OES_vertex_array_object")) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
      return null;
    }
    renderer = new Renderer({ ...options, canvas, webgl: modern ? 2 : 1 });
  } catch {
    // Some browsers expose WebGL but disable context creation for this device.
    return null;
  }
  const gl = renderer.gl;
  const context = gl.getExtension("WEBGL_lose_context");
  const resolution = new Float32Array([1, 1, 1]);
  const mouse = new Float32Array([0.5, 0.5]);
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      iTime: { value: 0 }, iResolution: { value: resolution },
      uColor: { value: [1, 1, 1] }, uAmplitude: { value: 1 }, uDistance: { value: 0 },
      uMouse: { value: mouse }, uPointerInfluence: { value: 0 },
    },
  });
  if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
    program.remove();
    context?.loseContext();
    return null;
  }
  const geometry = new Triangle(gl);
  const mesh = new Mesh(gl, { geometry, program });
  gl.clearColor(0, 0, 0, 0);

  return {
    canvas,
    resize(width, height) {
      // Keep fragment work bounded on ultrawide and high-resolution screens.
      renderer.dpr = Math.min(1, Math.sqrt(800000 / (width * height)));
      renderer.setSize(width, height);
      resolution.set([canvas.width, canvas.height, width / height]);
    },
    draw(time, pointer, style) {
      mouse[0] = pointer.x;
      mouse[1] = pointer.y;
      program.uniforms.iTime.value = time;
      program.uniforms.uColor.value = style.color;
      program.uniforms.uAmplitude.value = style.amplitude;
      program.uniforms.uDistance.value = style.distance;
      program.uniforms.uPointerInfluence.value = pointer.influence;
      renderer.render({ scene: mesh });
    },
    dispose() {
      geometry.remove();
      program.remove();
      if (!gl.isContextLost()) context?.loseContext();
    },
  };
}

// Preserve the blue strands on devices with no WebGL and in reduced-motion mode.
function createCanvasWave(): WaveRenderer | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return {
    canvas,
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
    },
    draw(time, pointer, { color, amplitude, distance }) {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = `rgb(${color.map((channel) => Math.round(channel * 255)).join(",")})`;
      ctx.lineWidth = Math.max(1, width / 1050);
      for (let line = 0; line < 28; line++) {
        const p = line / 28;
        ctx.globalAlpha = 0.12 + 0.25 * (1 - p);
        ctx.beginPath();
        for (let x = 0; x < width + 8; x += 8) {
          const u = x / width;
          const spread = Math.min(1, u * 1.8);
          const drift = Math.sin(u * 5.8 + p * 2.5 - time * 0.24);
          const fold = Math.sin(u * 9 - p * 3 + time * 0.16);
          let y = 0.5 + (p - 0.5) * distance + (drift + 0.35 * fold) * spread * amplitude * 0.085;
          const dx = u - pointer.x;
          const lift = Math.min(0.26, Math.max(-0.26, (pointer.y - y) * 0.72));
          const ripple = 0.028 * Math.cos(dx * 24 - time * 2.7 + p * 2.2);
          y += pointer.influence * Math.exp(-dx * dx * 22) * (lift + ripple);
          if (x === 0) ctx.moveTo(0, (1 - y) * height);
          else ctx.lineTo(x, (1 - y) * height);
        }
        ctx.stroke();
      }
    },
    dispose() { canvas.width = canvas.height = 0; },
  };
}

const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  interactionTarget,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const style = useRef<Appearance>({ color, amplitude, distance });
  const invalidate = useRef<() => void>();
  const [red, green, blue] = color;

  useEffect(() => {
    style.current = { color: [red, green, blue], amplitude, distance };
    invalidate.current?.();
  }, [red, green, blue, amplitude, distance]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const target = interactionTarget?.current;
    const primaryRenderer = reducedMotion ? null : createWebGLWave();
    let wave = primaryRenderer ?? createCanvasWave();
    if (!wave) return;
    container.append(wave.canvas);

    const pointer: PointerState = { x: 0.5, y: 0.5, influence: 0 };
    const goal: PointerState = { ...pointer };
    const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    let inView = !("IntersectionObserver" in window);
    let frame = 0;
    let previousTime = 0;
    let time = 2;

    function schedule() {
      if (inView && !document.hidden && !frame && wave) frame = requestAnimationFrame(draw);
    }

    function draw(now: number) {
      frame = 0;
      if (!wave || !inView || document.hidden) return;
      const dt = previousTime && !reducedMotion ? Math.min((now - previousTime) / 1000, 0.05) : 0;
      previousTime = now;
      const ease = 1 - Math.exp(-dt * 10);
      pointer.x += (goal.x - pointer.x) * ease;
      pointer.y += (goal.y - pointer.y) * ease;
      pointer.influence += (goal.influence - pointer.influence) * ease;
      time += dt;
      wave.draw(time, pointer, style.current);
      if (!reducedMotion) schedule();
    }

    function release() {
      goal.x = goal.y = 0.5;
      goal.influence = 0;
    }

    function move(event: PointerEvent) {
      if (!target || !finePointer.matches || event.pointerType === "touch") return;
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      goal.x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      goal.y = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
      goal.influence = 1;
    }

    function syncVisibility() {
      if (inView && !document.hidden) {
        schedule();
      } else {
        cancelAnimationFrame(frame);
        frame = previousTime = 0;
        release();
      }
    }

    function resize() {
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      if (width && height) wave?.resize(width, height);
      schedule();
    }

    function onContextLost() {
      // A second canvas can draw in 2D even while the original GPU context is lost.
      wave?.canvas.remove();
      wave?.dispose();
      wave = createCanvasWave();
      if (wave) {
        container!.append(wave.canvas);
        resize();
      }
    }

    primaryRenderer?.canvas.addEventListener("webglcontextlost", onContextLost);
    if (target && !reducedMotion) {
      target.addEventListener("pointermove", move, { passive: true });
      target.addEventListener("pointerleave", release);
      target.addEventListener("pointercancel", release);
      finePointer.addEventListener("change", release);
    }
    document.addEventListener("visibilitychange", syncVisibility);

    const viewport = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          syncVisibility();
        })
      : null;
    viewport?.observe(container);
    const sizes = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (sizes) sizes.observe(container);
    else window.addEventListener("resize", resize);

    invalidate.current = schedule;
    resize();

    return () => {
      invalidate.current = undefined;
      cancelAnimationFrame(frame);
      viewport?.disconnect();
      sizes?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncVisibility);
      target?.removeEventListener("pointermove", move);
      target?.removeEventListener("pointerleave", release);
      target?.removeEventListener("pointercancel", release);
      if (!reducedMotion && target) finePointer.removeEventListener("change", release);
      primaryRenderer?.canvas.removeEventListener("webglcontextlost", onContextLost);
      wave?.canvas.remove();
      wave?.dispose();
    };
  }, [interactionTarget, reducedMotion]);

  return <div ref={containerRef} className="threads-container" {...rest} />;
};

export default Threads;
