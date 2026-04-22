import gallery1 from "../../assets/images/conference-gallery1.jpg";
import gallery2 from "../../assets/images/conference-gallery2.jpg";
import gallery3 from "../../assets/images/conference-gallery3.jpg";
import gallery4 from "../../assets/images/conference-gallery4.jpg";
import gallery5 from "../../assets/images/conference-gallery5.jpg";
import VideoThumb from "../../assets/images/visit-temple/video.jpg";
import TempleTabs from "./TempleTabs";
import VideoSection from "./VideoSection";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function VisitTempleSection(props: ChildProps) {
  // Video Data
  const videoData = [
    {
      poster: VideoThumb,
      link: "http://dovp7.sg-host.com/wp-content/uploads/2026/03/video.mp4",
      title: `זיקה<br/> נצחית<br/> שאינה <br/>פוסקת`,
    },
  ];
  const tabsData = [
    {
      head: `בית מדרש`,
      content: {
        title: `בית מדרש`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: [
          { image: gallery1, size: "portrait" },
          { image: gallery2, size: "landescape" },
          { image: gallery3, size: "landescape" },
          { image: gallery4, size: "portrait" },
          { image: gallery5, size: "landescape" },
          { image: gallery1, size: "landescape" },
          { image: gallery2, size: "portrait" },
        ],
      },
    },
    {
      head: `חדרי שיעורים`,
      content: {
        title: `חדרי שיעורים`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: [
          { image: gallery1, size: "portrait" },
          { image: gallery2, size: "landescape" },
          { image: gallery3, size: "landescape" },
          { image: gallery4, size: "portrait" },
          { image: gallery5, size: "landescape" },
          { image: gallery1, size: "landescape" },
          { image: gallery2, size: "portrait" },
        ],
      },
    },
    {
      head: `אוצר הספרים`,
      content: {
        title: `אוצר הספרים`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: [
          { image: gallery1, size: "portrait" },
          { image: gallery2, size: "landescape" },
          { image: gallery3, size: "landescape" },
          { image: gallery4, size: "portrait" },
          { image: gallery5, size: "landescape" },
          { image: gallery1, size: "landescape" },
          { image: gallery2, size: "portrait" },
        ],
      },
    },
    {
      head: `חדר אוכל`,
      content: {
        title: `חדר אוכל`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: [
          { image: gallery1, size: "portrait" },
          { image: gallery2, size: "landescape" },
          { image: gallery3, size: "landescape" },
          { image: gallery4, size: "portrait" },
          { image: gallery5, size: "landescape" },
          { image: gallery1, size: "landescape" },
          { image: gallery2, size: "portrait" },
        ],
      },
    },
    {
      head: `כולל`,
      content: {
        title: `כולל`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: [
          { image: gallery1, size: "portrait" },
          { image: gallery2, size: "landescape" },
          { image: gallery3, size: "landescape" },
          { image: gallery4, size: "portrait" },
          { image: gallery5, size: "landescape" },
          { image: gallery1, size: "landescape" },
          { image: gallery2, size: "portrait" },
        ],
      },
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-black flex items-center relative z-20`}
    >
      <div className="visit-temple-wrapper flex w-full h-full">
        <VideoSection
          extraClass="video-item w-[25.6vw] h-full will-change-transform"
          animWidthText={props.animWidthText}
          data={JSON.stringify(videoData)}
        />
        <TempleTabs
          extraClass="w-[130vw] will-change-transform"
          animWidthText={props.animWidthText}
          data={JSON.stringify(tabsData)}
        />
      </div>
    </section>
  );
}
