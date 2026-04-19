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
        images: {
          image1: ``,
          image2: ``,
          image3: ``,
          image4: ``,
          image5: ``,
          image6: ``,
          image7: ``,
        },
      },
    },
    {
      head: `חדרי שיעורים`,
      content: {
        title: `חדרי שיעורים`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: {
          image1: ``,
          image2: ``,
          image3: ``,
          image4: ``,
          image5: ``,
          image6: ``,
          image7: ``,
        },
      },
    },
    {
      head: `אוצר הספרים`,
      content: {
        title: `אוצר הספרים`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: {
          image1: ``,
          image2: ``,
          image3: ``,
          image4: ``,
          image5: ``,
          image6: ``,
          image7: ``,
        },
      },
    },
    {
      head: `חדר אוכל`,
      content: {
        title: `חדר אוכל`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: {
          image1: ``,
          image2: ``,
          image3: ``,
          image4: ``,
          image5: ``,
          image6: ``,
          image7: ``,
        },
      },
    },
    {
      head: `כולל`,
      content: {
        title: `כולל`,
        subtitle: `קול תורה נשמע בעוז, מהדהד זה דורות ומוסיף והולך<br/>בהיכל ישיבת חברון.`,
        text: `<p>בית המדרש הומה, שוקק חיים, ומפיהם של כ־2000 בחורי חמד, טובי הבחורים בעולם הישיבות, עולה ניגון התורה הבלתי פוסק.</p><p>שקלא וטריא, עמל ויגיעה, עיון ובקיאות, כולם מתלכדים לשאון מתוק של ים התלמוד, שבו שוקעים הלומדים מתוך התמדה ודיבוק חברים. קלא דלא פסיק - הבונה דורות של בני תורה וממשיך לשאת את מורשת הישיבה בגאון.</p>`,
        images: {
          image1: ``,
          image2: ``,
          image3: ``,
          image4: ``,
          image5: ``,
          image6: ``,
          image7: ``,
        },
      },
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-black flex items-center relative z-20`}
    >
      <div className="visit-temple-wrapper w-full h-full">
        <VideoSection
          extraClass="video-item w-[25.6vw] h-full"
          animWidthText={props.animWidthText}
          data={JSON.stringify(videoData)}
        />
        <TempleTabs extraClass="" animWidthText={props.animWidthText} />
      </div>
    </section>
  );
}
