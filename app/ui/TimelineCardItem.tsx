import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import MinusIcon2 from "../assets/icons/MinusIcon2";
import PlusIcon from "../assets/icons/PlusIcon";
import { gsap, useGSAP } from "../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  cardClass: string;
  data: {
    title: string;
    text: string;
    images: { image1: StaticImageData; image2: StaticImageData };
  };
  dataIndex: number;
}

export default function TimelineCardItem(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Use Gsap
  const { contextSafe } = useGSAP({ scope: wrapper });

  // Active Card Animation
  const ActiveCardAnimation = (item: any) => {
    item?.classList.add("z-[100]", "active");
    const imagesDiv = item?.querySelector(".expand-images");
    const imagesWrap = item?.querySelector(".expand-images>.images-wrapper");
    const button = item?.querySelector(".expand-button");
    const plusButton = item?.querySelector(".expand-button .plus-button");
    const minusButton = item?.querySelector(".expand-button .minus-button");
    if (button) {
      button.classList.remove("opacity-0");
    }
    if (plusButton) {
      gsap.to(plusButton, {
        yPercent: -100,
        ease: "expo.inOut",
        duration: 2,
      });
    }
    if (minusButton) {
      gsap.to(minusButton, {
        yPercent: -100,
        ease: "expo.inOut",
        duration: 2,
      });
    }
    const tl = gsap.timeline();
    if (imagesDiv) {
      tl.to(imagesDiv, {
        opacity: 1,
        visibility: "visible",
        delay: 0,
        duration: 0,
      });
    }
    if (imagesWrap) {
      tl.to(imagesWrap, {
        x: "0%",
        ease: "expo.inOut",
        duration: 2,
      });
    }
    // Other Items Animation
    const itemIndex = Number(item?.getAttribute("data-index"));
    if (itemIndex && itemIndex < 5) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      const siblingIndex3 = siblingIndex2?.nextElementSibling;
      const siblingIndex4 = siblingIndex3?.nextElementSibling;
      // Siblings Animation
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "-55vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "-40vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "-30vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex4) {
        gsap.to(siblingIndex4, {
          x: "-15vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
    if (itemIndex === 5) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      const siblingIndex3 = siblingIndex2?.nextElementSibling;
      // Siblings Animation
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "-55vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "-40vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "-20vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
    if (itemIndex === 6) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      // Siblings Animation
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "-52vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "-25vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
    if (itemIndex === 7) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      // Siblings Animation
      if (item) {
        gsap.to(item, {
          x: "15vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "-25vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "-5vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
    if (itemIndex === 8) {
      const siblingIndex1 = item?.previousElementSibling;
      const siblingIndex2 = siblingIndex1?.previousElementSibling;
      const siblingIndex3 = siblingIndex2?.previousElementSibling;
      // Siblings Animation
      if (item) {
        gsap.to(item, {
          x: "44vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "45vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "40vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "30vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
  };
  // Deactive Card Animation
  const DeactiveCardAnimation = (item: any) => {
    const imagesDiv = item?.querySelector(".expand-images");
    const imagesWrap = item?.querySelector(".expand-images>.images-wrapper");
    const button = item?.querySelector(".expand-button");
    const plusButton = item?.querySelector(".expand-button .plus-button");
    const minusButton = item?.querySelector(".expand-button .minus-button");

    const tl = gsap.timeline({
      onComplete: () => {
        if (button) {
          button.classList.add("opacity-0");
        }
        item?.classList.remove("z-[100]", "active");
      },
    });
    if (plusButton) {
      tl.to(plusButton, {
        yPercent: 0,
        ease: "expo.inOut",
        duration: 2,
        delay: 0,
      });
    }
    if (minusButton) {
      tl.to(
        minusButton,
        {
          yPercent: 0,
          ease: "expo.inOut",
          duration: 2,
          delay: 0,
        },
        "-=2",
      );
    }
    if (imagesWrap) {
      tl.to(
        imagesWrap,
        {
          x: "100%",
          ease: "expo.inOut",
          duration: 2,
        },
        "-=2",
      );
    }
    if (imagesDiv) {
      tl.to(imagesDiv, {
        opacity: 0,
        visibility: "hidden",
        delay: 0,
        duration: 0,
      });
    }
    // Other Items Animation
    const itemIndex = Number(item?.getAttribute("data-index"));
    if (itemIndex && itemIndex < 5) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      const siblingIndex3 = siblingIndex2?.nextElementSibling;
      const siblingIndex4 = siblingIndex3?.nextElementSibling;
      // Siblings Animation
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex4) {
        gsap.to(siblingIndex4, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    } else if (itemIndex > 4 && itemIndex < 8) {
      const siblingIndex1 = item?.nextElementSibling;
      const siblingIndex2 = siblingIndex1?.nextElementSibling;
      const siblingIndex3 = siblingIndex2?.nextElementSibling;
      // Siblings Animation
      if (item) {
        gsap.to(item, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    } else {
      const siblingIndex1 = item?.previousElementSibling;
      const siblingIndex2 = siblingIndex1?.previousElementSibling;
      const siblingIndex3 = siblingIndex2?.previousElementSibling;
      // Siblings Animation
      if (item) {
        gsap.to(item, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex1) {
        gsap.to(siblingIndex1, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex2) {
        gsap.to(siblingIndex2, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
      if (siblingIndex3) {
        gsap.to(siblingIndex3, {
          x: "0vw",
          ease: "expo.inOut",
          duration: 2,
        });
      }
    }
  };

  // Card Animation
  const handlePlusButtonClick = contextSafe(() => {
    const getActiveCard = document.querySelectorAll(".timeline-card.active");
    // If Any Card is Active
    if (getActiveCard.length === 0) {
      ActiveCardAnimation(wrapper.current);
    } else {
      DeactiveCardAnimation(getActiveCard[0]);
      ActiveCardAnimation(wrapper.current);
    }
  });
  const handleMinusButtonClick = contextSafe(() => {
    DeactiveCardAnimation(wrapper.current);
  });
  // Set Default
  useGSAP(
    () => {
      const imagesDiv = wrapper.current?.querySelector(".expand-images");
      const imagesWrap = wrapper.current?.querySelector(
        ".expand-images>.images-wrapper",
      );
      if (imagesDiv) {
        gsap.set(imagesDiv, {
          opacity: 0,
          visibility: "hidden",
        });
      }
      if (imagesWrap) {
        gsap.set(imagesWrap, {
          x: "100%",
        });
      }
    },
    { scope: wrapper },
  );
  return (
    <div
      ref={wrapper}
      data-index={props.dataIndex}
      className={`timeline-card group w-[19.5vw] h-[46.8vh] relative hover:z-50 ${props.extraClass}`}
    >
      <div
        className={`card-item w-full h-full flex items-center justify-center relative z-10 origin-center ${props.cardClass}`}
      >
        <div className="card-wrapper text-[30px] leading-[90%] text-black w-51">
          <h3 className="font-bold">{props.data.title}</h3>
          <p>{props.data.text}</p>
        </div>
      </div>
      <div className="expand-button bg-linear-to-t from-[#C3A13F] to-[#966814] w-16.75 h-16.75 rounded-full p-0.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] cursor-pointer absolute top-1/2 right-full -translate-y-1/2 translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 z-50">
        <div className="button-wrapper overflow-hidden w-full h-full rounded-full relative">
          <div
            onClick={handlePlusButtonClick}
            className="plus-button bg-black w-full h-full flex items-center justify-center absolute top-0 left-0"
          >
            <div className="w-8 h-8">
              <PlusIcon />
            </div>
          </div>
          <div
            onClick={handleMinusButtonClick}
            className="minus-button bg-black w-full h-full flex items-center justify-center absolute top-full left-0"
          >
            <div className="w-5 h-5">
              <MinusIcon2 />
            </div>
          </div>
        </div>
      </div>
      <div className="expand-images absolute top-1/2 -translate-y-1/2 right-full overflow-hidden z-40">
        <div className="images-wrapper flex gap-x-[2.7vw]">
          <div className="image1 w-[28.8vw] h-[38.1vh]">
            <Image
              className="w-full object-cover object-center h-full relative z-10"
              src={props.data?.images?.image1?.src}
              width="553"
              height="354"
              blurDataURL={props.data?.images?.image1?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Card Image"
            />
          </div>
          <div className="image2 w-[12vw] h-[39vh]">
            <Image
              className="w-full object-cover object-center h-full relative z-10"
              src={props.data?.images?.image2?.src}
              width="258"
              height="305"
              blurDataURL={props.data?.images?.image2?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Card Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
