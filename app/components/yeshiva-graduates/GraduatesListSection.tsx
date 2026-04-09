import SingleGraduates from "@/app/ui/SingleGraduates";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import image1 from "../../assets/images/graduates-banner-image1.png";
import image2 from "../../assets/images/graduates-banner-image2.png";
import { gsap, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  GraduateData: { title: string; content: string }[];
}

export default function GraduateListSection(props: ChildProps) {
  // Data
  const PageLinks = [
    {
      title: "כנסת המנהגים",
      link: "/",
      image: image1,
    },
    {
      title: "עד שבחברון - חדשות",
      link: "/",
      image: image2,
    },
  ];
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const pageImage = useRef<HTMLDivElement>(null);
  // Section Data
  const Years = ["תשפ״ו", "תשפ״ה", "תשפ״ד", "תשפ״ג"];

  // Use GSAP function
  const { contextSafe } = useGSAP({ scope: wrapper });
  // Section Animation
  const handleMouseOver = contextSafe((e: any) => {
    const index = e.target.getAttribute("data-index");
    if (index) {
      const image = pageImage.current?.querySelector(`.page-${index}`);
      if (image) {
        gsap.to(image, {
          opacity: 1,
          marginTop: 0,
          duration: 0.5,
          ease: "expo.inOut",
          delay: 0,
        });
      }
    }
  });
  const handleMouseOut = contextSafe((e: any) => {
    const index = e.target.getAttribute("data-index");
    if (index) {
      const image = pageImage.current?.querySelector(`.page-${index}`);
      if (image) {
        gsap.to(image, {
          opacity: 0,
          marginTop: "100vh",
          duration: 0,
          ease: "expo.inOut",
          delay: 0,
        });
      }
    }
  });
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="graduates-wrapper w-full h-auto flex items-center gap-x-[9.16vw]">
        <div className="sheet-content flex items-stretch gap-x-[3.3vw] will-change-transform">
          {props.GraduateData?.map((item, index) => (
            <SingleGraduates key={index} data={item} />
          ))}
        </div>
        <div className="graduate-readmore w-[38vw] flex flex-col gap-y-[9.36vh] relative">
          {PageLinks.map((item, index) => (
            <div
              key={index}
              className="readmore-link group border-t border-b border-[#D1A941] relative overflow-hidden"
            >
              <Link
                href={"/"}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOut}
                data-index={index}
                className="text-[55px] leading-[70%] text-[#D1A941] py-[5.38vh] block relative z-30"
              >
                {item.title}
              </Link>
              <div className="absolute top-0 left-0 bg-black w-full h-full z-10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(.625, .05, 0, 1)] group-hover:translate-y-0"></div>
            </div>
          ))}
          <div
            ref={pageImage}
            className="page-images absolute left-full top-1/2 w-[40vw] h-0"
          >
            <div className="page-images-wrapper w-full h-full relative">
              {PageLinks.map((item, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`page-${index} w-full absolute h-screen -translate-y-1/2 px-[6vw] py-[5vh] bg-black opacity-0 mt-[100vh]`}
                >
                  <Image
                    className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                    src={item.image?.src}
                    width="356"
                    height="534"
                    blurDataURL={item.image?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Rabbis"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
