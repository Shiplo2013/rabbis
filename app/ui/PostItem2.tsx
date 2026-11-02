import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";

export default function PostItem2(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonLink?: string;
}) {
  const { setIsLoading } = useAppState();
  const router = useRouter();
  // Link click handler for navigation
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  return (
    <div className="post-item border-b border-[#C3A13F] pb-3 pt-7.5 text-[22px] leading-[1em] flex flex-col gap-y-2 relative">
      {props.title && (
        <h2 aria-label={props.title} className="font-bold">
          {parse(props.title)}
        </h2>
      )}
      {props.content && <p>{parse(props.content)}</p>}
      {props.subtitle && <p className="font-bold">{parse(props.subtitle)}</p>}
      <Link
        className={`absolute left-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-[18px] py-0.5 px-3`}
        href={props.buttonLink || "/"}
        onClick={handleLinkClick}
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
      <div>בקרוב</div>
    </div>
  );
}
