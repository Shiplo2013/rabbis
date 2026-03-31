import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import markImage1 from "../../assets/images/mark-image1.jpg";
import markImage2 from "../../assets/images/mark-image2.jpg";
import markImage3 from "../../assets/images/mark-image3.jpg";
import { gsap, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function MarkOfTheRoad(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selectors
  const wrapper = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageMove = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  const image1 = useRef<HTMLImageElement>(null);
  const image2 = useRef<HTMLImageElement>(null);
  //Section Data
  const title = `ציוני<br/>דרך`;
  const secTitle = `שנת תרל"ז:<br/>ייסוד כולל קובנה לאברכים`;
  const secTitle2 = `שנת תרמ"ב:<br/>יסוד הישיבה לבחורים`;

  // Section Animation
  useGSAP(
    () => {
      // Section Moving Image
      gsap.set(imageMove.current, { x: 200 });
      const tl = gsap.timeline({
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText - 0.8;
          },
          end: () => "+=" + window.innerWidth * 1.5,
          scrub: 2,
        },
      });
      tl.to(imageMove.current, {
        x: -200,
        ease: "easeIn",
      });

      // Section Image 1
      gsap.set(image1.current, { y: 300, opacity: 0 });
      gsap.to(image1.current, {
        y: 0,
        opacity: 1,
        duration: 2,
        delay: -0.5,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * (props.animWidthText + 0.2);
          },
          toggleActions: "restart pause play reverse",
        },
      });

      // Section Image 2
      gsap.set(image2.current, { y: 300, opacity: 0 });
      gsap.to(image2.current, {
        y: 0,
        opacity: 1,
        duration: 2,
        delay: -0.5,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * (props.animWidthText + 0.9);
          },
          toggleActions: "restart pause play reverse",
        },
      });

      document.fonts.ready.then(() => {
        // Section Title 1
        gsap.set(titleRef.current, { opacity: 1 });
        let splititle;
        SplitText.create(titleRef.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              duration: 2,
              yPercent: 100,
              opacity: 0,
              delay: -0.5,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth * props.animWidthText;
                },
                toggleActions: "restart pause play reverse",
              },
            });
            return splititle;
          },
        });
        // Section Text 1
        gsap.set(text1.current, { opacity: 1 });
        let splitext1;
        SplitText.create(text1.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splitext1 = gsap.from(self.lines, {
              duration: 1,
              yPercent: 100,
              opacity: 0,
              delay: 0,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth * (props.animWidthText + 0.5);
                },
                toggleActions: "restart pause play reverse",
              },
            });
            return splitext1;
          },
        });
        // Section Text 2
        gsap.set(text2.current, { opacity: 1 });
        let splitext2;
        SplitText.create(text2.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splitext2 = gsap.from(self.lines, {
              duration: 1,
              yPercent: 100,
              opacity: 0,
              delay: 0,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth * (props.animWidthText + 1.1);
                },
                toggleActions: "restart pause play reverse",
              },
            });
            return splitext2;
          },
        });
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[4.5vw] gap-x-[10vw]">
        <div dir="ltr" className="section-title flex items-end w-[15vw]">
          <h2
            ref={titleRef}
            className="text-[161px] leading-[0.7em] text-(--theme-color) text-right"
          >
            {parse(title)}
          </h2>
        </div>
        <div className="section-content flex items-center gap-x-[2.6vw] w-48.5vw">
          <div ref={image1} className="image w-110.5 h-111.5 relative">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage1.src}
              width={"442"}
              height={"446"}
              alt={"Section Image"}
            />
            <div
              ref={imageMove}
              className="over-image absolute w-82.5 h-85 top-0 right-0 -mt-[8.9vh] -mr-[6.6vw]"
            >
              <Image
                className="w-full object-cover object-center h-full"
                src={markImage2.src}
                width={"329"}
                height={"340"}
                alt={"Section Image"}
              />
            </div>
          </div>
          <div dir="ltr" className="title">
            <h4
              ref={text1}
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
            >
              {parse(secTitle)}
            </h4>
          </div>
        </div>
        <div className="section-content flex items-center gap-x-[2.6vw] w-[49.2vw]">
          <div ref={image2} className="image w-134.75 h-103.75">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage3.src}
              width={"539"}
              height={"415"}
              alt={"Section Image"}
            />
          </div>
          <div dir="ltr" className="title">
            <h4
              ref={text2}
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
            >
              {parse(secTitle2)}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
