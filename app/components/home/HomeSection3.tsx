import Image from "next/image";
import Juniper from "../../assets/images/juniper.jpg";
import sectionBg from "../../assets/images/section-bg.jpg";
import { gsap, SplitText, useGSAP } from "../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
}

export default function HomeSection3(props: ChildProps) {
  function moveImage(e: { screenY: number; clientX: any; clientY: any }) {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;

    gsap.to(".home-section3 .over-title", {
      x: moveX * 0.05, // Speed factor
      y: moveY * 0.05,
      ease: "power2.out",
      duration: 0.5,
    });
  }
  useGSAP(() => {
    gsap.set(".home-section3 .section-image", {
      scale: 0.6,
    });
    // Section 2 Image
    gsap.to(".home-section3 .section-image", {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthImage;
        },
        toggleActions: "restart pause resume reverse",
      },
      scale: 1,
      duration: 0.6,
      ease: "slow.inOut",
    });
    document.fonts.ready.then(() => {
      let split;
      const text = document.querySelectorAll(
        ".home-section3 .section-content .text>p",
      );
      text.forEach((element) => {
        SplitText.create(element, {
          type: "words,lines",
          linesClass: "line overflow-hidden",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            split = gsap.from(self.lines, {
              scrollTrigger: {
                start: () => {
                  return window.innerWidth * props.animWidthText;
                },
                toggleActions: "restart pause resume reverse",
              },
              duration: 2,
              yPercent: 100,
              opacity: 0,
              stagger: 1,
              delay: 0,
              ease: "expo.out",
            });
            return split;
          },
        });
      });
    });
  }, []);
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      onMouseMove={(e) => {
        moveImage(e);
      }}
      className={`${props.extraClass} home-section3 h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    >
      <div
        className={`section-content w-full h-auto flex items-center justify-start pl-[5%] relative z-40`}
      >
        <div className="section-image w-[50%] h-screen">
          <Image
            className="relative z-10 w-full h-full object-center object-cover"
            src={Juniper?.src}
            width={Juniper?.width}
            height={Juniper?.height}
            blurDataURL={Juniper?.blurDataURL}
            placeholder={"blur"}
            alt="Juniper"
          />
        </div>
        <div className="section-content w-[50%] relative pt-12 pr-[10%]">
          <h2 className="over-title absolute top-[7%] right-[20%] text-[#D1A941] text-[290px] font-bold leading-[0.75] opacity-20 z-0">
            עוז
            <br />
            רוח
          </h2>
          <div className="text text-[55px] leading-[0.8] w-107.5 max-w-[70%] relative">
            <p className="mb-7.5">מרן רבי משה מרדכי אפשטיין זצוק"ל </p>
            <p className="font-bold">
              הנהיג את הישיבה במסירות נפש מופלאה בתקופות סוערות, והנחיל לתלמידיו
              מושגים נעלים של עיון התורה ועמלה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
