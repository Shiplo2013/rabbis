import Image from "next/image";
import historyImage1 from "../../assets/images/history-image1.jpg";
import historyImage2 from "../../assets/images/history-image2.jpg";
import historyImage3 from "../../assets/images/history-image3.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function MarkOfTheRoad2(props: ChildProps) {
  const sectionData = [
    {
      title: `שנת תרע"ד:<br/>בעיר מינסק שברוסיה הלבנה`,
      image: historyImage1,
    },
    {
      title: `שנת תרע"ו:<br/>בעיר קרמנצ'וג שבאוקראינה`,
      image: historyImage2,
    },
    {
      title: `שנת תש"פ:<br/>חזרה לסלבודקא`,
      image: historyImage3,
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[4.5vw] gap-x-[10vw]">
        {sectionData?.map((item, index) => (
          <div
            key={index}
            className="section-content flex items-center gap-x-[2.6vw] w-[60vw]"
          >
            <div className="image w-[33.33vw] h-103.25">
              <Image
                className="w-full object-cover object-center h-full"
                src={item?.image?.src}
                width={"640"}
                height={"413"}
                alt={"Section Image"}
              />
            </div>
            <div className="title w-[24vw]">
              <h4
                className="text-[43px] text-(--theme-color) leading-[0.7em]"
                dangerouslySetInnerHTML={{ __html: item?.title }}
              ></h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
