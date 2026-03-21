import Image from "next/image";
import Image1 from "../../assets/images/image-only.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function ImageOnlySection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="section-wrapper w-full h-full py-[6vh] px-[6.8vw] flex items-end justify-end">
        <div className="image1 w-121 h-80.5 relative z-30">
          <Image
            className="w-full object-cover object-center h-full"
            src={Image1?.src}
            width={"484"}
            height={"322"}
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
