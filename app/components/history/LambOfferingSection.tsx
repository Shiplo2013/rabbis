import ParallaxBackground from "@/app/ui/ParallaxBackground";
import Image from "next/image";
import bookIcon from "../../assets/images/lamb-book-icon.png";
import LambImage1 from "../../assets/images/lamb-image1.jpg";
import LambImage2 from "../../assets/images/lamb-image2.jpg";
import LambImage3 from "../../assets/images/lamb-image3.jpg";
import contentBG from "../../assets/images/lamb-offering-bg.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function LambOfferingSection(props: ChildProps) {
  const sectionData = [
    {
      notificationText: `קטעים של חוברת ר יצחק הוטנר על נטבחי חברון`,
      title: `ואיה השה לעולה`,
      text1: `במהלך שנותיה הראשונות בחברון התאפיינה הישיבה ביחסי שכנות טובים עם בני ישמעאל תושבי המקום. היא אף קיימה יחסי גומלין עסקיים כשאכסניות הבחורים נותנים פרנסה למשכירים כמו גם שירותים נוספים שסייעו להם בשנות ההתאקלמות לשרוד ולפרוח והעסיקו רבים מהשכנים הערביים. אך כל זאת לא הכין את הלב למכת התופת, שהחרידה כליל את הישיבה עם פרוץ המאורעות בשנת תרפ"ט.<br/>ביום שישי יז באב, הוחשכו השמיים בעננים שחורים של הרס ואש, והחלו שורה של מאורעות דמים שנחקקו בזיכרון ההיסטוריה תחת השם 'מאורעות תרפט'. באותם רגעים של אימה, נחתה על הישיבה מכה קשה ובלתי נתפסת בטבח שבו נעקדו על קידוש השם עשרים ושישה מבניה. נפשות תמימות אצילי דעת ונסיכי אדם ותלמידי חכמים יקרים, נפלו שדודים על דף הגמרא אל מול אגרוף רשע של בני השפחה שקמו עליהם להורגם במיתות משונות וביסורים גדולים.<br/>בתוך התופת שפקדה את ישיבת חברון, נִגלָה הדרו של הרוח הסלבודקאית במלוא תפארתו.`,
      text2: `בחורי הישיבה, בשעת נשימתם האחרונה ובעוד אמירת שמע ישראל נלחשת בין ההריסות, חוצצים היו בגופם בין הסכנה לבין חבריהם, מקיימים במסירות נפש את אשר קנו וספגו אל קירבם במשנתה המוסרית של כנסת ישראל. גם בעודם גוססים,  לא משו ממידתם, לא הרפו מאצילות המידות אשר ספגו בין כתלי בית היוצר הגדול.<br/>ר' ירוחם ממיר אמר על התנהגות פלאית זו כי רק תלמידי הסבא יכולים היו להגיע למידה כזו של מסירות נפש בעד חבריהם רגע לפני מיתתם.<br/>בצורה טראגית זו נסתיימה לה תקופה רוויה הוד של חמש שנות תורה וגדלות בעיר האבות.<br/>בטרם כבו הלהבות, כבר החלה התנערות מעפר. הישיבה, בראשות הגאון ר’ משה מרדכי אפשטיין זצ"ל, אספה את שארית כוחותיה, נשאה עמה את השרידים – בגוף וברוח – ופנתה לעיר הקודש ירושלים.<br/>שם, בתוככי פלטרין של מלך, פתחה פרק חדש – לאחות את השברים, להשיב עטרה ליושנה, ולבנות מחדש את אם הישיבות בשכונת גאולה בלב עיר הקודש  ירושלים ת"ו`,
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <ParallaxBackground
        bgImage={contentBG}
        overlayLeft={false}
        overlayLeftColor={""}
      />
      <div className="content-wrapper w-full h-full pr-[11.7vw] pl-[9.6vw] py-[7vh] relative z-30 flex items-center gap-x-[12vw]">
        <div className="section-image w-[50vw] self-end relative">
          <div className="image1 w-150.5 h-93.25 absolute bottom-[19vh] -right-[6.66vw]  z-10">
            <Image
              className="w-full object-cover object-center h-full"
              src={LambImage1?.src}
              width={"644"}
              height={"425"}
              blurDataURL={LambImage1?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="image2 w-126 h-89.5 relative z-30">
            <Image
              className="w-full object-cover object-center h-full"
              src={LambImage2?.src}
              width={"644"}
              height={"425"}
              blurDataURL={LambImage2?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="image3 w-120 h-139.5 absolute bottom-[9vh] right-[20vw] -rotate-[7.84deg]">
            <Image
              className="w-full object-cover object-center h-full"
              src={LambImage3?.src}
              width={"644"}
              height={"425"}
              blurDataURL={LambImage3?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="notifiaction py-5 px-8 w-108 bg-[#5A7C4E] absolute pl-19 mx-auto bottom-[6.38vh] right-[21vw] z-40">
            <div className="notify-icon w-50.5 h-33.75 absolute top-0 left-0 -translate-x-1/2">
              <Image
                className="w-full object-cover object-center h-full"
                src={bookIcon.src}
                width={"202"}
                height={"135"}
                blurDataURL={bookIcon?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Book Icon"}
              />
            </div>
            <p
              className="text-[20px] leading-[1.25em]"
              dangerouslySetInnerHTML={{
                __html: sectionData[0].notificationText,
              }}
            ></p>
          </div>
        </div>
        <div className="section-content w-[58vw] flex flex-col gap-y-[4.8vh]">
          <div className="content-top">
            <h2
              className="text-[58px] leading-[0.7em] text-[#CD5E41]"
              dangerouslySetInnerHTML={{ __html: sectionData[0]?.title }}
            ></h2>
          </div>
          <div className="content-bottomo text-[21px] flex gap-x-[5.2vw]">
            <div className="text1 w-1/2">
              <p
                dangerouslySetInnerHTML={{ __html: sectionData[0]?.text1 }}
              ></p>
            </div>
            <div className="text2 w-1/2">
              <p
                dangerouslySetInnerHTML={{ __html: sectionData[0]?.text2 }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
