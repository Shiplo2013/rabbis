"use client";
import parse from "html-react-parser";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { gsap, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: string;
}

export default function MusicCategoryList(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [catList, setCatList] = useState(JSON.parse(props.data));
  // Section Animation
  useGSAP(
    () => {
      if (typeof window !== "undefined" && wrapper) {
        const titleList = wrapper.current?.querySelectorAll(
          ".music-cat-list>.music-cat",
        );
        if (titleList) {
          let currentIndex: string | null;
          titleList?.forEach((item) => {
            // On Mouse Enter
            item.addEventListener("mouseenter", (e) => {
              currentIndex = (e.target as HTMLElement)?.getAttribute(
                "data-index",
              );
              const imageView = document.querySelector("#hover-image");
              const imageShow = imageView?.querySelector(
                `.hover-image-${currentIndex}`,
              );
              if (imageView) {
                gsap.to(imageView, {
                  opacity: 1,
                  visibility: "visible",
                  duration: 0.4,
                  ease: "power3",
                });
              }
              if (imageShow) {
                gsap.to(imageShow, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3",
                });
              }
            });
            // On Mouse Leave
            item.addEventListener("mouseleave", (e) => {
              const imageView = document.querySelector("#hover-image");
              const imageShow = imageView?.querySelector(
                `.hover-image-${currentIndex}`,
              );
              if (imageView) {
                gsap.to(imageView, {
                  opacity: 0,
                  visibility: "hidden",
                  duration: 0.4,
                  ease: "power3",
                });
              }
              if (imageShow) {
                gsap.to(imageShow, {
                  opacity: 0,
                  duration: 0.4,
                  ease: "power3",
                });
              }
            });
          });
        }
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} h-screen flex items-center relative z-20`}
    >
      <div className="music-cat-wrapper w-full h-full px-[4.16vw] pt-[15vh] pb-[8vh]">
        <SimpleBar
          style={{ maxHeight: "75vh", paddingLeft: 30, marginLeft: -30 }}
          autoHide={false}
        >
          <div className="music-cat-list border-b border-[#F4EDDD]">
            {catList?.map(
              (
                item: { title: string; image: StaticImageData },
                index: number,
              ) => (
                <div
                  key={index}
                  data-index={index}
                  className="music-cat border-t border-[#F4EDDD] py-[3vh] cursor-pointer text-center"
                  data-image={item?.image?.src}
                >
                  <h3 className="text-[77px] font-light leading-[100%]">
                    {parse(item.title)}
                  </h3>
                </div>
              ),
            )}
          </div>
        </SimpleBar>
      </div>
    </section>
  );
}
