import parse from "html-react-parser";
import Link from "next/link";

export default function PostItem2(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonLink?: string;
}) {
  return (
    <div className="post-item border-b border-[#C3A13F] pb-3 pt-7.5 text-[22px] leading-[1em] flex flex-col gap-y-2 relative">
      {props.title && <h4 className="font-bold">{parse(props.title)}</h4>}
      {props.content && <p>{parse(props.content)}</p>}
      {props.subtitle && <h5 className="font-bold">{parse(props.subtitle)}</h5>}
      <Link
        className={`absolute left-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-[18px] py-0.5 px-3`}
        href={props.buttonLink || "/"}
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
    </div>
  );
}
