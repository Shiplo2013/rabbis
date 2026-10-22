"use client";
import { useState } from "react";
import HebrewDatePicker from "@/app/ui/HebrewDatePicker";

export default function SidebarSearch() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <HebrewDatePicker
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}
