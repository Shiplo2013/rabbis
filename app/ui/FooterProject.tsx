import Image from "next/image";
import hoverImage1 from "../assets/images/hover-image1.jpg";
import hoverImage2 from "../assets/images/hover-image2.jpg";

interface ChilProps {
  title: string;
}

export default function FooterProject(props: ChilProps) {
  return (
    <div className="single-project py-10.5 border-t-2 border-[#000000] relative">
      <h2 className="text-[94px] leading-[0.9em] font-bold">{props.title}</h2>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden flex gap-2.5">
        <div className="hover-image w-51 h-29.5">
          <Image
            className="w-full h-full object-cover object-center"
            src={hoverImage1?.src}
            width={204}
            height={118}
            loading="lazy"
            placeholder="blur"
            blurDataURL={hoverImage1?.blurDataURL}
            alt="Hover Image"
          />
        </div>
        <div className="hover-image w-51 h-29.5">
          <Image
            className="w-full h-full object-cover object-center"
            src={hoverImage2?.src}
            width={204}
            height={118}
            loading="lazy"
            placeholder="blur"
            blurDataURL={hoverImage2?.blurDataURL}
            alt="Hover Image"
          />
        </div>
      </div>
    </div>
  );
}
