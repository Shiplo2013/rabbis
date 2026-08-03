import CloseIcon from "@/app/assets/icons/CloseIcon";
import { useAppState } from "@/app/components/AppContext";
import { useGSAP } from "@gsap/react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import RabbisThumb from "../../assets/images/rabbis-thumb.jpg";
import { gsap } from "../../ui/plugins";
import TextSplitLines from "../TextSplitLines";

interface RabbisHamburgerMenuProps {
  extraClass?: string;
  data?: PastRabbis[];
}

type PastRabbis = {
  buttonText: string;
  title: string;
  subtitle: string;
  thumbnail: any;
  text: string;
  buttonLink?: string;
};

function resolveNestedImageUrl(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const directValue = record.url ?? record.src ?? record.source_url;

  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  return (
    resolveNestedImageUrl(record.full) ||
    resolveNestedImageUrl(record.large) ||
    resolveNestedImageUrl(record.medium_large) ||
    resolveNestedImageUrl(record.medium) ||
    resolveNestedImageUrl(record.thumbnail) ||
    resolveNestedImageUrl(record.sizes) ||
    resolveNestedImageUrl(record.media_details) ||
    undefined
  );
}

function resolveImageSrc(image: unknown, fallback: string) {
  if (typeof image === "string" && image.trim()) {
    return image.trim();
  }

  return resolveNestedImageUrl(image) || fallback;
}

export default function RabbisHamburgerMenuHome(
  props: RabbisHamburgerMenuProps,
) {
  // Selector
  const hamurgerMenu = useRef<HTMLDivElement>(null);
  const menuOverlay = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();
  const allPosts = props.data || ([] as PastRabbis[]);
  const { activeRabbisMenu, setActiveRabbisMenu } = useAppState();

  // Menu State
  const [menuTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );

  // Handle Menu Close
  useGSAP(() => {
    //console.log(allPosts);
    const animations: gsap.core.Animation[] = [];
    // Set Animations
    const closeButton = hamurgerMenu.current?.querySelector(".menu-close");
    const menuItemsTitle = hamurgerMenu.current?.querySelectorAll(
      ".burger-menu-item .title .text",
    );
    const menuItemsImage = hamurgerMenu.current?.querySelectorAll(
      ".burger-menu-item .image",
    );
    const menuItemsTitleArray = menuItemsTitle
      ? Array.from(menuItemsTitle)
      : [];
    // intial state
    let titleSplit;
    if (title.current) {
      titleSplit = TextSplitLines(title.current);
      gsap.set(title.current, {
        perspective: 400,
      });
      gsap.set(titleSplit, {
        yPercent: 150,
        opacity: 0,
      });
    }

    // Menu Items Text
    let menuItemSplit;
    if (menuItemsTitleArray.length) {
      menuItemSplit = menuItemsTitleArray
        .map((item) => TextSplitLines(item))
        .flat();
      gsap.set(menuItemsTitleArray, {
        perspective: 400,
      });
      gsap.set(menuItemSplit, {
        yPercent: 150,
        opacity: 0,
      });
    }
    // Close button
    if (closeButton) {
      gsap.set(closeButton, {
        scale: 0,
        rotate: 90,
      });
    }

    // Menu Animation
    if (hamurgerMenu.current && menuOverlay.current) {
      gsap.set(menuOverlay.current, {
        opacity: 0,
        visibility: "hidden",
      });
      menuTimeline.to(menuOverlay.current, {
        opacity: 1,
        visibility: "visible",
        ease: "none",
        duration: 0.1,
        delay: 0,
      });
    }
    // Hamburger Menu
    if (hamurgerMenu.current) {
      menuTimeline.to(hamurgerMenu.current, {
        opacity: 1,
        visibility: "visible",
        ease: "none",
        duration: 0,
        delay: 0,
      });
      menuTimeline.to(hamurgerMenu.current, {
        clipPath: `inset(0% 0% 0% 0%)`,
        ease: "expo.inOut",
        duration: 1.5,
        delay: 0,
      });
    }
    if (titleSplit) {
      menuTimeline.to(
        titleSplit,
        {
          yPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 2,
          delay: 0,
        },
        "-=1.3",
      );
    }
    if (menuItemSplit) {
      menuTimeline.to(
        menuItemSplit,
        {
          yPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 2,
          delay: 0,
          stagger: 0,
        },
        "-=2",
      );
    }
    if (menuItemsImage?.length) {
      menuTimeline.set(menuItemsImage, {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      menuTimeline.to(
        menuItemsImage,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "expo.inOut",
          duration: 1.5,
          delay: 0,
        },
        "-=1.9",
      );
    }
    if (closeButton) {
      menuTimeline.to(
        closeButton,
        {
          scale: 1,
          rotate: 0,
          ease: "expo.inOut",
          duration: 1.5,
          delay: 0,
        },
        "-=1.5",
      );
    }
    animations.push(menuTimeline);

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname]);

  useGSAP(() => {
    activeRabbisMenu ? menuTimeline.play() : menuTimeline.reverse();

    if (activeRabbisMenu) {
      document.body.classList.add("!overflow-hidden");
      document.body.classList.remove("!overflow-auto");
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
    }
  }, [activeRabbisMenu]);
  return (
    <>
      <div
        ref={hamurgerMenu}
        style={{
          clipPath: `inset(0% 0% 100% 100%)`,
        }}
        className="rabbis-hamburger-menu fixed top-0 right-0 z-111 flex items-start justify-start bg-black w-80 sm:w-90 lg:w-1/3 h-screen pt-[10vh] pb-[5vh] sm:py-[9.6vh] pr-[8.9vw] pl-[4.5vw] opacity-0 invisible"
      >
        <div className="menu-wrapper overflow-hidden">
          <button
            onClick={() => {
              setActiveRabbisMenu(false);
            }}
            className="menu-close lg:w-18 lg:h-18 sm:w-12 sm:h-12 w-10 h-10 p-3 sm:p-3.5 flex items-center justify-center rounded-full border border-[#C3A13F] absolute top-6 right-6 lg:right-12.5 z-30 cursor-pointer"
          >
            <CloseIcon />
          </button>
          <div className="menu-title mb-10 sm:mb-[6.5vh]">
            <h3
              ref={title}
              dir="ltr"
              className="text-[32px] sm:text-[40px] lg:text-[55px] text-[#D1A941] leading-[70%] text-right"
            >
              רשימת הרבנים
            </h3>
          </div>
          <div className="rabbis-burger-menu flex flex-col gap-y-[4.7vh] h-[80vh] sm:h-[75vh] lg:h-[65vh] overflow-y-auto pr-2">
            {allPosts.map((item: PastRabbis, index: number) => {
              const thumbnailSrc = resolveImageSrc(
                item?.thumbnail,
                RabbisThumb.src,
              );

              return (
                <Link
                  href={item.buttonLink || "#"}
                  key={index}
                  className="burger-menu-item group flex gap-x-2.5"
                >
                  <div className="image w-20 h-20 lg:w-29.5 lg:h-29.5 overflow-hidden border-dashed border-transparent group-hover:border-[#D1A941]">
                    <div className="image-inner w-full h-full group-hover:scale-110 transition-all duration-300 grayscale group-hover:grayscale-0">
                      {thumbnailSrc ? (
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={thumbnailSrc}
                          width={122}
                          height={125}
                          loading="lazy"
                          alt={item?.title || "Rabbi image"}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1a1a1a]" />
                      )}
                    </div>
                  </div>
                  <div
                    dir="ltr"
                    className="title text-[18px] lg:text-[20px] text-[#D1A941] leading-[90%] max-w-40 text-right"
                  >
                    <p className="text">{parse(item?.title || "")}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div
        ref={menuOverlay}
        onClick={() => {
          setActiveRabbisMenu(false);
        }}
        className="overlay fixed top-0 right-0 w-screen h-screen z-50 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"
      ></div>
    </>
  );
}
