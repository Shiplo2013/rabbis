import MinusIcon from "@/app/assets/icons/MinusIcon";
import Image from "next/image";
import PlayIcon from "../../assets/icons/PlayIcon";
import videoThumb from "../../assets/images/evidence-video-thumb.jpg";
import evidanceBG from "../../assets/images/evidenceBG.png";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function EvidenceOfPeriod(props: ChildProps) {
  const sectionData = {
    video: {
      image: videoThumb,
      title: `עדות על התקופה`,
    },
    content: {
      text1: `כאשר נדמה היה שישיבת סלבודקא תשב לבטח, קפצה עליה רעת גזירת הגיוס הליטאית. במהלך שנת תרפ"ד ריחפה עננת הגיוס מעל ראשי בחורי הישיבה, והאיום להילקח אל מחנות הצבא הליטאי היה ממשי ומטלטל. לנוכח זאת, גמלה בלב ראשי הישיבה ההכרעה לעלות אל ארץ הקודש, להתעלות באווירא דארץ ישראל המחכים ולייסד בה מחדש את משכן התורה.<br/>לשליחות רבת האחריות נבחר רבי יחזקאל סרנא, שיצא לחפש מקום הראוי להקים בו את המשך ישיבת סלבודקא ברוח קדושתה.<br/>בין ערי הארץ בלטה בעיניו חברון  עיר האבות, בעומקה ההיסטורי וברוחניותה הצלולה כמתאימה ביותר למשימה זו.`,
      text2: `ואכן, בחודש אלול תרפ"ד, עלה מניין מבחורי הישיבה מדליטא אל אדמת הקודש, ופתחו פרק חדש ומפואר בתולדות הישיבה הק' – תקופת חברון.<br/>במהלך שנת תרפ"ה הצטרפו אל הישיבה בחברון מרנן הסבא מסלבודקא ורבי משה מרדכי אפשטיין שהעפילו לפסגות חדשות של הרבצת תורה ומוסר בין כפירי אריות חברים מקשיבים לקולם המוסיפים חיל בלימודם תוך שאיפה מתמדת לעלות עוד ועוד במעלות התורה והיראה`,
    },
  };
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="evidence-wrapper w-full h-full pr-[6vw] py-[7vh] flex">
        <div className="section-content flex gap-x-[2.4vw]">
          <div className="video relative flex flex-col gap-y-[3vh] w-66.5 h-66.5">
            <div className="thumb p-5 bg-[#d9d9d9d5] rounded-full cursor-pointer relative">
              <div className="image rounded-full overflow-hidden select-none pointer-events-none border-12 border-[#c3a13f69]">
                <Image
                  className={`w-full object-cover h-full relative z-10`}
                  src={sectionData?.video?.image?.src}
                  width={`202`}
                  height={`202`}
                  blurDataURL={sectionData?.video?.image?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Video Thumbnail"
                />
              </div>
              <div className="minus-icon absolute top-0 right-0 w-11.75 h-11.75 bg-[#D1C39C] flex items-center justify-center rounded-full ">
                <MinusIcon />
              </div>
              <div className="play-icon absolute top-1/2 left-1/2 z-20 -translate-1/2 ml-3">
                <PlayIcon />
              </div>
            </div>
            <h3 className="text-[36px] text-(--theme-color) leading-[0.7em] flex justify-center font-bold">
              <span className="max-w-30">{sectionData?.video?.title}</span>
            </h3>
          </div>
          <div className="content w-[66vw] flex items-center relative px-[4.35vw]">
            <div className="content-bg absolute z-10 top-1/2 left-1/2 -translate-1/2 w-full h-full select-none pointer-events-none">
              <Image
                className={`w-full object-cover h-full relative z-10`}
                src={evidanceBG?.src}
                width={`1263`}
                height={`842`}
                blurDataURL={evidanceBG?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt="Content Background"
              />
            </div>
            <div className="flex gap-x-[6.66vw] relative z-30 text-[21px] leading-[1.4] text-[#000000]">
              <div className="content-right w-[60%]">
                <p
                  dangerouslySetInnerHTML={{
                    __html: sectionData?.content?.text1,
                  }}
                ></p>
              </div>
              <div className="content-left w-[40%]">
                <p
                  dangerouslySetInnerHTML={{
                    __html: sectionData?.content?.text2,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
