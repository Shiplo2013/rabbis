import CloseIcon from "@/app/assets/icons/CloseIcon";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "../../ui/plugins";
import TextSplitLines from "../TextSplitLines";

interface RabbisHamburgerMenuProps {
  extraClass?: string;
  data?: string;
  activeMenu?: boolean;
  activeMenuFunction?: (state: boolean) => void;
}

export default function RabbisHamburgerMenu(props: RabbisHamburgerMenuProps) {
  // Selector
  const hamurgerMenu = useRef<HTMLDivElement>(null);
  const menuOverlay = useRef<HTMLDivElement>(null);

  // Section Data
  const [menuData, setMenuData] = useState(
    props.data ? JSON.parse(props.data) : null,
  );

  // Menu State
  const [menuTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );

  // Handle Menu Close
  useGSAP(() => {
    // Set Animations
    const title = hamurgerMenu.current?.querySelector(".menu-title>h3");
    const closeButton = hamurgerMenu.current?.querySelector(".menu-close");
    const menuItems =
      hamurgerMenu.current?.querySelectorAll(".burger-menu-item");
    const menuItemsTitle = hamurgerMenu.current?.querySelectorAll(
      ".burger-menu-item .title>p",
    );
    const menuItemsImage = hamurgerMenu.current?.querySelectorAll(
      ".burger-menu-item .image",
    );
    // intial state
    let titleSplit;
    if (title) {
      titleSplit = TextSplitLines(title);
      gsap.set(title, {
        perspective: 400,
      });
      gsap.set(titleSplit, {
        yPercent: 150,
        opacity: 0,
      });
    }

    // Menu Items Text
    let menuItemSplit;
    if (menuItemsTitle) {
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
    if (menuItemsImage) {
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
  }, []);

  useGSAP(() => {
    props.activeMenu ? menuTimeline.play() : menuTimeline.reverse();

    if (props.activeMenu) {
      document.body.classList.add("!overflow-hidden");
      document.body.classList.remove("!overflow-auto");
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
    }
  }, [props.activeMenu]);
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
              props.activeMenuFunction?.(false);
            }}
            className="menu-close w-18 h-18 flex items-center justify-center rounded-full border border-[#C3A13F] absolute top-6 right-12.5 z-30 cursor-pointer"
          >
            <CloseIcon />
          </button>
          <div className="menu-title mb-[6.5vh]">
            <h3
              dir="ltr"
              className="text-[55px] text-[#D1A941] leading-[70%] text-right"
            >
              רשימת הרבנים
            </h3>
          </div>
          <div className="rabbis-burger-menu flex flex-col gap-y-[4.7vh] h-[65vh] overflow-y-auto pr-2">
            {menuData?.map((item: any, index: number) => (
              <Link
                href={item.link}
                key={index}
                className="burger-menu-item group flex gap-x-2.5"
              >
                <div className="image w-29.5 h-29.5 overflow-hidden border-dashed border-transparent group-hover:border-[#D1A941]">
                  <div className="image-inner w-full h-full group-hover:scale-110 transition-all duration-300">
                    <Image
                      className="w-full h-full object-cover object-center"
                      src={item.image.src}
                      width={122}
                      height={125}
                      alt={item.title}
                    />
                  </div>
                </div>
                <div
                  dir="ltr"
                  className="title text-[20px] text-[#D1A941] leading-[90%] max-w-40 text-right"
                >
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={menuOverlay}
        onClick={() => {
          props.activeMenuFunction?.(false);
        }}
        className="overlay fixed top-0 right-0 w-screen h-screen z-50 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"
      ></div>
    </>
  );
}
