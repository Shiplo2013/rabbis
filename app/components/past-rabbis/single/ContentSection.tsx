import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function CustomsContentSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="rabbis-content-wrapper w-full h-auto flex items-center">
        <div className="rabbis-menu-wrapper w-[25vw] min-w-[25vw] overflow-hidden">
          <RabbisOptions extraClass="flex flex-col gap-y-[4vh]" />
        </div>
        <div
          dir="ltr"
          className="rabbis-text1 text-[80px] leading-[70%] text-[#57717A] w-[55vw] min-w-[55vw] px-[5.4vw] py-[5vh] text-right"
        >
          <h3>
            דמות מופת עם שילוב נדיר של גאונות מופלגת, ראש ישר וחד כתער, שקידה
            עצומה, יחד עם ענווה ופשטות שאין לה שיעור
          </h3>
        </div>
        <div
          dir="ltr"
          className="rabbis-title text-[115px] leading-[90%] text-[#121212] font-bold w-[59vw] min-w-[59vw] px-[2vw] py-[5vh] text-center"
        >
          <h2>במעשיהם נגלה הלימוד</h2>
        </div>
        <div
          dir="ltr"
          className="rabbis-text2 w-[70vw min-w-[70vw] px-[5.4vw] py-[5vh] text-right"
        >
          <div className="title mb-[8vh]">
            <h5 className="text-[55px] leading-[70%] text-center text-[#D1A941]">
              ימי הילדות והנערות
            </h5>
          </div>
          <div className="content text-[21px] leading-[1.4em] font-medium text-[#000000] flex gap-x-[3vw]">
            <div className="text w-1/2 [&>p:not(:last-child)]:mb-6">
              <p>
                שכניו מירושלים סיפרו כי פעמיים בשבוע, היה מסתובב בחצר כל הלילה
                ומשנן את לימודו בעל פה. עדות נוספת לזיכרונו ולעמלו מובאת מפי
                הגאון רבי דב שוורצמן זצ"ל, שלמד איתו את פרק "המוציא יין" במסכת
                שבת שבע פעמים, עד שהיו בקיאים בו מילה במילה.
              </p>
              <p>
                שקיעותו וכח הריכוז שלו בלימוד היו מופלאים. המשגיח רבי לייב חסמן
                זצ"ל, היה עומד לעיתים מאחוריו להקשיב ללימודו, אך רבי אברהם היה
                שקוע עד שהוא לא היה חש בנוכחותו, ופעם, התרגש רבי לייב כל כך
                מלימודו של רבי אברהם עד שליטפו באהבה באמצע תלמודו! שקיעותו
                המשיכה כל חייו, כשהוא למד הוא לא ראה שום דבר אף בסדרים של שבע
                שעות.
              </p>
            </div>
            <div className="text w-1/2">
              <p>
                רבי אברהם יהודה פרבשטיין נולד בפולין בשנת תרע"ז (1917) לרבי
                יעקב, תלמידו של רבי משה סוקולובסקי זצ"ל בעל ה'אמרי משה' בישיבה
                בבריסק. בשנת תר"פ (1920) כשהיה בן שלוש, עלה עם משפחתו לארץ
                ישראל. 
              </p>
              <p>
                בילדותו, שכר לו אביו מלמד מיוחד, רבי יוסף זאב ליפוביץ, מגדולי
                תלמידי הסבא מסלבודקה. המלמד התרשם כל כך מכישרונותיו של הילד, עד
                שהתבטא עליו בהפלגה: "כי הוא רבי משה מרדכי אפשטיין השני".
              </p>
              <p>
                המשפחה התיישבה תחילה בתל אביב, ובשנת תר"צ (1930) עברה לבני ברק.
                באותה שנה, בגיל בר מצווה, נכנס ללמוד בישיבת חברון בירושלים,
                שהפכה לבית מדרשו למשך כל ימי חייו. בנערותו סיים את ששת סדרי
                המשנה וחזר עליהם שש פעמים. בגיל שמונה עשרה כבר הספיק לסיים את כל
                הש"ס, גמרא, רש"י ותוספות.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
