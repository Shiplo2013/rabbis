import parse from "html-react-parser";
import Link from "next/link";

export default function PostItem(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonLink?: string;
}) {
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
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
    </div>
  );
}
