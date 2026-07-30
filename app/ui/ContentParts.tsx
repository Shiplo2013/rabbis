import parse from "html-react-parser";

interface ContentPartsProps {
  extraClass: string;
  data?: any;
}

export default function ContentParts(props: ContentPartsProps) {
  const contentData = props.data || {};
  return (
    <div className={`content-section ${props.extraClass}`}>
      <h3 className="text-[32px] sm:text-[40px] lg:text-[55px] text-[#D1A941] leading-[0.9em] sm:leading-[70%] mb-6 sm:mb-8 lg:mb-10">
        {parse(contentData?.title)}
      </h3>
      <div className="text text-[16px] sm:text-[18px] lg:text-[21px] text-[#000000] leading-[1.4em] flex flex-col gap-y-6">
        {parse(contentData?.text)}
      </div>
    </div>
  );
}
