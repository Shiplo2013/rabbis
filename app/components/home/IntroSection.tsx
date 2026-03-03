import TitleSplit from "@/app/ui/TitleSplit";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function IntroSection(props: ChildProps) {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Section Title 2
      const introTitle = TitleSplit(".intro-title");
      gsap.to(introTitle, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          toggleActions: "restart pause resume reverse",
        },
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.05,
      });
    });
  }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center`}
    >
      <div className="max-w-full pr-[35%] pt-[10%] pb-[10%] pl-[20%]">
        <h2 className="intro-title text-[135px] text-[#CD5E41] leading-24">
          להחיות רוח שפלים ולהחיות לב נדכאים
        </h2>
      </div>
    </section>
  );
}
