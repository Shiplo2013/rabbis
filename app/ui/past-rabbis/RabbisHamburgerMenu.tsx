import CloseIcon from "@/app/assets/icons/CloseIcon";
import { useAppState } from "@/app/components/AppContext";
import { useGSAP } from "@gsap/react";
import parse from "html-react-parser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { gsap } from "../../ui/plugins";
import TextSplitLines from "../TextSplitLines";
import PastRabbisThumbnail from "./PastRabbisThumbnail";

interface RabbisHamburgerMenuProps {
  extraClass?: string;
  data?: any;
  activeMenu?: boolean;
  activeMenuFunction?: (state: boolean) => void;
}

type MenuPost = {
  id?: number;
  title?: { rendered?: string };
  slug?: string;
  acf?: {
    title?: string;
    thumbnail?: { url?: string; src?: string; sizes?: { thumbnail?: string } };
  };
};

export default function RabbisHamburgerMenu() {
  // Selector
  const hamurgerMenu = useRef<HTMLDivElement>(null);
  const menuOverlay = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();
  const { allRabbisPosts, activeRabbisMenu, setActiveRabbisMenu } =
    useAppState();

  // Menu State
  const [menuTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );

  // Handle Menu Close
  useGSAP(() => {
    if (typeof window !== "undefined" && hamurgerMenu.current) {
      // Set Animations
      const closeButton = hamurgerMenu.current?.querySelector(".menu-close");
      const menuItemsTitle = hamurgerMenu.current?.querySelectorAll(
        "a.burger-menu-item .title .text",
      );
      const menuItemsImage = hamurgerMenu.current?.querySelectorAll(
        "a.burger-menu-item .image",
      );
      console.log("menuItemsTitle", menuItemsTitle);
      console.log("menuItemsImage", menuItemsImage);
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
      if (menuItemsTitle.length !== 0) {
        menuItemSplit = TextSplitLines(menuItemsTitle);
        gsap.set(menuItemsTitle, {
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
      menuTimeline
        .to(
          menuOverlay.current,
          {
            opacity: 1,
            visibility: "visible",
            ease: "none",
            duration: 0.1,
            delay: 0,
          },
          "-=0.5",
        )
        .to(
          hamurgerMenu.current,
          {
            opacity: 1,
            visibility: "visible",
            ease: "none",
            duration: 0,
            delay: 0,
          },
          "-=0.5",
        )
        .to(
          hamurgerMenu.current,
          {
            clipPath: `inset(0 0 0% 0%)`,
            ease: "expo.inOut",
            duration: 1.5,
            delay: 0,
          },
          "-=0.5",
        );
      if (titleSplit && title.current) {
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
      if (menuItemSplit && menuItemsTitle.length !== 0) {
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
      if (menuItemsImage.length !== 0) {
        menuTimeline.fromTo(
          menuItemsImage,
          {
            clipPath: "inset(100% 0% 0% 0%)",
          },
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
    }
  }, [allRabbisPosts]);

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
          clipPath: `inset(0 0 100% 100%)`,
        }}
        className="rabbis-hamburger-menu fixed top-0 right-0 z-99 flex items-start justify-start bg-black w-1/3 h-screen py-[9.6vh] pr-[8.9vw] pl-[4.5vw] opacity-0 invisible"
      >
        <div className="menu-wrapper overflow-hidden">
          <button
            onClick={() => {
              setActiveRabbisMenu(false);
            }}
            className="menu-close w-18 h-18 flex items-center justify-center rounded-full border border-[#C3A13F] absolute top-6 right-12.5 z-30 cursor-pointer"
          >
            <CloseIcon />
          </button>
          <div className="menu-title mb-[6.5vh]">
            <h3
              ref={title}
              dir="ltr"
              className="text-[55px] text-[#D1A941] leading-[70%] text-right"
            >
              רשימת הרבנים
            </h3>
          </div>
          <div className="rabbis-burger-menu flex flex-col gap-y-[4.7vh] h-[65vh] overflow-y-auto pr-2">
            {allRabbisPosts &&
              allRabbisPosts.map((item: MenuPost, index: number) => (
                <Link
                  href={item.slug ? `/past-rabbis/${item.slug}` : "#"}
                  key={index}
                  className="burger-menu-item group flex gap-x-2.5"
                >
                  <div className="image w-29.5 h-29.5 overflow-hidden border-dashed border-transparent group-hover:border-[#D1A941]">
                    <PastRabbisThumbnail item={item} />
                  </div>
                  <div
                    dir="ltr"
                    className="title text-[20px] text-[#D1A941] leading-[90%] max-w-40 text-right"
                  >
                    <p className="text">
                      {parse(item?.title?.rendered || item?.acf?.title || "")}
                    </p>
                  </div>
                </Link>
              ))}
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
