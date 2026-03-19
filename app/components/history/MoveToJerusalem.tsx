import ThemeButton from "@/app/ui/ThemeButton";
import Image from "next/image";
import mtjImage1 from "../../assets/images/move-to-jerusalem1.jpg";
import mtjImage2 from "../../assets/images/move-to-jerusalem2.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function MoveToJerusalem(props: ChildProps) {
  const moveToJerusalemText = `מתוך האפר קמה הישיבה לבניין מחודש, זוהר ונישא.<br/>תלמידי הישיבה הוותיקים, יחד עם בחורים מבני היישוב הישן, מתלכדים סביב אורה של הישיבה הקדושה, וממשיכים ביתר שאת את המפעל הגדול של תורה ומוסר, כאילו לא נעקרה ממקומה מעולם.<br/>מן היום ההוא והלאה, נושאת הישיבה את שמה "ישיבת חברון", שם זה נחרת לנצח באותיות של זהב, זכר לקדושים ולטהורים אשר עלו בסערה השמימה על קידוש ה', בידי בני עוולה.<br/>בראש המחנה ניצב מרן רבי יחזקאל סרנא, כמלך בגדוד, מנהיג את הישיבה ביד רמה וברוח נדירה, ומצעידה לפסגות חדשות. מאות בני תורה, מכל קצווי הארץ, מתדפקים על שערי ההיכל  לבוא, להסתופף, ולהצטרף אל ליגיון של מלך.<br/>לצידו עומדים עמודי התורה ראשי הישיבה הגאון רבי אהרן כהן והגאון רבי משה חברוני, שותפיו לדרך, המסייעים בעדו במסירות ובהשראה.<br/>יחד, נדבך אחר נדבך, הם בונים את מבצר התורה האיתן, ההולך ונישא לעין כל – עד שהוא הופך תוך זמן קצר למרכז תורה מבהיק, המאציל מזיו קדושתו על כל ארץ הקודש כולה`;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="widget-wrapper w-full h-full flex items-center">
        <div className="content-wrapper flex pr-[35vw] items-center">
          <div className="image1 ml-11 relative">
            <div className="relative h-143.5 w-188.75">
              <Image
                className="w-full object-cover object-center h-full"
                src={mtjImage1.src}
                width={755}
                height={574}
                loading="lazy"
                placeholder="blur"
                blurDataURL={mtjImage1?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="period-button absolute bottom-0 right-0 -mr-19.5 -mb-11 group">
              <ThemeButton
                extraClass="w-38.25 h-38.25 flex item-center justify-center border-[4px] border-[#D1A941] text-[33px] leading-[0.8em] p-6 text-center font-bold -rotate-[9.97deg] group-hover:rotate-0 transition-all duration-500"
                bgColor="bg-[#ffffff]"
                textColor="text-[#000000]"
                hoverBgColor="bg-[#C3A13F]"
                text={`המעבר לירושלים`}
              />
            </div>
          </div>
          <div className="image2 ml-[9.1vw]">
            <div className="relative h-140 w-236.5">
              <Image
                className="w-full object-cover object-center h-full"
                src={mtjImage2.src}
                width={946}
                height={560}
                loading="lazy"
                placeholder="blur"
                blurDataURL={mtjImage2?.blurDataURL}
                alt="Image 1"
              />
            </div>
          </div>
          <div className="text text-[21px] leading-[1.4em] text-[#FBF4E6] w-[26.3vw]">
            <p dangerouslySetInnerHTML={{ __html: moveToJerusalemText }}></p>
          </div>
        </div>
      </div>
    </section>
  );
}
