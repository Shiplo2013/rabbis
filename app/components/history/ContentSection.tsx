import TitleSplit from "@/app/ui/TitleSplit";
import contentBG from "../../assets/images/content-bg.jpg";
import ContentSplit from "../../ui/ContentSplit";
import ParallaxBackground from "../../ui/ParallaxBackground";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function ContentSection(props: ChildProps) {
  const sectionData = [
    {
      title: `גשר צר חוצה את נהר הווִילִיַה מפריד בין הכרך קובנה לבין פרברו, סלבודקא.`,
      text1: `<p>עיירה יהודית זו, טיפוסית למאה התשע-עשרה, התאפיינה בבתי עץ רעועים ובחנויות דלות אשר סיפקו פרנסה בדוחק לתושביה. ואולם, בלב העיירה הצנועה שכנה אבוקת אור רבת עוצמה - ישיבת "כנסת ישראל". מוסד תורני מפואר זה, אשר היה למבצר של תורה ומוסר, הפיץ את אורו והדרו על פני כל שוחרי התורה ברחבי העולם.</p><p>הד קול התורה, אשר לא פסק בישיבה הק' מעולם, נשמע למרחקים והפך את סלבודקא למגדל-אור המאיר את דרך החיים התורנית לכל מבקש חכמה ודעת. מבין כתליה יצאו מאות רבות של גדולי תורה, אשר לימים הפכו לקברניטיה הרוחניים של האומה. רבנים מפורסמים, ראשי ישיבות, מנהיגים ומשפיעים עוצבו בין כתליה והוסיפו חוליות יקרות לשרשרת הזהב של מסורת התורה, הנמשכת מימי יבנה, נהרדעא ופומפדיתא, ועד לוולוז'ין וסלובודקה.</p>`,
      text2: `<p>סלבודקא שימשה כמרכזה של תנועת המוסר, וממנה התפשטה השפעתה לרוב הישיבות ברחבי רוסיה ופולין. יסודותיה של התנועה נטועים עמוק בשיטת הנהגתו וברוחו הגדולה של רבי ישראל מסלנט זצ"ל.</p><p>ראשיתו של מפעל אדירים זה בשנת תרל"ז (1877), עם ייסודו של 'כולל אברכים' בקובנה. הכולל, אשר היוה חידוש בזמנו פעל בנשיאותו של רבי ישראל מסלנט, שימש כמסגרת תורנית לעילויים וגדולי תורה ברוח תנועת המוסר. בין פועליו הבולטים היה רבי נתן צבי פינקל, אברך צעיר ואיש חזון, שפעל במסגרת זו ללא לאות להגדיל תורה ולהאדירה. כעבור שלוש שנים, יזם רבי נתן צבי את הרחבת המוסד גם עבור בני הנעורים, ופנה להיוועץ בדבר עם רבי ישראל.</p><p>בתשובתו, הורה לו רבי ישראל כי המטרה המרכזית שעליה יש להתמקד בהקמת הישיבה היא "לְהַחֲיוֹת רוּחַ שְׁפָלִים וּלְהַחֲיוֹת לֵב נִדְכָּאִים".</p>`,
    },
  ];
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Section Title 2
      const introTitle = TitleSplit(".hiscont-title", "words");
      const contentSplit = ContentSplit(".hiscont-text", "lines");
      gsap.to(introTitle, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          toggleActions: "restart pause resume reverse",
          //markers: true,
        },
        duration: 0.5,
        yPercent: 0,
        opacity: 1,

        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.05,
      });
      gsap.to(contentSplit, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          toggleActions: "restart pause resume reverse",
          //markers: true,
        },
        duration: 0.5,
        yPercent: 0,
        opacity: 1,

        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.05,
      });
    });
  }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} history-content flex items-center relative justify-center`}
    >
      <ParallaxBackground
        bgImage={contentBG}
        overlayLeft={false}
        overlayLeftColor={""}
      />
      <div className="max-w-full w-[80%] relative z-40 text-[21px] text-[#3D3B37] flex gap-x-[7.5vw] pl-[3vw]">
        <div className="content-right">
          <h2 className="hiscont-title text-[44px] leading-[1em] mb-5 overflow-hidden">
            {sectionData[0].title}
          </h2>
          <div
            className="hiscont-text"
            dangerouslySetInnerHTML={{ __html: sectionData[0].text1 }}
          ></div>
        </div>
        <div className="content-left">
          <div
            className="hiscont-text2"
            dangerouslySetInnerHTML={{ __html: sectionData[0].text2 }}
          ></div>
        </div>
      </div>
    </section>
  );
}
