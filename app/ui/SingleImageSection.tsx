import Image from "next/image";

interface ChildProps {
  extraClass: string;
  image: any;
  animWidthText: number;
}
export default function SingleImageSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <Image
        className="parallax-image w-full object-cover object-center h-full relative z-10 transition-opacity duration-1000"
        src={props?.image?.src}
        width={"614"}
        height={"921"}
        blurDataURL={props?.image?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Image Background"
        //onLoad={(image) => image.classList.remove("opacity-0")}
      />
    </section>
  );
}
