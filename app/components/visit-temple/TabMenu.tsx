import { gsap, ScrollTrigger, useGSAP } from "@/app/ui/plugins";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import HeadBG from "../../assets/images/head-bg.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface TabsData {
  tab_title?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  videos?: any;
  gallery?: any;
}

interface ChildProps {
  data: TabsData[];
  activeTab: number;
}

export default function TabMenu(props: ChildProps) {
  const tabsData = props.data as TabsData[];
  const activeTab = props.activeTab ?? 0;

  // Ref for the tab menu container
  const tabMenuRef = useRef<HTMLDivElement>(null);

  // UseGSAP for tab menu animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    const tabContainer = document.querySelector(".tabs-content") as HTMLElement;
    const triggerPoint = window.innerWidth * 1.64; // Adjust this value as needed

    // Animate the tab menu on scroll
    if (tabMenuRef.current) {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (scrollY > triggerPoint) {
          if (tabMenuRef.current) {
            const animation = gsap.to(tabMenuRef.current, {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "slow(0.1,1,false)",
              duration: 0.5,
            });
            animations.push(animation);
          }
        } else {
          if (tabMenuRef.current) {
            const animation = gsap.to(tabMenuRef.current, {
              clipPath: "inset(0% 0% 0% 100%)",
              ease: "slow(0.1,1,false)",
              duration: 0.5,
            });
            animations.push(animation);
          }
        }
      });
    }

    // Return the cleanup function to kill the animations when the component unmounts
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [activeTab]);

  return (
    <div
      ref={tabMenuRef}
      style={{ clipPath: "inset(0% 0% 0% 100%)" }}
      className="tabs-head min-w-52 w-52 h-full flex flex-col items-center justify-center gap-y-6 py-10 fixed top-0 right-15 z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden"
    >
      <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
        <Image
          src={HeadBG?.src}
          width={210}
          height={window.innerHeight}
          blurDataURL={HeadBG.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Head Background"
          className="w-full h-full object-contain object-center"
        />
      </div>
      <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
        {tabsData.map((tab: any, index: number) => (
          <Link
            href={`/visit-temple/${index}`}
            key={index}
            className={`group flex text-[24px] leading-[1.2em] relative cursor-pointer ${activeTab === index ? "active" : ""}`}
          >
            <span className="relative">
              {tab.tab_title}
              <div
                className={`w-full h-0.5  bg-[#FBF4E6] ${activeTab === index ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-all duration-300`}
              ></div>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
