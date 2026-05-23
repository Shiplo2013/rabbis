"use client";
import ArrowLeftCalender from "@/app/assets/icons/ArrowLeftCalender";
import ArrowRightCalender from "@/app/assets/icons/ArrowRightCalender";
import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import { useEffect, useMemo, useRef, useState } from "react";

const hebrewCalendarFormatter = new Intl.DateTimeFormat("he-u-ca-hebrew", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const hebrewMonthFormatter = new Intl.DateTimeFormat("he-u-ca-hebrew", {
  month: "long",
});

const hebrewYearFormatter = new Intl.DateTimeFormat("he-u-ca-hebrew", {
  year: "numeric",
});

const hebrewYearNumericFormatter = new Intl.DateTimeFormat("en-u-ca-hebrew", {
  year: "numeric",
});

const hebrewOnes = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
const hebrewTens = ["", "י", "כ", "ל"];
const hebrewHundreds = ["", "ק", "ר", "ש", "ת", "תק", "תר", "תש", "תת", "תתק"];
const hebrewYearTens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];

function formatHebrewDayValue(day: number) {
  if (day <= 0 || day > 31) {
    return String(day);
  }

  if (day <= 9) {
    return hebrewOnes[day];
  }

  if (day === 15) {
    return "טו";
  }

  if (day === 16) {
    return "טז";
  }

  const tens = Math.floor(day / 10);
  const ones = day % 10;
  return `${hebrewTens[tens]}${hebrewOnes[ones]}`;
}

function formatHebrewYearText(gregorianYear: number) {
  const numericYear = Number(
    hebrewYearNumericFormatter.format(new Date(gregorianYear, 8, 1)),
  );

  if (Number.isNaN(numericYear)) {
    return hebrewYearFormatter.format(new Date(gregorianYear, 8, 1));
  }

  const shortYear = numericYear % 1000;
  const hundreds = Math.floor(shortYear / 100);
  const tensOnes = shortYear % 100;
  const tens = Math.floor(tensOnes / 10);
  const ones = tensOnes % 10;

  let lastTwo = `${hebrewYearTens[tens]}${hebrewOnes[ones]}`;
  if (tensOnes === 15) {
    lastTwo = "טו";
  }
  if (tensOnes === 16) {
    lastTwo = "טז";
  }

  let text = `${hebrewHundreds[hundreds]}${lastTwo}`;

  if (text.length > 1) {
    text = `${text.slice(0, -1)}״${text.slice(-1)}`;
  }

  return text;
}

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
  const monthOptions = useMemo(() => {
    const options = Array.from({ length: 12 }, (_, index) => ({
      value: index,
      label: hebrewMonthFormatter.format(
        new Date(viewMonth.getFullYear(), index, 15),
      ),
    }));

    const tishreiIndex = options.findIndex((option) =>
      option.label.includes("תשרי"),
    );

    if (tishreiIndex <= 0) {
      return options;
    }

    return [...options.slice(tishreiIndex), ...options.slice(0, tishreiIndex)];
  }, [viewMonth]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);
  }, []);

  const getHebrewYearLabel = (yearValue: number) =>
    formatHebrewYearText(Number(yearValue));

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

  const setMonth = (monthIndex: number) => {
    setViewMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), Number(monthIndex), 1),
    );
  };

  const setYear = (yearValue: number) => {
    setViewMonth(
      (prevMonth) => new Date(Number(yearValue), prevMonth.getMonth(), 1),
    );
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
        <div className="absolute top-full right-0 z-50 w-107.5 max-w-[95vw] rounded-[18px] border border-[#ffffff] bg-[#F3E8D5] p-6 shadow-[0_12px_35px_#000E3340]">
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="h-12 w-12 rounded-full bg-[#FFFFFF] text-black hover:bg-white text-[30px] leading-none flex items-center justify-center cursor-pointer"
              aria-label="חודש קודם"
            >
              <span className="w-2.5 h-auto block">
                <ArrowRightCalender />
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              <label className="sr-only" htmlFor="calendar-month-select">
                חודש
              </label>
              <select
                id="calendar-month-select"
                value={viewMonth.getMonth()}
                onChange={(event) => setMonth(Number(event.target.value))}
                className="h-11 w-20 rounded-lg border border-[#1D4ED8] bg-[#F5F4F0] px-2 text-[44px] font-medium leading-none text-[#1E1E1E] focus:outline-none focus:ring-0"
              >
                {monthOptions.map((monthOption) => (
                  <option key={monthOption.value} value={monthOption.value}>
                    {monthOption.label}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="calendar-year-select">
                שנה
              </label>
              <select
                id="calendar-year-select"
                value={viewMonth.getFullYear()}
                onChange={(event) => setYear(Number(event.target.value))}
                className="h-11 w-24 rounded-lg border border-[#DAD7D0] bg-[#F5F4F0] px-2 text-[44px] font-medium leading-none text-[#1E1E1E] focus:outline-none focus:ring-0"
              >
                {yearOptions.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {getHebrewYearLabel(yearOption)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={goToNextMonth}
              className="h-12 w-12 rounded-full bg-[#EFEFEA] text-black hover:bg-white text-[30px] leading-none flex items-center justify-center"
              aria-label="חודש הבא"
            >
              <span className="w-2 h-auto block">
                <ArrowLeftCalender />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-[30px] mb-4 text-[#212121] leading-none">
            <span>ז</span>
            <span>ו</span>
            <span>ה</span>
            <span>ד</span>
            <span>ג</span>
            <span>ב</span>
            <span>א</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((dateCell, index) => {
              if (!dateCell) {
                return (
                  <span
                    key={`empty-${index}`}
                    className="h-12 w-12 rounded-md bg-transparent"
                  />
                );
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
                  className={`h-12 w-12 rounded-md text-[32px] leading-none ${isSelected ? "bg-[#C6A035] text-[#101010]" : "bg-[#ECECEA] text-[#212121] hover:bg-[#E5E2DB]"}`}
                >
                  {formatHebrewDayValue(dateCell.getDate())}
                </button>
              );
            })}
          </div>
          <div className="text-[12px] text-[#504C45] mt-3 text-right">
            התאריך יוצג בפורמט עברי בעת הבחירה
          </div>
        </div>
      )}
    </div>
  );
}
