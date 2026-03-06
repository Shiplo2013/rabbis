import Image from "next/image";
import Koddisha from "../../assets/images/kaddisha.jpg";
import sectionImage from "../../assets/images/section-image2.jpg";
import { gsap, SplitText, useGSAP } from "../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
}

export default function HomeSection2(props: ChildProps) {
  function moveImage(e: { screenY: number; clientX: any; clientY: any }) {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;

    // Apply movement to elements with parallax classes
    gsap.to(".mouse-follower", {
      x: moveX * 0.05, // Speed factor
      y: moveY * 0.05,
      ease: "power2.out",
      duration: 0.5,
    });
    gsap.to(".over-title", {
      x: moveX * 0.03, // Speed factor
      y: moveY * 0.03,
      ease: "power2.out",
      duration: 0.5,
    });
  }
  useGSAP(() => {
    gsap.set(".home-section2 .section-image", {
      scale: 0.6,
    });
    // Section 2 Image
    gsap.to(".home-section2 .section-image", {
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
        ".home-section2 .section-content .text>p",
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
      dir="rtl"
      onMouseMove={(e) => {
        moveImage(e);
      }}
      className={`${props.extraClass} home-section2 h-screen flex items-center`}
    >
      <div className="section-image h-screen w-[40vw]">
        <Image
          className="relative z-10 object-cover object-center w-full h-full"
          src={sectionImage?.src}
          width={sectionImage?.width}
          height={sectionImage?.height}
          loading="lazy"
          blurDataURL={sectionImage?.blurDataURL}
          placeholder={"blur"}
          alt="Section Image"
        />
      </div>
      <div
        className={`section-content w-[60vw] h-full flex items-center justify-center pr-[10%] pl-[5%] pt-[8%] relative z-40`}
      >
        <h2 className="over-title absolute top-[52%] right-[7%] text-[#D1A941] text-[290px] font-bold leading-[0.75] -mt-[22%] opacity-20 z-0">
          סבא
          <br />
          קדישא
        </h2>
        <div className="mouse-follower absolute top-[20%] right-[8%]">
          <Image
            className="relative z-10"
            src={Koddisha?.src}
            width={Koddisha?.width}
            height={Koddisha?.height}
            loading="lazy"
            blurDataURL={Koddisha?.blurDataURL}
            placeholder={"blur"}
            alt="Koddisha"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
        </div>
        <div className="text text-[#EEECDD] text-[70px] leading-[0.8] w-4/5 relative z-40">
          <p>
            הסבא מסלבודקא מחולל ומייסד הישיבה שהצמיח ברוממותו דורות של תלמידים
            נעלים, עיצב נפשות ברוח גדלות האדם ומאז ועד היום ניכרת השפעתו בכל בית
            מדרש הנושא את רוחו ומורשתו
          </p>
        </div>
      </div>
    </section>
  );
}
