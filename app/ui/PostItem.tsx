import parse from "html-react-parser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";

export default function PostItem(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonLink?: string;
}) {
  // states
  const { isLoading, setIsLoading } = useAppState();
  const router = useRouter();
  const pathname = usePathname();
  // Click Handler for Button Link
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
    <div className="post-item border-b border-[#C3A13F] pb-5 pt-4 text-sm relative">
      <h4 className="font-bold">{parse(props.title)}</h4>
      <p>{parse(props.content || "")}</p>
      <h5 className="font-bold text-[#5A7C4E]">
        {parse(props.subtitle || "")}
      </h5>
      <Link
        className={`absolute left-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-xs py-0.5 px-2`}
        href={props.buttonLink || "#"}
        onClick={handleLinkClick}
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
    </div>
  );
}
