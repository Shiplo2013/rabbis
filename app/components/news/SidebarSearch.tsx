"use client";
import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import { useEffect, useMemo, useRef, useState } from "react";

const hebrewCalendarFormatter = new Intl.DateTimeFormat("he-u-ca-hebrew", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const monthLabelFormatter = new Intl.DateTimeFormat("he-IL", {
  year: "numeric",
  month: "long",
});

function getMonthDays(baseDate: Date) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay();
  const gridStart = (startWeekday + 6) % 7;
  const cells = [];

  for (let i = 0; i < gridStart; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

export default function SidebarSearch() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const monthDays = useMemo(() => getMonthDays(viewMonth), [viewMonth]);

  const selectedValue = selectedDate
    ? hebrewCalendarFormatter.format(selectedDate)
    : "";

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const goToNextMonth = () => {
    setViewMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1),
    );
  };

  const goToPreviousMonth = () => {
    setViewMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1),
    );
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setPickerOpen(false);
  };

  return (
    <div ref={wrapperRef} className="search-group relative mb-[3vh]">
      <input
        className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
        type="text"
        id="search-by-date"
        name="Search-By-Date"
        placeholder="חיפוש לפי תאריך"
        value={selectedValue}
        readOnly
        onClick={() => setPickerOpen((isOpen) => !isOpen)}
      />
      <button
        type="button"
        onClick={() => setPickerOpen((isOpen) => !isOpen)}
        className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
      >
        <CalenderIcon />
      </button>
      {pickerOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 z-50 w-full min-w-80 bg-[#111111] border border-[#D1A94166] text-[#EEECDD] p-3">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="px-2 py-1 border border-[#D1A94166] hover:bg-[#D1A9411A]"
            >
              הקודם
            </button>
            <span className="text-[18px] text-[#D1A941]">
              {monthLabelFormatter.format(viewMonth)}
            </span>
            <button
              type="button"
              onClick={goToNextMonth}
              className="px-2 py-1 border border-[#D1A94166] hover:bg-[#D1A9411A]"
            >
              הבא
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[13px] mb-2 text-[#D1A941B2]">
            <span>ב</span>
            <span>ג</span>
            <span>ד</span>
            <span>ה</span>
            <span>ו</span>
            <span>ש</span>
            <span>א</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((dateCell, index) => {
              if (!dateCell) {
                return <span key={`empty-${index}`} className="h-10" />;
              }

              const isSelected =
                selectedDate &&
                dateCell.getDate() === selectedDate.getDate() &&
                dateCell.getMonth() === selectedDate.getMonth() &&
                dateCell.getFullYear() === selectedDate.getFullYear();

              return (
                <button
                  key={dateCell.toISOString()}
                  type="button"
                  onClick={() => selectDate(dateCell)}
                  className={`h-10 text-[14px] border ${isSelected ? "bg-[#D1A941] text-black border-[#D1A941]" : "border-[#D1A94133] hover:bg-[#D1A9411A]"}`}
                >
                  {dateCell.getDate()}
                </button>
              );
            })}
          </div>
          <div className="text-[12px] text-[#EEECDD99] mt-3 text-right">
            התאריך יוצג בפורמט עברי בעת הבחירה
          </div>
        </div>
      )}
    </div>
  );
}
