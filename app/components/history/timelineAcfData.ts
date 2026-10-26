// Plain data-resolution helpers for HistoryScriptProvider's six timeline
// panels. These are intentionally NOT React components/hooks: they exist to
// move the large number of optional-chaining (`?.`) and fallback (`||`)
// expressions for ACF fields out of the component's own render body, which
// is what drove its reported cyclomatic/cognitive complexity. Each function
// returns a flat, already-resolved object so the component's JSX can
// reference plain properties instead of repeating `pageData?.acf?.timeline_N?.x || y`.
import {
  default as arrowSectionBG,
  default as arrowSectionBG2,
} from "../../assets/images/arrow-section-bg.jpg";
import arrowSectionImage from "../../assets/images/arrow-section-image2.jpg";
import introBG3 from "../../assets/images/intro-bg3.jpg";
import OnlyImage from "../../assets/images/only-image.jpg";
import OnlyImage2 from "../../assets/images/only-image2.jpg";
import QuoteSectionBG from "../../assets/images/quote-section-bg.jpg";
import HistoryImage1 from "../../assets/images/single-image.jpg";

export function getTimeline1Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_1;
  return {
    contentSection: timeline?.content_section || "",
    titleSection: timeline?.title_section || "",
    pastRabbisSection: timeline?.past_rabbis_section || [],
    singleImage: timeline?.single_image || HistoryImage1,
    markOfTheRoad: timeline?.mark_of_the_road || [],
    rabbisTimeline: timeline?.rabbis_timeline || [],
    introductionTitle: timeline?.introduction?.title || `סלבודקא`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תרל"ז - תרע"ד`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
    quoteSection: timeline?.quote_section || `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`,
  };
}

export function getTimeline2Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_2;
  return {
    newsPaperSection: timeline?.news_paper_section || [],
    titleSection: timeline?.title_section || "",
    pastRabbisSection: timeline?.past_rabbis_section || [],
    markOfTheRoad: timeline?.mark_of_the_road || [],
    introductionTitle: timeline?.introduction?.title || `מלחמת העולם<br/>הראשונה`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תרע"ד - תרפ"ד`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
  };
}

export function getTimeline3Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_3;
  return {
    evidenceOfPeriod: timeline?.evidence_of_period || [],
    titleSection: timeline?.title_section || "",
    pastRabbisSection: timeline?.past_rabbis_section || [],
    markOfTheRoad: timeline?.mark_of_the_road || [],
    introBannerBackground: timeline?.intro_banner?.background || introBG3,
    lambOfferingSection: timeline?.lamb_offering_section || [],
    introductionTitle: timeline?.introduction?.title || `חברון`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תרפ"ד – תרפ"ט`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
    introBannerTitle: timeline?.intro_banner?.title || `פרעות תרפ״ט`,
    arrowSliderSectionArrowSliderSlide1: timeline?.arrow_slider_section?.arrow_slider?.slide_1 || `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
    arrowSliderSectionArrowSliderSlide2: timeline?.arrow_slider_section?.arrow_slider?.slide_2 || `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    arrowSliderSectionBackground: timeline?.arrow_slider_section?.background || arrowSectionBG,
    arrowSliderSectionFloatingImage: timeline?.arrow_slider_section?.floating_image || arrowSectionImage,
  };
}

export function getTimeline4Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_4;
  return {
    moveToJerusalem: timeline?.move_to_jerusalem || [],
    titleSection: timeline?.title_section || "",
    pastRabbisSection: timeline?.past_rabbis_section || [],
    historyTimeline: timeline?.history_timeline || [],
    introductionTitle: timeline?.introduction?.title || `ירושלים של מעלה`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תרפ"ט - תשל"ו`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
    quoteSection: timeline?.quote_section || `<p><strong>שנת תשכ"ז:</strong> מינוי רבי רפאל אהרן יפהן לר"מ</p><p><strong>שנת תשכ"ח:</strong> רבי מרדכי חברוני לר"מ</p>`,
  };
}

export function getTimeline5Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_5;
  return {
    textSection: timeline?.text_section || "",
    arrowSliderSectionFloatingImage2:
      timeline?.arrow_slider_section?.floating_image_2 || "",
    singleVideo: timeline?.single_video || [],
    titleSection: timeline?.title_section || "",
    pastRabbisSection: timeline?.past_rabbis_section || [],
    historyTimeline: timeline?.history_timeline || [],
    introductionTitle: timeline?.introduction?.title || `גבעת<br/>מרדכי`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תשל״ו - תשנ״ז`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
    arrowSliderSectionArrowSliderSlide1: timeline?.arrow_slider_section?.arrow_slider?.slide_1 || `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
    arrowSliderSectionArrowSliderSlide2: timeline?.arrow_slider_section?.arrow_slider?.slide_2 || `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    arrowSliderSectionBackground: timeline?.arrow_slider_section?.background || arrowSectionBG2,
    arrowSliderSectionFloatingImage1: timeline?.arrow_slider_section?.floating_image_1 || arrowSectionImage,
  };
}

export function getTimeline6Data(chroniclesPageData: any) {
  const timeline = chroniclesPageData?.acf?.timeline_6;
  return {
    textSection: timeline?.text_section || "",
    singleImage: timeline?.single_image || "",
    cardSection: timeline?.card_section || [],
    parallaxImage: timeline?.parallax_image || OnlyImage,
    markOfTheRoad: timeline?.mark_of_the_road || [],
    imageWithTextSection: timeline?.image_with_text_section || [],
    onlyImage: timeline?.only_image || OnlyImage2,
    quoteSectionBackground: timeline?.quote_section?.background || QuoteSectionBG,
    introductionTitle: timeline?.introduction?.title || `הרחיבי מקום<br/>אוהלך`,
    introductionSubtitle: timeline?.introduction?.subtitle || `תשנ"ז - הווה`,
    introductionBackground: timeline?.introduction?.background || false,
    introductionBackgroundOverlayImage: timeline?.introduction?.background_overlay_image || false,
    quoteSectionText: timeline?.quote_section?.text || `<p><strong>שנת תשפ"ב</strong><br/> הרחבת בית המדרש</p>`,
  };
}
