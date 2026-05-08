import parse from "html-react-parser";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import galleryImage1 from "../../assets/images/conference-gallery1.jpg";
import galleryImage2 from "../../assets/images/conference-gallery2.jpg";
import galleryImage3 from "../../assets/images/conference-gallery3.jpg";
import galleryImage4 from "../../assets/images/conference-gallery4.jpg";
import galleryImage5 from "../../assets/images/conference-gallery5.jpg";
import contentBg from "../../assets/images/text-frame.png";

interface SingleCyclePictureData {
  title: string;
  content: string;
  image: StaticImageData;
  link: string;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: SingleCyclePictureData[];
}

export default function ConferenceContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const sectionText = `<p>בחודש ניסן התשס״ט התקבצו ובאו אלפי בוגרי הישיבה לדורותיה למעמד אדיר ורב־רושם, אשר נחרט בלב כל משתתפיו כזיכרון בלתי נשכח. היה זה רגע נשגב, שבו נפגשו דורות של בוגרים כאיש אחד בלב אחד, והתרפקו לשעה קלה על זיכרונות כור מחצבתם ושורש מקורם</p><p>את המזרח פיארו גדולי הדור, ובהם מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל, מבוגרי הישיבה, אשר דבריו הרטיטו את לב קהל האלפים והותירו רושם עמוק. המעמד כולו נחקק בלבבות כפרק ייחודי נוסף בתולדות דברי ימי הישיבה. מעמד זה סימן גם פתיחת פרק חדש: התלכדותם של בוגרי הישיבה תחת גוף מאוגד אחד, "כנסת הבוגרים", אשר נועד לקשר ולאחד את כלל בוגרי הישיבה לחטיבה אחת, ולהעמיק את הזיקה המתמשכת בינם לבין בית גידולם הרוחני.</p>`;
  const GalleryImages = [
    {
      image: galleryImage1,
      size: "landscape",
    },
    {
      image: galleryImage2,
      size: "landscape",
    },
    {
      image: galleryImage3,
      size: "portrait",
    },
    {
      image: galleryImage4,
      size: "landscape",
    },
    {
      image: galleryImage5,
      size: "landscape",
    },
    {
      image: galleryImage1,
      size: "landscape",
    },
    {
      image: galleryImage2,
      size: "landscape",
    },
    {
      image: galleryImage3,
      size: "portrait",
    },
    {
      image: galleryImage4,
      size: "landscape",
    },
    {
      image: galleryImage5,
      size: "landscape",
    },
  ];
  // Section Animation
  useEffect(() => {
    const selectYears = scrollbarRef.current?.querySelectorAll(".year-month");
    if (selectYears) {
      selectYears[0].querySelector(".months")?.classList.remove("hidden");
      selectYears[0].querySelector(".months")?.classList.add("flex");
    }
  }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[9.89vw]">
        <div className="conference-content min-w-[42.5vw] w-[42.5vw] h-full will-change-transform overflow-hidden relative">
          <div className="content-bg relative z-10">
            <Image
              className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
              src={contentBg?.src}
              width="816"
              height="598"
              blurDataURL={contentBg?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Graduates"
            />
          </div>
          <div
            dir="ltr"
            className="conference-content-wrapper absolute top-0 left-0 w-full h-full z-30 2xl:text-[21px] xl:text-[18px] sm:text-[16px] text-black leading-[1.3em] px-[6.25vw] py-[12.9vh] flex flex-col gap-y-[3vh] text-right"
          >
            {parse(sectionText)}
          </div>
        </div>
        <div className="conference-gallery flex items-center will-change-transform">
          {GalleryImages.map((item, index) => {
            if (item.size === "landscape") {
              return (
                <div
                  key={index}
                  className="single-gallery will-change-transform w-[39.4vw] h-[47.25vh] overflow-hidden"
                >
                  <div
                    className={`single-gallery-image w-[50vw] h-[70vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                  >
                    <Image
                      className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                      src={item?.image?.src}
                      width={item?.image?.width}
                      height={item?.image?.height}
                      blurDataURL={item?.image?.blurDataURL}
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Gallery Image"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="single-gallery will-change-transform w-[26.56vw] h-[81.48vh] overflow-hidden"
                >
                  <div
                    className={`single-gallery-image w-[60vw] h-[85vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                  >
                    <Image
                      className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                      src={item?.image?.src}
                      width={item?.image?.width}
                      height={item?.image?.height}
                      blurDataURL={item?.image?.blurDataURL}
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Gallery Image"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
