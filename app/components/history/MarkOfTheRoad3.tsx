import Image from "next/image";
import markImage1 from "../../assets/images/markofroad3-image1.jpg";
import markImage2 from "../../assets/images/markofroad3-image2.jpg";
import markImage3 from "../../assets/images/markofroad3-image3.jpg";
import markImage4 from "../../assets/images/markofroad3-image4.jpg";
import notifyIcon from "../../assets/images/notify-icon.png";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function MarkOfTheRoad3(props: ChildProps) {
  const title = `ציוני<br/>דרך`;
  const secTitle = `שנת תרפ"ד:<br/>ייסוד הישיבה`;
  const secTitle2 = `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`;
  const secTitle3 = `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`;
  const secTitle4 = `שנת תרפ"ו:<br/>מינוי רבי  אריה יהודה לייב חסמן כמשגיח`;
  const sec4Text = `מכתב מרן המשגיח רבי יהודה אריה לייב חסמן זצוק"ל אל ראשי הישיבה בחברון`;
  const secTitle5 = `שנת תרפ"ז:<br/>פטירת הסבא`;

  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[9vh]">
        <div className="section-title flex items-end w-[15vw] ml-[14.7vw]">
          <h2
            className="text-[161px] leading-[0.7em] text-(--theme-color)"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        <div className="section-content flex flex-col items-start gap-y-[10vh] w-48.5vw self-end -mb-[9vh] ml-[2.5vw]">
          <div className="title">
            <h4
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle }}
            ></h4>
          </div>
          <div className="image w-161 h-106.25 relative">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage1.src}
              width={"644"}
              height={"425"}
              blurDataURL={markImage1?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
        </div>
        <div className="section-content flex flex-col items-start gap-y-[10vh] w-48.5vw self-end -mb-[9vh] px-[2.7vw] pt-[9vh] bg-white ml-[4vw]">
          <div className="title">
            <h4
              className="text-[43px] text-[#000000] leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle2 }}
            ></h4>
          </div>
          <div className="image w-161 h-101.5 relative">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage2.src}
              width={"644"}
              height={"406"}
              blurDataURL={markImage2?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
        </div>
        <div className="section-content flex flex-col items-start gap-y-[10vh] w-48.5vw self-end -mb-[9vh] ml-[2.5vw]">
          <div className="title">
            <h4
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle3 }}
            ></h4>
          </div>
          <div className="image w-161 h-106.25 relative"></div>
        </div>
        <div className="section-content flex flex-col items-start gap-y-[7vh] w-48.5vw self-end -mb-[9vh] ml-[2.5vw]">
          <div className="notifiaction py-5 px-8 w-108 bg-[#5A7C4E] relative pl-19 mx-auto">
            <div className="notify-icon w-33.75 h-25 absolute top-0 left-0 -translate-x-1/2">
              <Image
                className="w-full object-cover object-center h-full"
                src={notifyIcon.src}
                width={"135"}
                height={"100"}
                blurDataURL={notifyIcon?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Notify Icon"}
              />
            </div>
            <p
              className="text-[20px] leading-[1.25em]"
              dangerouslySetInnerHTML={{ __html: sec4Text }}
            ></p>
          </div>
          <div className="title">
            <h4
              className="text-[43px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle4 }}
            ></h4>
          </div>
          <div className="image w-161 h-106.25 relative">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage3?.src}
              width={"644"}
              height={"425"}
              blurDataURL={markImage3?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
        </div>
        <div className="section-content flex items-center gap-x-[2.6vw] w-[90vw]">
          <div className="image w-[62.7vw] h-[56.8vh]">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage4.src}
              width={"1205"}
              height={"614"}
              blurDataURL={markImage4?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="title w-[23vw]">
            <h4
              className="text-[90px] text-(--theme-color) leading-[0.7em]"
              dangerouslySetInnerHTML={{ __html: secTitle5 }}
            ></h4>
          </div>
        </div>
      </div>
    </section>
  );
}
