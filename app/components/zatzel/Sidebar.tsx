"use client";
import ArrowLeftCalender from "@/app/assets/icons/ArrowLeftCalender";
import ArrowRightCalender from "@/app/assets/icons/ArrowRightCalender";
import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import MonthCaret from "@/app/assets/icons/MonthCaret";
import UserIcon from "@/app/assets/icons/UserIcon";
import YearCaret from "@/app/assets/icons/YearCaret";
import { HDate, gematriya } from "@hebcal/core";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Sidebar() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewYear, setViewYear] = useState<number>(
    new HDate(new Date()).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState<number>(
    new HDate(new Date()).getMonth(),
  );
  const datePickerRef = useRef<HTMLDivElement>(null);

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

  const todayHebrewYear = new HDate(new Date()).getFullYear();
  const yearOptions = useMemo(
    () => Array.from({ length: 60 }, (_, i) => todayHebrewYear - 40 + i),
    [todayHebrewYear],
  );
  const minYear = yearOptions[0];
  const maxYear = yearOptions[yearOptions.length - 1];
  const monthsInViewYear = HDate.monthsInYear(viewYear);

  const monthOptions = useMemo(
    () => Array.from({ length: monthsInViewYear }, (_, i) => i + 1),
    [monthsInViewYear],
  );

  const daysInViewMonth = HDate.daysInMonth(viewMonth, viewYear);
  const firstDayOfMonth = new HDate(1, viewMonth, viewYear).getDay();

  const dayGrid = useMemo(() => {
    const leadingEmpty = Array.from({ length: firstDayOfMonth }, () => null);
    const days = Array.from({ length: daysInViewMonth }, (_, i) => i + 1);
    const cells = [...leadingEmpty, ...days];

    while (cells.length < 42) {
      cells.push(null);
    }

    return cells;
  }, [daysInViewMonth, firstDayOfMonth]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (viewMonth > monthsInViewYear) {
      setViewMonth(monthsInViewYear);
    }
  }, [monthsInViewYear, viewMonth]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const maxDays = HDate.daysInMonth(selectedMonth, selectedYear);
      if (selectedDay > maxDays) {
        setSelectedDay(maxDays);
      }
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    if (selectedMonth && selectedMonth > monthsInViewYear) {
      setSelectedMonth(null);
      setSelectedDay(null);
    }
  }, [monthsInViewYear, selectedMonth]);

  const goToPrevMonth = () => {
    if (viewMonth > 1) {
      setViewMonth((prev) => prev - 1);
      return;
    }

    if (viewYear > minYear) {
      const prevYear = viewYear - 1;
      setViewYear(prevYear);
      setViewMonth(HDate.monthsInYear(prevYear));
    }
  };

  const goToNextMonth = () => {
    const monthsInCurrentViewYear = HDate.monthsInYear(viewYear);
    if (viewMonth < monthsInCurrentViewYear) {
      setViewMonth((prev) => prev + 1);
      return;
    }

    if (viewYear < maxYear) {
      setViewYear((prev) => prev + 1);
      setViewMonth(1);
    }
  };

  const selectedDateLabel =
    selectedYear && selectedMonth && selectedDay
      ? `${gematriya(selectedDay)} ${hebrewMonths[selectedMonth - 1]} ${gematriya(selectedYear)}`
      : "";
  return (
    <>
      <div
        ref={datePickerRef}
        className="date-picker search-group relative mb-[3vh]"
      >
        <input
          className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
          type="text"
          id="search-by-date"
          name="Search-By-Date"
          placeholder="חיפוש לפי תאריך"
          value={selectedDateLabel}
          readOnly
          onClick={() => setIsDatePickerOpen((prev) => !prev)}
        />
        <button
          type="button"
          className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
          onClick={() => setIsDatePickerOpen((prev) => !prev)}
        >
          <CalenderIcon />
        </button>

        {isDatePickerOpen && (
          <div className="absolute top-full right-0 mt-1 min-w-100 max-w-full rounded-xl border border-[#ffffff] bg-[#F3E8D5] p-4 z-60 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="calendar-top flex items-stretch justify-between mb-3">
              <button
                type="button"
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
                    className="appearance-none bg-[#ffffff] rounded-md px-3 pl-1 pr-4 text-[18px] leading-[1em] font-bold text-black focus:outline-none cursor-pointer shadow-[0_1px_1px_rgba(0,0,0,0.05)] h-full"
                    value={viewYear}
                    onChange={(e) => {
                      const y = Number(e.target.value);
                      setViewYear(y);
                      setSelectedYear(y);
                      setSelectedDay(null);
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
                    className="appearance-none bg-[#ffffff] border-2 border-[#1D5DFF] rounded-md px-3 pl-1 pr-4 text-[18px] leading-[1em] font-bold text-black focus:outline-none cursor-pointer shadow-[0_1px_1px_rgba(0,0,0,0.05)] h-full"
                    value={viewMonth}
                    onChange={(e) => {
                      setViewMonth(Number(e.target.value));
                      setSelectedMonth(Number(e.target.value));
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
              {dayGrid.map((day, index) => (
                <button
                  key={`${day ?? "empty"}-${index}`}
                  type="button"
                  disabled={day === null}
                  className={`h-10 rounded-md text-[16px] leading-none font-medium transition-all duration-200 shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${
                    day === null
                      ? "bg-[#FBF4E6CF] text-transparent cursor-default"
                      : selectedYear === viewYear &&
                          selectedMonth === viewMonth &&
                          selectedDay === day
                        ? "bg-[#D1A941] text-black"
                        : "bg-[#ffffff] text-black hover:bg-[#D1A941] cursor-pointer"
                  }`}
                  onClick={() => {
                    if (day !== null) {
                      setSelectedYear(viewYear);
                      setSelectedMonth(viewMonth);
                      setSelectedDay(day);
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
      <div className="search-group relative">
        <input
          className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
          type="text"
          id="search-by-user"
          name="Search-By-User"
          placeholder={`חיפוש לפי שם`}
        />
        <button className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2">
          <UserIcon />
        </button>
      </div>
    </>
  );
}
