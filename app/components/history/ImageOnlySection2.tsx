import Image from "next/image";
import Image1 from "../../assets/images/single-image2.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function ImageOnlySection2(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="section-wrapper w-full h-full py-[6vh] px-[4.7vw] flex items-end justify-end">
        <div className="image1 w-220 h-144.75 relative z-30 translate-x-[9vw]">
          <Image
            className="w-full object-cover object-center h-full"
            src={Image1?.src}
            width={"880"}
            height={"579"}
            blurDataURL={Image1?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt={"Section Image"}
          />
        </div>
      </div>
    </section>
  );
}
