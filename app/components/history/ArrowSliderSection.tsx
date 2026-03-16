import CardSlider from "@/app/ui/CardSlider";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import Image from "next/image";
import sectionImage from "../../assets/images/arrow-section-image.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  bgPosition: string;
  bgClass: string;
  overlayClass: string;
}

export default function ArrowSliderSection(props: ChildProps) {
  const SliderData = [
    {
      text1: `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
      text2: `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    },
  ];
  return (
    <section
      dir="rtl"
      className={`bg-black flex items-center relative z-30 ${props.extraClass}`}
    >
      <IntroductionBackground
        bgImage={props.bgImage}
        overlayClass={props.overlayClass}
        imagePosition={props.bgPosition}
        bgClass={props.bgClass}
      />
      <div className="section-wrapper w-full h-full relative">
        <div className="absolute left-[8vw] top-[10vh]">
          <CardSlider SliderData={SliderData} />
        </div>
        <div className="section-image w-121 h-80.5 absolute bottom-[6vh] left-0 -ml-49">
          <Image
            className={`w-full object-cover h-full relative z-10`}
            src={sectionImage?.src}
            width={`484`}
            height={`322`}
            blurDataURL={sectionImage?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Section Image"
          />
        </div>
      </div>
    </section>
  );
}
