import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import TextSplitLines from "@/app/ui/TextSplitLines";
import parse from "html-react-parser";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Data {
  image?: any;
  title?: string;
  text_1?: string;
  text_2?: string;
  rabbis_link?: string;
  background_image?: any;
}
interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
  sectionData: Data;
}

export default function HomeSection3(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

  // Section Animations
  useGSAP(() => {
    // Selectors
    const sectionImage = wrapper.current?.querySelector(".section-image");
    // Animations
    if (sectionImage) {
      gsap.set(sectionImage, {
        scale: 0.6,
      });
      // Section 2 Image
      gsap.to(sectionImage, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthImage;
          },
          toggleActions: "restart pause play reverse",
        },
        scale: 1,
        duration: 0.6,
        ease: "none",
      });
    }
    document.fonts.ready.then(() => {
      const text = wrapper.current?.querySelectorAll(".section-content .text");
      if (!text) return;
      const textSplit = TextSplitLines(text);
      gsap.set(text, {
        perspective: 400,
      });
      gsap.set(textSplit, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(textSplit, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * (props.animWidthText - 0.7);
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
        yPercent: 0,
        opacity: 1,
        delay: 0,
        ease: "expo.inOut",
        duration: 3,
      });
    });
    // Parallax Effect
    const bigTitle = wrapper.current?.querySelector(
      ".section-content .over-title",
    );
    if (bigTitle) {
      gsap.to(bigTitle, {
        translateX: "-15vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthImage;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
    }
  }, [pathname]);

  const getRabbisURL = (urlString: string) => {
    if (!urlString) return;
    // 1. Parse the string into a URL object
    const url = new URL(urlString);

    // 2. Split the pathname and filter out empty strings (caused by trailing slashes)
    const segments = url.pathname.split("/").filter(Boolean);

    // 3. Get the last segment
    const slug = "/past-rabbis/" + segments[segments.length - 1];

    return slug;
  };

  return (
    <section
      ref={wrapper}
      dir="rtl"
      // onMouseMove={(e) => {
      //   moveImage(e);
      // }}
      className={`${props.extraClass} home-section3 h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <BackgroundImage2
        bgImage={props.sectionData?.background_image}
        panel={wrapper}
        start={props.animWidthImage}
      />
      <div
        className={`section-content w-full h-auto flex items-center justify-start pl-[5%] relative z-40`}
      >
        <div className="section-image w-[50%] h-screen">
          <Image
            className="relative z-10 w-full h-full object-center object-cover"
            src={props.sectionData?.image?.url}
            width={820}
            height={929}
            loading="lazy"
            blurDataURL={CreateShimmerDataUrl(820, 929)}
            placeholder={"blur"}
            alt="Juniper"
          />
        </div>
        <div className="section-content w-[50%] relative pt-12 pr-[10%]">
          <h2 className="over-title absolute top-[7%] right-[20%] text-[#D1A941] text-[290px] font-bold leading-[0.75] opacity-20 z-0">
            {parse(props.sectionData?.title || "")}
          </h2>
          <div
            dir="ltr"
            className="text-[55px] leading-[0.8] w-107.5 max-w-[70%] relative pb-2 flex flex-col z-40 text-right"
          >
            <Link
              href={getRabbisURL(props.sectionData?.rabbis_link || "#") || "#"}
              className="block"
            >
              <div className="text mb-7.5">
                {parse(props.sectionData?.text_1 || "")}
              </div>
            </Link>
            <Link
              href={getRabbisURL(props.sectionData?.rabbis_link || "#") || "#"}
              className="block"
            >
              <div className="text font-bold">
                {parse(props.sectionData?.text_2 || "")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
