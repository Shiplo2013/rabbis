import Image from "next/image";
import Link from "next/link";

interface ChildProps {
  title: string;
  image: any;
}

export default function SingleRabbis(props: ChildProps) {
  return (
    <div className="single-rabbis min-w-84 w-84">
      <Link href="/">
        <div className="rabbis-image w-full h-86 mb-8.5">
          <Image
            className="w-full object-cover object-center h-full"
            src={props?.image?.src}
            width="336"
            height="334"
            blurDataURL={props?.image?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Rabbis"
          />
        </div>
        <div className="rabbis-text text-[28px] text-(--theme-color) leading-[0.9em]">
          <p dangerouslySetInnerHTML={{ __html: props?.title }}></p>
        </div>
      </Link>
    </div>
  );
}
