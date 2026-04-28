import parse from "html-react-parser";
import { useState } from "react";

interface ContentPartsProps {
  extraClass: string;
  data: string;
}

export default function ContentParts(props: ContentPartsProps) {
  const [contentData, setContentData] = useState<any>(JSON.parse(props.data));
  return (
    <div className={`content-section ${props.extraClass}`}>
      <h3 className="text-[55px] text-[#D1A941] leading-[70%] mb-10">
        {parse(contentData.title)}
      </h3>
      <div className="text text-[21px] text-[#000000] leading-[1.5em] flex flex-col gap-y-6">
        {parse(contentData.text)}
      </div>
    </div>
  );
}
