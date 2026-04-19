"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uColorDeep;
  uniform vec3  uColorShallow;
  varying vec2  vUv;

  // ── Noise primitives ───────────────────────────────────────
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  // ── River helpers ──────────────────────────────────────────

  // Long streaks flowing downward (-Y)
  float currentLines(vec2 uv, float t) {
    // Stretch UV in Y → long thin current streaks
    vec2 p = vec2(uv.x * 4.0, uv.y * 18.0 - t * 3.2);
    // Lateral wobble driven by slower noise
    p.x += fbm(vec2(uv.x * 2.0, uv.y * 3.0 - t * 0.6)) * 0.6;
    float lines = noise(p * vec2(1.0, 0.4));
    return pow(lines, 2.5);
  }

  // Cross-ripples perpendicular to flow
  float ripples(vec2 uv, float t) {
    vec2 p = vec2(uv.x * 12.0 + fbm(uv * 3.0 + t * 0.2) * 0.8,
                  uv.y *  5.0 - t * 1.4);
    return abs(sin(p.x * 3.14159));
  }

  // Foam patches (strongest at centre channel)
  float foam(vec2 uv, float t) {
    float channel = pow(1.0 - abs(uv.x * 2.0 - 1.0), 3.0);
    vec2  p = vec2(uv.x * 8.0, uv.y * 6.0 - t * 2.0);
    float f = fbm(p + fbm(p + t * 0.3) * 0.5);
    return channel * smoothstep(0.55, 0.75, f);
  }

  // Caustic sunlight sparkles
  float caustics(vec2 uv, float t) {
    vec2  p = uv * 14.0 + vec2(0.0, -t * 2.5);
    float c = noise(p) * noise(p * 1.7 + 3.3);
    return pow(c, 5.0) * 3.5;
  }

  void main() {
    vec2  uv    = vUv;
    float t     = uTime;

    float curr  = currentLines(uv, t);
    float rip   = ripples(uv, t) * 0.25;
    float fm    = foam(uv, t);
    float caust = caustics(uv, t);

    float water = clamp(curr * 0.7 + rip + fm * 0.5, 0.0, 1.0);

    // Base river colour
    vec3 color = mix(uColorDeep, uColorShallow, water);

    // Foam near-white overlay
    color = mix(color, vec3(0.92, 0.96, 1.0), fm * 0.6);

    // Caustic bright glints
    color += vec3(0.85, 0.95, 1.0) * caust;

    // Soft vignette toward edges
    float vig = 1.0 - 0.35 * pow(length(uv - 0.5) * 1.6, 2.0);
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface WaterBackgroundProps {
  /** Opacity of the canvas layer (0–1). Default 0.55 */
  opacity?: number;
  /** Deep water colour as hex string. Default "#1a3a52" */
  colorDeep?: string;
  /** Shallow / surface colour as hex string. Default "#4a8fa8" */
  colorShallow?: string;
}

export default function WaterBackground({
  opacity = 0.55,
  colorDeep = "#1a3a52",
  colorShallow = "#4a8fa8",
}: WaterBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.opacity = String(opacity);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ── Full-screen quad ──────────────────────────────────────
    const geometry = new THREE.PlaneGeometry(2, 2);

    const hexToVec3 = (hex: string) => {
      const c = new THREE.Color(hex);
      return new THREE.Vector3(c.r, c.g, c.b);
    };

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      },
      uColorDeep: { value: hexToVec3(colorDeep) },
      uColorShallow: { value: hexToVec3(colorShallow) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── Render loop ───────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [opacity, colorDeep, colorShallow]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
    />
  );
}
