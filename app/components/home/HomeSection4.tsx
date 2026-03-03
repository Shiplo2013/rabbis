import sectionBg from "../../assets/images/section-bg2.jpg";
import AnimatedBackground from "../../ui/AnimatedBackground";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidth: number;
}

export default function HomeSection4(props: ChildProps) {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      let split;
      const text = document.querySelectorAll(
        ".home-section4 .section-content .text>p",
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
                  return window.innerWidth * props.animWidth;
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
      className={`${props.extraClass} home-section4 h-screen bg-no-repeat bg-center bg-cover flex items-center relative`}
    >
      <AnimatedBackground bgImage={sectionBg} />
      <div
        className={`section-content w-full h-auto flex items-center justify-center p-[5%] relative z-40`}
      >
        <div className="text text-[44px] leading-[0.9] text-[#EEECDD] font-medium w-[80%]">
          <p>
            מיום היווסדה נושאת הישיבה הקדושה את רוח הרוממות והגדלות שנטעו
            מייסדיה.
          </p>
          <p>
            היא ממשיכה עד היום להבעיר את שלהבת התורה והמוסר בלב אלפי תלמידיה
            ובוגריה.
          </p>
          <p>
            דרכה המיוחדת - המשלבת גדלות, עומק, בהירות ושאר רוח - מלווה את
            הצועדים בדרכה ומעמידה שדרת תלמידי חכמים נאמנים למורשתה.
          </p>
        </div>
      </div>
    </section>
  );
}
