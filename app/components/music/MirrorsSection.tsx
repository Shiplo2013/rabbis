"use client";

import ArrowLeftIcon from "@/app/assets/icons/ArrowLeftIcon";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import BgImage from "../../assets/images/mirros-bg.jpg";
// Import Swiper React components

// Import Swiper styles
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
// import required modules

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: string;
}

export default function MirrorsSection(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Use State
  const [pageData, setPageData] = useState(JSON.parse(props.data));
  // Section Animation
  useGSAP(
    () => {
      const slider = wrapper.current?.querySelector(".mirror-slider");
      const slides = slider?.querySelectorAll(".image-slider>.singel-slide");
      const thumbs = slider?.querySelectorAll(".image-thumb>.slide-thumb");
      // Slider Timeline
      const lt = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
          onUpdate: (self) => {
            const update = self.progress * 100;
            //console.log(update);
            const thumb1 = wrapper.current?.querySelector(
              `.image-thumb > .thumb-image-1`,
            );
            const thumb2 = wrapper.current?.querySelector(
              `.image-thumb > .thumb-image-2`,
            );
            const thumb3 = wrapper.current?.querySelector(
              `.image-thumb > .thumb-image-3`,
            );
            const thumb4 = wrapper.current?.querySelector(
              `.image-thumb > .thumb-image-4`,
            );
            if (update < 5) {
              (thumb1?.previousSibling as HTMLElement)?.classList.remove(
                "opacity-50",
              );
            }
            if (update > 5 && 25 > update) {
              (thumb1?.previousSibling as HTMLElement)?.classList.add(
                "opacity-50",
              );
              thumb1?.classList.remove("opacity-50");
            } else {
              thumb1?.classList.add("opacity-50");
            }
            if (update > 25 && 49 > update) {
              (thumb2?.previousSibling as HTMLElement)?.classList.add(
                "opacity-50",
              );
              thumb2?.classList.remove("opacity-50");
            } else {
              thumb2?.classList.add("opacity-50");
            }
            if (update > 50 && 75 > update) {
              (thumb3?.previousSibling as HTMLElement)?.classList.add(
                "opacity-50",
              );
              thumb3?.classList.remove("opacity-50");
            } else {
              thumb3?.classList.add("opacity-50");
            }
            if (update > 76 && 100 > update) {
              (thumb4?.previousSibling as HTMLElement)?.classList.add(
                "opacity-50",
              );
              thumb4?.classList.remove("opacity-50");
            } else {
              thumb4?.classList.add("opacity-50");
            }
          },
        },
      });
      if (slides) {
        slides?.forEach((element, index) => {
          if (index !== 0) {
            lt.to(element, {
              duration: 1,
              clipPath: "inset(0%)",
              ease: "power1.out",
            });
          }
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-black flex items-center relative z-20`}
    >
      <div className="mirror-bg absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
        <Image
          className="bg-image w-full object-cover object-center h-full"
          src={BgImage?.src}
          width="1920"
          height="1080"
          blurDataURL={BgImage?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
      </div>
      <div className="mirror-section-wrapper w-full h-full relative z-30 pt-[15vh] pb-[10vh] px-[10vw]">
        <div className="section-title">
          <h2 className="text-[#F4EDDD] text-[101px] leading-[76%]">
            {pageData?.title}
          </h2>
        </div>
        <div className="mirror-slider flex items-end justify-center relative">
          <div className="image-slider w-[28vw] h-[70vh] relative">
            {pageData.slides?.map(
              (item: { image: StaticImageData }, index: number) => {
                return (
                  <div
                    key={index}
                    style={{
                      clipPath: `${index === 0 ? "inset(0%)" : "inset(50%)"}`,
                      zIndex: `1${index}`,
                    }}
                    className="singel-slide w-full h-full absolute top-0 left-0 transition-none"
                  >
                    <Image
                      className="slide-image w-full object-cover object-center h-full"
                      src={item?.image?.src}
                      width="540"
                      height="660"
                      blurDataURL={item?.image?.blurDataURL}
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Mirrors"
                    />
                  </div>
                );
              },
            )}
          </div>
          <div className="image-thumb absolute bottom-0 right-[5%] flex flex-col gap-y-3">
            {pageData.slides?.map(
              (item: { image: StaticImageData }, index: number) => {
                return (
                  <div
                    key={index}
                    className={`slide-thumb thumb-image-${index} w-15 h-15 transition-none ${index !== 0 && "opacity-50"}`}
                  >
                    <Image
                      className="thumb-image w-full object-cover object-center h-full"
                      src={item?.image?.src}
                      width="60"
                      height="60"
                      blurDataURL={item?.image?.blurDataURL}
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Mirrors Thumb"
                    />
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className="mirror-next absolute left-[4vw] top-1/2">
          <Link
            className="group flex flex-col items-start justify-start"
            href={"/"}
          >
            <span className="icon w-5.25 transition-all duration-300 ease-in-out group-hover:-translate-x-6">
              <ArrowLeftIcon />
            </span>
            <span className="title text-[36px] text-[#F4EDDD] font-thin">
              חנוכה
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
