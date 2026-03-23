import Image from "next/image";
import { useRef } from "react";
import TitleImage from "../../assets/images/title-image.png";
import rightShape from "../../assets/images/title-shape1.png";
import leftShape from "../../assets/images/title-shape2.png";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
gsap.registerPlugin(ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  rightShape: boolean;
  leftShape: boolean;
}

export default function TitleSection(props: ChildProps) {
  // Ref
  const wrapper = useRef(null);
  const introTitle = useRef(null);
  // Content
  const Title = `רבנים<br/> בתקופה<br/> זו`;
  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        // Section Title 2
        gsap.set(introTitle, { xPercent: -30 });
        gsap.to(introTitle.current, {
          scrollTrigger: {
            start: () => {
              return window.innerWidth * props.animWidthText;
            },
            end: "+=50%",
            toggleActions: "restart pause resume reverse",
            //markers: true,
          },
          xPercent: 50,
        });
      });
    },
    { scope: wrapper },
  );
  // useEffect(() => {
  //   console.log();
  // }, []);
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      {props.leftShape && (
        <div className="absolute top-0 right-full w-[15vw] h-full -mr-2 select-none pointer-events-none">
          <Image
            className="parallax-image w-full object-cover object-center h-full"
            src={leftShape?.src}
            width="288"
            height="1080"
            blurDataURL={leftShape?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
      )}
      <div className="w-full pr-[15%] pt-[10%] pb-[10%] pl-[15%]">
        <div className="title-image absolute w-61.75 h-61.75 top-[21%] right-[9%] z-30 mix-blend-lighten pointer-events-none">
          <Image
            className="avatar-image w-full object-cover object-center h-full"
            src={TitleImage?.src}
            width="247"
            height="247"
            blurDataURL={TitleImage?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
        <h2
          ref={introTitle}
          className="intro-title text-[135px] text-(--theme-color) leading-24 relative z-10"
          dangerouslySetInnerHTML={{ __html: Title }}
        ></h2>
      </div>
      {props.rightShape && (
        <div className="absolute top-0 left-full w-[15vw] h-full -ml-2 select-none pointer-events-none">
          <Image
            className="parallax-image w-full object-cover object-center h-full"
            src={rightShape?.src}
            width="288"
            height="1080"
            blurDataURL={rightShape?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
      )}
    </section>
  );
}
