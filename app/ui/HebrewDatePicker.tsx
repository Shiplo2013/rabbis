"use client";

import ArrowLeftCalender from "@/app/assets/icons/ArrowLeftCalender";
import ArrowRightCalender from "@/app/assets/icons/ArrowRightCalender";
import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import MonthCaret from "@/app/assets/icons/MonthCaret";
import YearCaret from "@/app/assets/icons/YearCaret";
import { HDate, gematriya } from "@hebcal/core";
import { useEffect, useMemo, useRef, useState } from "react";

const hebrewMonths = [
  "ניסן",
  "אייר",
  "סיון",
  "תמוז",
  "אב",
  "אלול",
  "תשרי",
  "חשון",
  "כסלו",
  "טבת",
  "שבט",
  "אדר",
  "אדר ב׳",
];
const weekdayLabels = ["א", "ב", "ג", "ד", "ה", "ו", "ז"];

interface HebrewDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  className?: string;
  inputClassName?: string;
  inputAriaLabel?: string;
  toggleAriaLabel?: string;
  yearRangeBefore?: number;
  yearRangeAfter?: number;
}

export default function HebrewDatePicker({
  selectedDate,
  onDateChange,
  className = "date-picker search-group relative mb-[3vh]",
  inputClassName = "text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8",
  inputAriaLabel = "Search By Date Input",
  toggleAriaLabel = "Toggle Date Picker",
  yearRangeBefore = 40,
  yearRangeAfter = 20,
}: HebrewDatePickerProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const todayHebrewYear = new HDate(new Date()).getFullYear();
  const selectedHebrewDate = selectedDate ? new HDate(selectedDate) : null;
  const [viewYear, setViewYear] = useState(todayHebrewYear);
  const [viewMonth, setViewMonth] = useState(
    new HDate(new Date()).getMonth(),
  );
  const yearOptions = useMemo(
    () =>
      Array.from(
        { length: yearRangeBefore + yearRangeAfter },
        (_, index) => todayHebrewYear - yearRangeBefore + index,
      ),
    [todayHebrewYear, yearRangeAfter, yearRangeBefore],
  );
  const minYear = yearOptions[0];
  const maxYear = yearOptions[yearOptions.length - 1];
  const monthsInViewYear = HDate.monthsInYear(viewYear);
  const monthOptions = useMemo(
    () => Array.from({ length: monthsInViewYear }, (_, index) => index + 1),
    [monthsInViewYear],
  );
  const daysInViewMonth = HDate.daysInMonth(viewMonth, viewYear);
  const firstDayOfMonth = new HDate(1, viewMonth, viewYear).getDay();
  const dayGrid = useMemo(() => {
    const cells = Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDayOfMonth + 1;
      const date = day > 0 && day <= daysInViewMonth ? day : null;

      return {
        day: date,
        key:
          date === null
            ? `empty-${index}`
            : `day-${viewYear}-${viewMonth}-${date}`,
      };
    });

    return cells;
  }, [daysInViewMonth, firstDayOfMonth, viewMonth, viewYear]);
  const selectedDateLabel = selectedHebrewDate
    ? `${gematriya(selectedHebrewDate.getDate())} ${hebrewMonths[selectedHebrewDate.getMonth() - 1]} ${gematriya(selectedHebrewDate.getFullYear())}`
    : "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (viewMonth > monthsInViewYear) {
      setViewMonth(monthsInViewYear);
    }
  }, [monthsInViewYear, viewMonth]);

  const goToPrevMonth = () => {
    if (viewMonth > 1) {
      setViewMonth((previous) => previous - 1);
      return;
    }

    if (viewYear > minYear) {
      const previousYear = viewYear - 1;
      setViewYear(previousYear);
      setViewMonth(HDate.monthsInYear(previousYear));
    }
  };

  const goToNextMonth = () => {
    if (viewMonth < monthsInViewYear) {
      setViewMonth((previous) => previous + 1);
      return;
    }

    if (viewYear < maxYear) {
      setViewYear((previous) => previous + 1);
      setViewMonth(1);
    }
  };

  return (
    <div ref={datePickerRef} className={className}>
      <input
        className={inputClassName}
        type="text"
        id="search-by-date"
        name="Search-By-Date"
        placeholder="חיפוש לפי תאריך"
        value={selectedDateLabel}
        readOnly
        onClick={() => setIsDatePickerOpen((previous) => !previous)}
        aria-label={inputAriaLabel}
      />
      <button
        type="button"
        aria-label={toggleAriaLabel}
        className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
        onClick={() => setIsDatePickerOpen((previous) => !previous)}
      >
        <CalenderIcon />
      </button>

      {isDatePickerOpen && (
        <div className="absolute top-full right-0 mt-1 min-w-100 max-w-full rounded-xl border border-[#ffffff] bg-[#F3E8D5] p-4 z-60 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <div className="calendar-top flex items-stretch justify-between mb-3">
            <button
              type="button"
              aria-label="Previous Month"
              className="w-9 h-9 rounded-full bg-[#ffffff] leading-none cursor-pointer flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
              onClick={goToPrevMonth}
            >
              <span className="block w-2">
                <ArrowRightCalender />
              </span>
            </button>

            <div className="flex items-stretch gap-x-1">
              <div className="years relative h-full">
                <select
                  aria-label="Select Year"
                  className="appearance-none bg-[#ffffff] rounded-md px-3 pl-1 pr-4 text-[18px] leading-[1em] font-bold text-black focus:outline-none cursor-pointer shadow-[0_1px_1px_rgba(0,0,0,0.05)] h-full"
                  value={viewYear}
                  onChange={(event) => {
                    setViewYear(Number(event.target.value));
                    onDateChange(null);
                  }}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {gematriya(year)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 bottom-2.5">
                  <YearCaret />
                </span>
              </div>
              <div className="months relative h-full">
                <select
                  aria-label="Select Month"
                  className="appearance-none bg-[#ffffff] border-2 border-[#1D5DFF] rounded-md px-3 pl-1 pr-4 text-[18px] leading-[1em] font-bold text-black focus:outline-none cursor-pointer shadow-[0_1px_1px_rgba(0,0,0,0.05)] h-full"
                  value={viewMonth}
                  onChange={(event) => {
                    setViewMonth(Number(event.target.value));
                    onDateChange(null);
                  }}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {hebrewMonths[month - 1]}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-2.5 right-2">
                  <MonthCaret />
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Next Month"
              className="w-9 h-9 rounded-full bg-[#FFFFFF] leading-none cursor-pointer flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
              onClick={goToNextMonth}
            >
              <span className="block w-2">
                <ArrowLeftCalender />
              </span>
            </button>
          </div>

          <div className="weekday-row grid grid-cols-7 gap-1.5 mb-3 text-center text-[16px] leading-none text-black">
            {weekdayLabels.map((dayLabel) => (
              <div
                key={dayLabel}
                className="py-1 w-10 h-10 flex items-center justify-center"
              >
                {dayLabel}
              </div>
            ))}
          </div>

          <div className="date-grid grid grid-cols-7 gap-1.5">
            {dayGrid.map(({ day, key }) => (
              <button
                key={key}
                type="button"
                aria-label={
                  day !== null
                    ? `Select ${gematriya(day)} ${hebrewMonths[viewMonth - 1]} ${gematriya(viewYear)}`
                    : "Empty Day"
                }
                disabled={day === null}
                className={`h-10 rounded-md text-[16px] leading-none font-medium transition-colors duration-200 shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${
                  day === null
                    ? "bg-[#FBF4E6CF] text-transparent cursor-default"
                    : selectedHebrewDate?.getFullYear() === viewYear &&
                        selectedHebrewDate.getMonth() === viewMonth &&
                        selectedHebrewDate.getDate() === day
                      ? "bg-[#D1A941] text-black"
                      : "bg-[#ffffff] text-black hover:bg-[#D1A941] cursor-pointer"
                }`}
                onClick={() => {
                  if (day !== null) {
                    onDateChange(new HDate(day, viewMonth, viewYear).greg());
                    setIsDatePickerOpen(false);
                  }
                }}
              >
                {day !== null ? gematriya(day) : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
