import NotificationPopup from "@/app/components/history/NotificationPopup";
import VideoPopup from "@/app/components/history/VideoPopup";
import { useAppState } from "../../components/AppContext";
import HistoryTimeline from "../HistoryTimeline";

export default function ChroniclesElements() {
  // Selectors

  const { historyTimelineData } = useAppState();
  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title:
        historyTimelineData?.acf?.timeline_1?.introduction?.subtitle ||
        `תרל"ז - תרע"ד`,
    },
    {
      id: 2,
      title:
        historyTimelineData?.acf?.timeline_2?.introduction?.subtitle ||
        `תרע"ד - תרפ"ד`,
    },
    {
      id: 3,
      title:
        historyTimelineData?.acf?.timeline_3?.introduction?.subtitle ||
        `תרפ"ד - תרפ"ט`,
    },
    {
      id: 4,
      title:
        historyTimelineData?.acf?.timeline_4?.introduction?.subtitle ||
        `תרפ"ט - תשל"ו`,
    },
    {
      id: 5,
      title:
        historyTimelineData?.acf?.timeline_5?.introduction?.subtitle ||
        `תשל״ו - תשנ״ז`,
    },
    {
      id: 6,
      title:
        historyTimelineData?.acf?.timeline_6?.introduction?.subtitle ||
        `תשנ"ז - הווה`,
    },
  ];

  return (
    <>
      <HistoryTimeline
        wrapperId="history-timeline"
        progressId="history-timeline-progress"
        timelineData={TimelineData}
      />
      <VideoPopup />
      <NotificationPopup />
      <div
        id="drag-me"
        className="fixed left-0 top-0 z-30 cursor-none opacity-0 pointer-events-none scale-0 bg-[#BBA588] text-black px-5 py-2.5 rounded-full text-[20px] leading-[1em]"
      >
        <p>ניתן לגרור</p>
      </div>
    </>
  );
}
