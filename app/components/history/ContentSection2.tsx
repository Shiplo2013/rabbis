import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import VideoBackground from "./VideoBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  loadAnimation: boolean;
  offsetTopTimeline?: number;
  panel?: React.RefObject<HTMLDivElement | null>;
  offsetTopAdded?: boolean;
}

export default function ContentSection2(props: ChildProps) {
  // Selectors
  const heading = useRef<HTMLHeadingElement>(null);
  const content1 = useRef<HTMLDivElement>(null);
  const content2 = useRef<HTMLDivElement>(null);
  // Use path
  const pathname = usePathname();
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };

  // Page Data
  const sectionData = [
    {
      title:
        props?.data?.title ||
        `גשר צר חוצה את נהר הווִילִיַה מפריד בין הכרך קובנה לבין פרברו, סלבודקא.`,
      text1:
        props?.data?.content_1 ||
        `<p>עיירה יהודית זו, טיפוסית למאה התשע-עשרה, התאפיינה בבתי עץ רעועים ובחנויות דלות אשר סיפקו פרנסה בדוחק לתושביה. ואולם, בלב העיירה הצנועה שכנה אבוקת אור רבת עוצמה - ישיבת "כנסת ישראל". מוסד תורני מפואר זה, אשר היה למבצר של תורה ומוסר, הפיץ את אורו והדרו על פני כל שוחרי התורה ברחבי העולם.</p><p>הד קול התורה, אשר לא פסק בישיבה הק' מעולם, נשמע למרחקים והפך את סלבודקא למגדל-אור המאיר את דרך החיים התורנית לכל מבקש חכמה ודעת. מבין כתליה יצאו מאות רבות של גדולי תורה, אשר לימים הפכו לקברניטיה הרוחניים של האומה. רבנים מפורסמים, ראשי ישיבות, מנהיגים ומשפיעים עוצבו בין כתליה והוסיפו חוליות יקרות לשרשרת הזהב של מסורת התורה, הנמשכת מימי יבנה, נהרדעא ופומפדיתא, ועד לוולוז'ין וסלובודקה.</p>`,
      text2:
        props?.data?.content_2 ||
        `<p>סלבודקא שימשה כמרכזה של תנועת המוסר, וממנה התפשטה השפעתה לרוב הישיבות ברחבי רוסיה ופולין. יסודותיה של התנועה נטועים עמוק בשיטת הנהגתו וברוחו הגדולה של רבי ישראל מסלנט זצ"ל.</p><p>ראשיתו של מפעל אדירים זה בשנת תרל"ז (1877), עם ייסודו של 'כולל אברכים' בקובנה. הכולל, אשר היוה חידוש בזמנו פעל בנשיאותו של רבי ישראל מסלנט, שימש כמסגרת תורנית לעילויים וגדולי תורה ברוח תנועת המוסר. בין פועליו הבולטים היה רבי נתן צבי פינקל, אברך צעיר ואיש חזון, שפעל במסגרת זו ללא לאות להגדיל תורה ולהאדירה. כעבור שלוש שנים, יזם רבי נתן צבי את הרחבת המוסד גם עבור בני הנעורים, ופנה להיוועץ בדבר עם רבי ישראל.</p><p>בתשובתו, הורה לו רבי ישראל כי המטרה המרכזית שעליה יש להתמקד בהקמת הישיבה היא "לְהַחֲיוֹת רוּחַ שְׁפָלִים וּלְהַחֲיוֹת לֵב נִדְכָּאִים".</p>`,
    },
  ];
  // Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];

    if (
      typeof window === "undefined" ||
      !props.loadAnimation ||
      !props.offsetTopAdded
    ) {
      return;
    }

    document.fonts.ready.then(() => {
      // Section Title 1
      if (heading.current) {
        gsap.set(heading.current, { opacity: 1 });
        let splititle;
        SplitText.create(heading.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              duration: 3,
              yPercent: 100,
              opacity: 0,
              delay: -1,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(heading.current) -
                        window.innerWidth * 0.7
                    : (heading.current?.getBoundingClientRect().top || 0) +
                        window.scrollY -
                        window.innerHeight * 0.7;
                },
                toggleActions: "restart pause play reverse",
              },
            });
            animations.push(splititle);
            return splititle;
          },
        });
      }
      // Section Content 1
      if (content1.current) {
        gsap.set(content1.current, { opacity: 1 });
        let spContent1;
        SplitText.create(content1.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            spContent1 = gsap.from(self.lines, {
              duration: 3,
              yPercent: 100,
              opacity: 0,
              delay: -1,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(content1.current) -
                        window.innerWidth * 0.7
                    : (content1.current?.getBoundingClientRect().top || 0) +
                        window.scrollY -
                        window.innerHeight * 0.7;
                },
                toggleActions: "restart pause play reverse",
              },
            });
            animations.push(spContent1);
            return spContent1;
          },
        });
      }
      // Section Content 2
      if (content2.current) {
        gsap.set(content2.current, { opacity: 1 });
        let spContent2;
        SplitText.create(content2.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: false,
          mask: "lines",
          onSplit: (self) => {
            spContent2 = gsap.from(self.lines, {
              duration: 3,
              yPercent: 100,
              opacity: 0,
              delay: -1,
              stagger: 0.02,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(content2.current) -
                        window.innerWidth * 0.7
                    : (content2.current?.getBoundingClientRect().top || 0) +
                        window.scrollY -
                        window.innerHeight * 0.7;
                },
                toggleActions: "restart pause play reverse",
              },
            });
            animations.push(spContent2);
            return spContent2;
          },
        });
      }
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname, props.offsetTopAdded]);
  return (
    <section
      className={`${props.extraClass} flex items-center justify-center flex-col relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <VideoBackground />
      </div>
      <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row-reverse text-[16px] sm:text-[18px] lg:text-[21px] text-[#3D3B37] gap-y-7 gap-x-[7.5vw] py-[8vh] lg:py-0 px-[8vw] lg:px-[10.4vw] relative z-20">
        <div className="w-full lg:w-1/2">
          <div className="text-[22px] sm:text-[32px] lg:text-[44px] leading-[1em] mb-5 w-full">
            {props.loadAnimation && (
              <h2
                ref={heading}
                className="hiscont-title overflow-hidden w-full mix-blend-difference"
              >
                {sectionData[0].title}
              </h2>
            )}
          </div>
          <div ref={content1} className="w-full">
            {props?.loadAnimation && parse(sectionData[0].text1)}
          </div>
        </div>
        <div ref={content2} className="w-full lg:w-1/2">
          {props?.loadAnimation && parse(sectionData[0].text2)}
        </div>
      </div>
    </section>
  );
}
