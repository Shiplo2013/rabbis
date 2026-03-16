import ParallaxBackground from "@/app/ui/ParallaxBackground";
import Image from "next/image";
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
      <div className="content-wrapper w-full h-full pr-[11.7vw] pl-[9.6vw] py-[5vh] relative z-30">
        <div className="section-image w-[50vw]">
          <div className="image1">
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
          <div className="image2">
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
          <div className="image3">
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
        </div>
        <div className="section-content">
          <div className="content-top">
            <h2
              dangerouslySetInnerHTML={{ __html: sectionData[0]?.title }}
            ></h2>
          </div>
          <div className="content-bottomo">
            <div className="text1">
              <p
                dangerouslySetInnerHTML={{ __html: sectionData[0]?.text1 }}
              ></p>
            </div>
            <div className="text2">
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
