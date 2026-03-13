import Image from "next/image";
import markImage1 from "../../assets/images/mark-image1.jpg";
import markImage2 from "../../assets/images/mark-image2.jpg";
import markImage3 from "../../assets/images/mark-image3.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function MarkOfTheRoad(props: ChildProps) {
  const title = `ציוני<br/>דרך`;
  const secTitle = `שנת תרל"ז:<br/>ייסוד כולל קובנה לאברכים`;
  const secTitle2 = `שנת תרמ"ב:<br/>יסוד הישיבה לבחורים`;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[4.5vw] gap-x-[10vw]">
        <div className="section-title flex items-end w-[15vw]">
          <h2
            className="text-[161px] leading-[0.7em] text-(--theme-color)"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        <div className="section-content flex items-center gap-x-[2.6vw] w-48.5vw">
          <div className="image w-110.5 h-111.5 relative">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage1.src}
              width={"442"}
              height={"446"}
              alt={"Section Image"}
            />
            <div className="over-image absolute w-82.5 h-85 top-0 right-0 -mt-[8.9vh] -mr-[6.6vw]">
              <Image
                className="w-full object-cover object-center h-full"
                src={markImage2.src}
                width={"329"}
                height={"340"}
                alt={"Section Image"}
              />
            </div>
          </div>
          <div className="title">
            <h4
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle }}
            ></h4>
          </div>
        </div>
        <div className="section-content flex items-center gap-x-[2.6vw] w-[49.2vw]">
          <div className="image w-134.75 h-103.75">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage3.src}
              width={"539"}
              height={"415"}
              alt={"Section Image"}
            />
          </div>
          <div className="title">
            <h4
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle2 }}
            ></h4>
          </div>
        </div>
      </div>
    </section>
  );
}
