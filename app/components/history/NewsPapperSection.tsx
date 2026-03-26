import IntroductionBackground from "@/app/ui/IntroductionBackground";
import Image from "next/image";
import image1 from "../../assets/images/news-section-image1.jpg";
import image2 from "../../assets/images/news-section-image2.jpg";
import image3 from "../../assets/images/news-section-image3.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
}

export default function NewsPapperSection(props: ChildProps) {
  const text1 = `מלחמת העולם הראשונה טלטלה את מוסדות תבל והרעידה את כל מערכי החיים הרגילים. עולם התורה נפגע שבעתיים, כאשר הישיבות הקדושות ששכנו באזורים מוכי קרבות נאלצו לסגור את שעריהן ולנוע מזרחה, בחיפוש אחר מקום מבטחים שבו יוכלו להמשיך ללמוד באין מפריע. תקופה זו הייתה מאתגרת ורבת תהפוכות במיוחד עבור ישיבת סלבודקא כנסת ישראל.`;
  const text2 = `מיקומה הגיאוגרפי של סלבודקא, פרברה של קובנה השוכנת בטבורו של איזור מוקף מבצרים רבים, אילצו את ראשי הישיבה, תלמידיה ורבניה לעקור מארץ מגוריהם, לשאת את ארון הספרים על שכמם ולנדוד במסעות מפרכים דרך ערים וגבולות, אף בתנאי קור ורעב, גם תוך חשד תמידי מפני גזירות השלטון או פלישות צבאות ונפנופי חרב המלחמה.`;
  const smallText = `ואולם, דווקא מתוך המשבר נולדה עמידה רוחנית מרשימה: בני הישיבה לא עזבו את תלמודם, לא חדלו מתפילה ובכל מקום שנעצרו בו, הקימו בית מדרש חדש, זמני ככל שיהיה אך הרוח הגדולה פועמת בו כמו בבית המדרש הישן.<br/>התחנה הראשונה לנדודיה היתה בעיר מינסק, שם נרשמו מפגשי תורה מרתקים עם בתי מדרש מגוונים ואסכולות מחשבות שונות. בעיר זו התרחש גם המפגש ההיסטורי בין מרן ה"חזון איש" למרן "הסבא מסלבודקא" זצ"ל. בלימוד מעמיק ובשיח תורני נלבנו יחדיו דרכים ושיטות בעבודת ה', ברוח המוסר ובגדלות התורה.`;
  const bigText = `בהמשך, עקרה הישיבה לאוקראינה, שם התבססה מספר שנים בעיר קרמנצ'וג. תקופה זו הייתה בבחינת "תורה שלמדי באף"  אף על רקע הטלטלות, האתגרים והאתגרים הרבים, לא חדלה הישיבה ממלאכתה הרוחנית. קול התורה לא שקט, אלא הלך והתחזק, גם בימי צר ומצוק עד לסיום המלחמה בשנת תרע"ט אז שבה הישיבה לכור מחצבתה סלבודקא.`;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      {props.bgImage !== "" && (
        <IntroductionBackground
          bgImage={props.bgImage}
          overlayClass={"hidden"}
          imagePosition="bottom"
          bgClass=""
          animatePosition={props.animWidthText}
        />
      )}
      <div
        dir="rtl"
        className="flex items-center w-full h-full relative z-30 px-[11.7vw] py-[4vw] gap-x-[18.3vw] text-[21px] leading-[1.4em]"
      >
        <div className="news-section-right w-[70%] flex flex-col gap-y-[9.6vh]">
          <div className="news-section-images flex justify-center relative">
            <div className="image1 w-137 h-93.5 absolute right-0 bottom-0 rotate-[9.24deg] translate-x-[2vw] translate-y-[1vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image1.src}
                width={548}
                height={374}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image1?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="image2 w-139.5 h-93 relative z-30 -translate-x-[2vw]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image2.src}
                width={558}
                height={372}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image2?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="image1 w-104.75 h-76 absolute top-0 left-0 z-40 -translate-x-[5vw] translate-y-[1.75vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image3.src}
                width={548}
                height={374}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image3?.blurDataURL}
                alt="Image 1"
              />
            </div>
          </div>
          <div className="news-section-text flex gap-x-[6.4vw]">
            <div className="section-text w-1/2">
              <p dangerouslySetInnerHTML={{ __html: text1 }}></p>
            </div>
            <div className="section-text w-1/2">
              <p dangerouslySetInnerHTML={{ __html: text2 }}></p>
            </div>
          </div>
        </div>
        <div className="news-section-left w-[30%] flex flex-col gap-y-8">
          <p className="" dangerouslySetInnerHTML={{ __html: smallText }}></p>
          <p
            className="text-[28px] leading-[1em]"
            dangerouslySetInnerHTML={{ __html: bigText }}
          ></p>
        </div>
      </div>
    </section>
  );
}
