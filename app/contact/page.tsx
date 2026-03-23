"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, SplitText, useGSAP } from "../ui/plugins";

gsap.registerPlugin(SplitText);

export default function Contact() {
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Load Page
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Timeline
      const tl = gsap.timeline();
      tl.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      })
        .to(
          ".header-left",
          {
            opacity: 1,
            y: 0,
            ease: "easeInOut",
            duration: 1,
          },
          "-=0.5",
        )
        .to(
          ".header-right",
          {
            opacity: 1,
            x: 0,
            ease: "easeInOut",
            duration: 1,
          },
          "-=0.5",
        );
    }
  }, []);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Section Title 2
      const splititle = SplitText.create(".demoText", {
        type: "lines",
        linesClass: "split-line",
        autoSplit: true,
        mask: "lines",
      });
      gsap.from(splititle.lines, {
        delay: 2,
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
    });
  }, []);
  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <main
        id="page"
        dir="ltr"
        className="main opacity-0 relative overflow-hidden z-10"
      >
        <div className="h-auto w-screen flex items-center justify-center flex-col relative">
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="demoText text-[25px] max-w-1/2">
              עיירה יהודית זו, טיפוסית למאה התשע-עשרה, התאפיינה בבתי עץ רעועים
              ובחנויות דלות אשר סיפקו פרנסה בדוחק לתושביה. ואולם, בלב העיירה
              הצנועה שכנה אבוקת אור רבת עוצמה - ישיבת "כנסת ישראל". מוסד תורני
              מפואר זה, אשר היה למבצר של תורה ומוסר, הפיץ את אורו והדרו על פני
              כל שוחרי התורה ברחבי העולם. הד קול התורה, אשר לא פסק בישיבה הק'
              מעולם, נשמע למרחקים והפך את סלבודקא למגדל-אור המאיר את דרך החיים
              התורנית לכל מבקש חכמה ודעת. מבין כתליה יצאו מאות רבות של גדולי
              תורה, אשר לימים הפכו לקברניטיה הרוחניים של האומה. רבנים מפורסמים,
              ראשי ישיבות, מנהיגים ומשפיעים עוצבו בין כתליה והוסיפו חוליות יקרות
              לשרשרת הזהב של מסורת התורה, הנמשכת מימי יבנה, נהרדעא ופומפדיתא,
              ועד לוולוז'ין וסלובודקה.
            </div>
          </div>
          <RabbisPeriodSection
            animWidthText={0.1}
            extraClass={"min-w-screen w-screen h-screen"}
          />
        </div>
        <div className="h-screen w-screen flex items-center justify-center"></div>
      </main>
      <Footer className={"relative z-20"} />
    </div>
  );
}
