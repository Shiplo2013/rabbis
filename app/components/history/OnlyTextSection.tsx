interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function OnlyTextSection(props: ChildProps) {
  const textData = [
    {
      text: `<p>כאשר צר המקום מלהכיל את ריבוי התלמידים, גמלה בלב ראשי הישיבה ההכרעה – לחפש כר נרחב, שקט ושליו, אשר יכיל ברווחה את שורות התלמידים ההולכות ומתרבות. מקום מרוחק משאון העיר והמולה סואנת, אשר יאפשר שקיעה מלאה באור התורה וטהרתה.</p><p>ואז, בתשרי תשל"ו, נחנכה ברוב הוד והדר קריית הישיבה החדשה בגבעת מרדכי. היה זה רגע מכונן ומרגש בתולדות הישיבה. אלפים מבוגרי הישיבה לדורותיהם נהרו למעמד המרומם של חנוכת הבית,  לראות בגיל ובהדרת כבוד את הבית אשר נבנה לתפארת, בית שיכיל אלפי בחורים שיוכלו מעתה להגות בתורה בלב שקט ונפש חפצה, כמעין המתגבר שאין לו הפסק.</p>`,
      quote: `מאותו יום ואילך, החלה תקופה פריחה חדשה: הישיבה מתרחבת, פורחת, ומגיעה לממדים אדירים, כשכמעט אלפיים בחורים חובשים את ספסליה. היא הופכת לחוד החנית של עולם התורה, אות ומופת לישיבה גדולה ונשגבה, אשר ממנה תצא תורה ומוסר לכל קצווי ארץ הקודש`,
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#5A7C4E] flex items-center relative z-20`}
    >
      <div className="section-wrapper w-full h-full pr-[7vw] pl-[5.7vw] py-[6.5vh] justify-end flex flex-col">
        <div
          className="small-text text-[#FBF4E6] text-[21px] leading-[1.4em] flex flex-col gap-y-6"
          dangerouslySetInnerHTML={{ __html: textData[0].text }}
        ></div>
        <div
          className="big-text text-[#FBF4E6] text-[28px] leading-[1em] flex flex-col gap-y-6 mt-6"
          dangerouslySetInnerHTML={{ __html: textData[0].quote }}
        ></div>
      </div>
    </section>
  );
}
