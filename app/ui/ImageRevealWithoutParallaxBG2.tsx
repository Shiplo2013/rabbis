"use client";
import { usePathname } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import GetRightPosition from "./GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  overlayLeft: boolean;
  overlayLeftColor: string;
  animatePosition: number;
  panel?: RefObject<HTMLDivElement | null>;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uTextureResolution;
  uniform float uProgress;
  uniform float uShift;
  varying vec2 vUv;

  // ── Hashing & noise ────────────────────────────────────────
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int index = 0; index < 4; index++) {
      value += amplitude * noise(p);
      p = p * 2.02 + vec2(11.4, 7.6);
      amplitude *= 0.5;
    }
    return value;
  }

  // ── Cover-fit UV ───────────────────────────────────────────
  vec2 coverUv(vec2 uv, vec2 plane, vec2 image) {
    float planeRatio = plane.x / plane.y;
    float imageRatio = image.x / image.y;
    vec2 scale = planeRatio < imageRatio
      ? vec2(plane.y * imageRatio / plane.x, 1.0)
      : vec2(1.0, plane.x / imageRatio / plane.y);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uTextureResolution);
    float t   = clamp(uProgress, 0.0, 1.0);

    // ── Fluid & Gooey reveal ──────────────────────────────
    // Strategy: build a multi-scale density field, apply a power-curve
    // to create isolated high-density peaks (blobs), then sweep a narrow
    // threshold downward as t increases so the blobs grow and *merge*
    // into each other — that characteristic neck-join = gooey look.

    float ar = uResolution.x / uResolution.y;

    // Aspect-corrected sample space
    vec2 p = vec2(vUv.x * ar * 1.3, vUv.y * 1.3);

    // Three-scale blob density field
    float d  = fbm(p * 1.0  + vec2(0.5,  1.2));          // large blobs
    d       += fbm(p * 2.4  + vec2(3.7,  0.8)) * 0.55;   // medium
    d       += fbm(p * 5.2  + vec2(1.1,  4.3)) * 0.28;   // fine tendrils
    d       += fbm(p * 11.0 + vec2(7.3,  2.6)) * 0.12;   // micro detail
    d /= 1.95;                                             // normalise ≈ 0..1

    // Bias toward the right so the reveal starts from the right edge
    // and flows left (vUv.x = 1 on right, 0 on left)
    float bias = vUv.x * 0.48;
    d = clamp(d + bias, 0.0, 1.0);

    // Power-curve → isolated peaks that merge as threshold drops
    float blob = pow(d, 2.4);

    // Threshold sweeps from 0.88 (nearly nothing visible) → 0.05 (fully visible)
    float threshold = mix(0.88, 0.05, t);

    // Hard binary cut — no blur, gooey shape comes from blob geometry alone
    float alpha = step(threshold, blob);

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = vec4(color.rgb, color.a * alpha);
  }
`;

const getImageSrc = (bgImage: ChildProps["bgImage"]) => {
  if (typeof bgImage === "string") {
    return bgImage;
  }

  return bgImage?.src ?? "";
};

export default function ImageRevealWithoutParallaxBG2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const background = useRef<HTMLDivElement>(null);
  const canvasMount = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  const renderRef = useRef<(() => void) | null>(null);
  const uniformsRef = useRef<{
    uTexture: { value: THREE.Texture | null };
    uResolution: { value: THREE.Vector2 };
    uTextureResolution: { value: THREE.Vector2 };
    uProgress: { value: number };
    uShift: { value: number };
  } | null>(null);
  const imageSrc = getImageSrc(props.bgImage);

  useEffect(() => {
    const mount = canvasMount.current;
    if (!mount || !imageSrc) {
      return;
    }
    let isDisposed = false;
    let didInit = false;
    let cleanupThree: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;
    let idleId: number | null = null;
    let timeoutId: number | null = null;
    let removeLoadListener: (() => void) | null = null;

    const initThree = () => {
      if (isDisposed || didInit) {
        return;
      }

      didInit = true;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");

      const uniforms = {
        uTexture: { value: null as THREE.Texture | null },
        uResolution: {
          value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        },
        uTextureResolution: { value: new THREE.Vector2(1, 1) },
        uProgress: { value: props.animatePosition === 0 ? 1 : 0 },
        uShift: { value: props.animatePosition === 0 ? 0 : 0.12 },
      };
      uniformsRef.current = uniforms;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const renderScene = () => {
        renderer.render(scene, camera);
      };

      renderRef.current = renderScene;

      const texture = loader.load(imageSrc, (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.generateMipmaps = false;
        uniforms.uTexture.value = loadedTexture;
        const source = loadedTexture.image as {
          width?: number;
          height?: number;
        };
        uniforms.uTextureResolution.value.set(
          source?.width ?? 1,
          source?.height ?? 1,
        );
        renderScene();
      });

      renderScene();

      const onResize = () => {
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight);
        renderScene();
      };

      window.addEventListener("resize", onResize);

      cleanupThree = () => {
        window.removeEventListener("resize", onResize);
        renderRef.current = null;
        uniformsRef.current = null;
        texture.dispose();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    const scheduleInit = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(
          () => {
            initThree();
          },
          { timeout: 1500 },
        );
      } else {
        timeoutId = window.setTimeout(() => {
          initThree();
        }, 120);
      }
    };

    const waitForPageLoad = () => {
      if (document.readyState === "complete") {
        scheduleInit();
        return;
      }

      const onLoad = () => {
        scheduleInit();
      };
      window.addEventListener("load", onLoad, { once: true });
      removeLoadListener = () => {
        window.removeEventListener("load", onLoad);
      };
    };

    if (typeof window.IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer?.disconnect();
            waitForPageLoad();
          }
        },
        { rootMargin: "220px 0px" },
      );
      observer.observe(mount);
    } else {
      waitForPageLoad();
    }

    return () => {
      isDisposed = true;
      observer?.disconnect();
      removeLoadListener?.();
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      cleanupThree?.();
    };
  }, [imageSrc, props.animatePosition, pathname]);

  // Animation
  useGSAP(
    () => {
      if (!background.current) {
        return;
      }

      if (props.animatePosition !== 0) {
        gsap.to(
          uniformsRef.current ?? {
            uProgress: { value: 0 },
            uShift: { value: 0.12 },
          },
          {
            uProgress: 1,
            uShift: 0,
            ease: "none",
            scrollTrigger: {
              trigger: background.current,
              start: () => {
                return (
                  getTimelineOffset() +
                  GetRightPosition(background.current) -
                  window.innerWidth * 1.5
                );
              },
              end: () => {
                return "+=" + window.innerWidth * 2;
              },
              scrub: 1.4,
              onUpdate: (self) => {
                const uniforms = uniformsRef.current;
                if (!uniforms) {
                  return;
                }

                uniforms.uProgress.value = self.progress;
                uniforms.uShift.value = (1 - self.progress) * 0.12;
                renderRef.current?.();
              },
            },
          },
        );
      } else if (uniformsRef.current) {
        uniformsRef.current.uProgress.value = 1;
        uniformsRef.current.uShift.value = 0;
        renderRef.current?.();
      }
    },
    { scope: background, dependencies: [pathname] },
  );
  return (
    <div
      ref={background}
      className="absolute top-0 left-0 w-full h-full bg-black z-10"
    >
      {props.overlayLeft && (
        <div
          style={{
            backgroundImage: `linear-gradient(to right, ${props.overlayLeftColor}, ${props.overlayLeftColor}00)`,
          }}
          className="absolute left-0 top-0 w-25 h-full z-30"
        ></div>
      )}
      <div ref={canvasMount} className="relative z-10 h-full w-full" />
    </div>
  );
}
