import Image from "next/image";
import Border from "../assets/images/border-separator.png";

interface ChildProps {
  extraClass: string;
}

export default function ContentBorder(props: ChildProps) {
  return (
    <div
      className={`border-separator w-full h-auto flex items-center justify-center`}
    >
      <div className={`border-image lg:w-72 lg:h-16 ${props.extraClass}`}>
        <Image
          className="w-full h-full object-cover object-center"
          src={Border.src}
          width={289}
          height={64}
          alt={`Border`}
          blurDataURL={Border.blurDataURL}
          placeholder="blur"
          loading="lazy"
        />
      </div>
    </div>
  );
}
