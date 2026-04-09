import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  image: StaticImageData;
}

export default function OnlyImageSection(props: ChildProps) {
  // Select Background Element
  const background = useRef(null);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      <div ref={background} className="content-wrapper w-full h-screen">
        <Image
          className="w-full object-cover object-center h-full"
          src={props?.image?.src}
          width={props?.image?.width}
          height={props?.image?.height}
          blurDataURL={props?.image?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Image Background"
        />
      </div>
    </section>
  );
}
