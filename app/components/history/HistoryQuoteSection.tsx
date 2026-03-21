interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  boxClass: string;
  data: { content: string }[];
}

export default function HistoryQuoteSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div
        className={`section-row w-full h-full flex px-[2vw] py-[5vh] items-center justify-center relative z-30`}
      >
        <div
          className={`bg-[#E2D7C3] w-full text-[#000000] text-[45px] leading-[0.8em] px-[5vw] py-[5vh] flex flex-col gap-y-8 min-h-[46.8vh] items-center justify-center ${props.boxClass}`}
          dangerouslySetInnerHTML={{ __html: props?.data[0]?.content }}
        ></div>
      </div>
    </section>
  );
}
