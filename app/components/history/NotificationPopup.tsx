import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import { gsap, useGSAP } from "@/app/ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function NotificationPopup() {
  useGSAP(() => {
    const popup = document.querySelector(".notification-popup");
    const openBtn = document?.querySelectorAll(".notification-button");
    const closeBtn = popup?.querySelector(".close-notification");

    if (popup && closeBtn && openBtn) {
      gsap.set(popup, { opacity: 0, visibility: "hidden" });

      const showPopup = () => {
        gsap.to(popup, { opacity: 1, visibility: "visible", duration: 0.5 });
      };

      const hidePopup = () => {
        gsap.to(popup, { opacity: 0, visibility: "hidden", duration: 0.5 });
      };

      openBtn?.forEach((btn) => btn.addEventListener("click", showPopup));
      closeBtn?.addEventListener("click", hidePopup);

      // Show the popup after a delay (e.g., 2 seconds)
      //const timer = setTimeout(showPopup, 2000);

      return () => {
        //clearTimeout(timer);
        openBtn?.forEach((btn) => btn.removeEventListener("click", showPopup));
        closeBtn?.removeEventListener("click", hidePopup);
      };
    }
  }, []);
  return (
    <div className="notification-popup bg-[#5A7C4E] fixed top-0 left-0 w-full h-full z-999 py-[5vh] px-[5vw] flex items-center justify-center opacity-0 invisible">
      <div className="close-notification w-15 h-15 border border-white rounded-full flex items-center justify-center absolute top-5 right-5 cursor-pointer z-50">
        <CloseIcon2 />
      </div>
      <div className="popup-wrapper flex items-center justify-center h-full w-full max-w-250 gap-x-[4vw]">
        <div className="notification-content w-[60%]  bg-[#5A7C4E] text-[#F8F8F8] text-[20px] leading-[150%] flex flex-col items-start justify-start gap-y-[2.5vh] pl-[2vw]">
          <p>
            שלמא רבא אל הוד כבוד הגאון הגדול מאיר לארץ בתורתו ויראתו כ"ש מהרמ"מ
            שי' עפשטיין
          </p>
          <p>
            אחד"ש ברוב הדרה"כ כמשפט לרומו.  אבוא עוד הפעם לרום מעלת גאונו לבקש
            על נפשי ולספחני לישיבתו בחברון עיה"ק תו"ב לשלוח לי דרישה לרשיון
            הנסיעה לביאת הארץ.  לא אוכל לבאר גודל רצוני ומצוקת נפשי אם ח"ו לא
            תמלאו בקשתי. הנני מכפיל בכל לשון של בקשה ותחינה להביאני במקום קדוש
            להיות סניף לאריות מפיצי תורה ויראת שמים. לא אעמיס עליכם שום דבר של
            כבד הוצאה, רק כאחד מבני הישיבה, ואמלא אי"ה לסייע בכל אשר בכחי בלי
            נדר כפי שיהיה נדרש בכל דבר מועיל. הלא אקוה אי"ה שלא אהיה ה"ו עבדא
            דנהום כריסיה לא שוי. אנא חנוני נא למלאות מבוקשי. הנני מחכה בכל יום
            לישועת ה' לבוא אליכם. לבי מלאה, לכן אקצר, רק עיני נשואות לרחמי שמים,
            שיתן לכם רחמים להחמל ולמלאות בקשתי. 
          </p>
          <p>
            הנני רב מוקירו ומכבדו כרום ערך כבוד גדולתו תמיד  יהודה ליב חסמן
            משטוצין
          </p>
        </div>
        <div className="divider w-px h-[80%] bg-white opacity-50"></div>
        <div className="notification-heading w-[40%]">
          <h3 className="text-[70px] leading-[70%] text-black">
            מכתב מרן המשגיח רבי יהודה אריה לייב חסמן זצוק"ל אל ראשי הישיבה
            בחברון
          </h3>
        </div>
      </div>
    </div>
  );
}
