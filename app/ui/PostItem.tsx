import Link from "next/link";

export default function PostItem(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
}) {
  return (
    <div className="post-item border-b border-[#C3A13F] pb-3 pt-7.5 text-sm relative">
      <h4 className="font-bold">{props.title}</h4>
      <p>{props.content}</p>
      <h5 className="font-bold text-[#5A7C4E]">{props.subtitle}</h5>
      <Link
        className={`absolute left-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-xs py-0.5 px-2`}
        href="/"
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
    </div>
  );
}
