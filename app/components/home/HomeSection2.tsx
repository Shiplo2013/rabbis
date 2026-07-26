import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import TextSplitLines from "@/app/ui/TextSplitLines";
import parse from "html-react-parser";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Data {
  image?: any;
  title?: string;
  foating_image?: any;
  text?: string;
  rabbis_link?: string;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
  sectionData: Data;
}

export default function HomeSection2(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

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
            return window.innerWidth > 1024
              ? window.innerWidth * props.animWidthImage
              : (wrapper.current?.getBoundingClientRect().top || 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
          },
          toggleActions: "restart pause resume reverse",
        },
        scale: 1,
        duration: 0.6,
        ease: "none",
      });
    }
    document.fonts.ready.then(() => {
      const text = wrapper.current?.querySelector(".section-content .text");
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
            return window.innerWidth > 1024
              ? window.innerWidth * (props.animWidthText - 0.7)
              : (wrapper.current?.getBoundingClientRect().top || 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
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
    const bigTitle = wrapper.current?.querySelector(".over-title");
    if (bigTitle) {
      gsap.to(bigTitle, {
        translateX: "-15vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth > 1024
              ? window.innerWidth * props.animWidthImage
              : (wrapper.current?.getBoundingClientRect().top || 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
    }
    const overImage = wrapper.current?.querySelector(".mouse-follower");
    if (overImage) {
      gsap.to(overImage, {
        translateX: "10vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth > 1024
              ? window.innerWidth * props.animWidthImage
              : (wrapper.current?.getBoundingClientRect().top || 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Any additional effect logic can go here
    //console.log(props.sectionData);
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
      className={`${props.extraClass} home-section2 h-auto lg:h-screen flex lg:items-center flex-col-reverse lg:flex-row overflow-hidden relative`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-image h-auto lg:h-screen w-full lg:w-[40vw]">
        <Image
          className="relative z-10 object-cover object-center w-full h-full"
          src={props.sectionData?.image?.url}
          width={768}
          height={929}
          loading="lazy"
          blurDataURL={CreateShimmerDataUrl(768, 929)}
          placeholder={"blur"}
          alt="Section Image"
        />
      </div>
      <div
        className={`section-content w-full lg:w-[60vw] min-h-[60vh] lg:h-full flex items-center justify-center pr-[10%] pl-[5%] pt-[8%] relative z-40`}
      >
        <h2 className="over-title absolute top-[35%] right-[7%] text-[#D1A941] text-[120px] sm:text-[150px] lg:text-[290px] font-bold leading-[0.75] -mt-[22%] opacity-20 z-0">
          {parse(props.sectionData?.title || "")}
        </h2>
        <div className="mouse-follower absolute top-[20%] right-[20%] w-40 h-auto sm:w-auto">
          <Image
            className="relative z-10"
            src={props.sectionData?.foating_image?.url}
            width={252}
            height={404}
            loading="lazy"
            blurDataURL={CreateShimmerDataUrl(252, 404)}
            placeholder={"blur"}
            alt="Koddisha"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
        </div>
        <div
          dir="ltr"
          className="text-[#EEECDD] text-[30px] sm:text-[40px] lg:text-[70px] leading-[0.8] w-4/5 relative z-40 text-right"
        >
          <Link
            href={getRabbisURL(props.sectionData?.rabbis_link || "#") || "#"}
            className="block"
          >
            <div className="text">{parse(props.sectionData?.text || "")}</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
