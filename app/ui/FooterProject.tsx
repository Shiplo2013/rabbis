import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import hoverImage1 from "../assets/images/hover-image1.jpg";
import { useAppState } from "../components/AppContext";

interface ChilProps {
  title: string;
  link: string;
  images: any;
}

export default function FooterProject(props: ChilProps) {
  // Route
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, setIsLoading } = useAppState();
  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  return (
    <div className="single-project border-t-2 border-[#000000] relative">
      <Link
        href={props.link}
        onClick={handleLinkClick}
        prefetch={false}
        className="block py-10.5"
      >
        <h2 className="text-[50px] lg:text-[94px] leading-[0.9em] font-bold">
          {props.title}
        </h2>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden hidden lg:flex gap-2.5">
          {props.images &&
            props.images.map((image: any, index: number) => (
              <div
                key={index}
                className="hover-image w-25 h-18 lg:w-51 lg:h-29.5"
              >
                <Image
                  className="w-full h-full object-cover object-center"
                  src={image?.sizes?.thumbnail || image?.src || hoverImage1.src}
                  width={204}
                  height={118}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={hoverImage1?.blurDataURL}
                  alt="Hover Image"
                />
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
}
