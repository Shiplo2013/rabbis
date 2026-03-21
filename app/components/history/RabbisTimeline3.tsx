import Image from "next/image";
import rabbisImage1 from "../../assets/images/rabbis-timeline14.jpg";
import rabbisImage2 from "../../assets/images/rabbis-timeline15.jpg";
import rabbisImage3 from "../../assets/images/rabbis-timeline16.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
}
export default function RabbisTimeline3(props: ChildProps) {
  const RabbisData = [
    {
      image: rabbisImage1,
      text: `שנת תשמ"ז:<br/>מינוי רבי שלמה כץ ורבי דוד כהן לרמי"ם`,
    },
    {
      image: rabbisImage2,
      text: `שנת????:<br/>פתיחת פנימיה ב'`,
    },
    {
      image: rabbisImage3,
      text: `שנת תשנ"ה:<br/> פתיחת פנימיה ג'`,
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[15.5vw] py-[5vh] items-center justify-center relative z-30 gap-x-[8vw]">
        <div className="rabbis-title self-end">
          <h2 className="text-[160px] leading-[0.7em] text-[#C3A13F]">
            ציוני
            <br />
            דרך
          </h2>
        </div>
        <div className="rabbis-timeline flex gap-x-[20vw] relative">
          {RabbisData.map((item, index) => (
            <div key={index} className="w-64.5 flex flex-col gap-y-[7vh]">
              <div className="image w-64.5 h-76.25">
                <Image
                  className="w-full object-cover object-center h-full relative z-10"
                  src={item?.image?.src}
                  width="258"
                  height="305"
                  blurDataURL={item?.image?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Rabbis Image"
                />
              </div>
              <div className="title mt-auto">
                <h4
                  className="text-[43px] leading-[0.7em] text-[#FBF4E6]"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                ></h4>
              </div>
            </div>
          ))}
          <div className="timeline h-2.25 w-full bg-[#C3A13F] absolute top-[35vh] right-0"></div>
        </div>
      </div>
    </section>
  );
}
