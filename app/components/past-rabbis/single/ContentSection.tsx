import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";
import parse from "html-react-parser";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
}

export default function ContentSection(props: ChildProps) {
  const contentData = props.data;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="rabbis-content-wrapper w-full h-auto flex items-center">
        <div className="rabbis-menu-wrapper w-[25vw] min-w-[25vw] overflow-hidden">
          <RabbisOptions extraClass="flex flex-col gap-y-[4vh]" />
        </div>

        {contentData?.blockquote && (
          <div
            dir="ltr"
            className="rabbis-text1 text-[80px] leading-[70%] text-[#57717A] w-[55vw] min-w-[55vw] px-[5.4vw] py-[5vh] text-right"
          >
            <h3>{parse(contentData?.blockquote)}</h3>
          </div>
        )}

        {contentData?.title && (
          <div
            dir="ltr"
            className="rabbis-title text-[115px] leading-[90%] text-[#121212] font-bold w-[59vw] min-w-[59vw] px-[2vw] py-[5vh] text-center"
          >
            <h2>{parse(contentData?.title)}</h2>
          </div>
        )}

        {contentData?.content_1 && (
          <div
            dir="ltr"
            className="rabbis-text2 w-[70vw min-w-[70vw] px-[5.4vw] py-[5vh] text-right"
          >
            <div className="title mb-[8vh]">
              <h5 className="text-[55px] leading-[70%] text-center text-[#D1A941]">
                {parse(contentData?.content_1?.title)}
              </h5>
            </div>
            <div className="content text-[21px] leading-[1.4em] font-medium text-[#000000] flex gap-x-[3vw]">
              <div className="text w-1/2 [&>p:not(:last-child)]:mb-6">
                {parse(contentData?.content_1?.text_left)}
              </div>
              <div className="text w-1/2">
                {parse(contentData?.content_1?.text_right)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
