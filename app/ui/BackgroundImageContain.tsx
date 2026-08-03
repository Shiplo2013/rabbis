import Image from "next/image";
import { useRef } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

gsap.registerPlugin(ScrollTrigger);
interface ChildProps {
  bgImage: any;
  overlayClass: string;
}

export default function BackgroundImageContain(props: ChildProps) {
  // Select Background Element
  const background = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={background}
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className="bg-image w-full object-contain object-center h-full"
        src={props?.bgImage?.src || props?.bgImage?.url || ""}
        width={props?.bgImage?.width || 1920}
        height={props?.bgImage?.height || 1080}
        blurDataURL={CreateShimmerDataUrl(
          props?.bgImage?.width || 1920,
          props?.bgImage?.height || 1080,
        )}
        placeholder={"blur"}
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
        alt="Section Background"
      />
    </div>
  );
}
