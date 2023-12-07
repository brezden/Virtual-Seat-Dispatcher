"use client";

import React, { useState } from "react";

const days = [
  { date: "2023-11-27", isExpired: true },
  { date: "2023-11-28", isExpired: true },
  { date: "2023-11-29", isExpired: true },
  { date: "2023-11-30", isExpired: true },
  { date: "2023-12-01", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-02", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-03", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-04", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-05", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-06", isCurrentMonth: true, isExpired: true },
  { date: "2023-12-07", isCurrentMonth: true, isToday: true },
  { date: "2023-12-08", isCurrentMonth: true },
  { date: "2023-12-09", isCurrentMonth: true },
  { date: "2023-12-10", isCurrentMonth: true },
  { date: "2023-12-11", isCurrentMonth: true },
  { date: "2023-12-12", isCurrentMonth: true },
  { date: "2023-12-13", isCurrentMonth: true },
  { date: "2023-12-14", isCurrentMonth: true },
  { date: "2023-12-15", isCurrentMonth: true },
  { date: "2023-12-16", isCurrentMonth: true },
  { date: "2023-12-17", isCurrentMonth: true },
  { date: "2023-12-18", isCurrentMonth: true },
  { date: "2023-12-19", isCurrentMonth: true },
  { date: "2023-12-20", isCurrentMonth: true },
  { date: "2023-12-21", isCurrentMonth: true },
  { date: "2023-12-22", isCurrentMonth: true },
  { date: "2023-12-23", isCurrentMonth: true },
  { date: "2023-12-24", isCurrentMonth: true },
  { date: "2023-12-25", isCurrentMonth: true },
  { date: "2023-12-26", isCurrentMonth: true },
  { date: "2023-12-27", isCurrentMonth: true },
  { date: "2023-12-28", isCurrentMonth: true },
  { date: "2023-12-29", isCurrentMonth: true },
  { date: "2023-12-30", isCurrentMonth: true },
  { date: "2023-12-31", isCurrentMonth: true },
];

const currentDate = getCurrentDateInEST();
const currentDateString = formatDate(currentDate);

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isExpired?: boolean;
}

export default function DayBoxes() {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    currentDateString,
  );

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-700 text-sm shadow ring-1 ring-gray-600">
        {days.map((day: Day, dayIdx: number) => {
          return (
            <div
              key={day.date}
              className="relative w-full"
              style={{ paddingTop: "100%" }}
            >
              <button
                type="button"
                onClick={() => !day.isExpired && handleDayClick(day.date)}
                className={classNames(
                  "absolute left-0 top-0 flex h-full w-full items-center justify-center transition duration-300",
                  day.isExpired
                    ? "cursor-not-allowed bg-gray-900 text-gray-400"
                    : "hover:bg-gray-600",
                  day.isCurrentMonth ? "bg-gray-800" : "bg-gray-700",
                  day.isToday && "font-semibold",
                  day.date == selectedDate && "bg-highlight text-white",
                  !(day.date == selectedDate) &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-300",
                  !(day.date == selectedDate) &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    !day.isExpired &&
                    "text-gray-500",
                  day.date == selectedDate &&
                    !day.isCurrentMonth &&
                    "text-white",
                  day.isToday && day.date != selectedDate && "text-highlight",
                  dayIdx === 0 && "rounded-tl-lg",
                  dayIdx === 6 && "rounded-tr-lg",
                  dayIdx === days.length - 7 && "rounded-bl-lg",
                  dayIdx === days.length - 1 && "rounded-br-lg",
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    "flex items-center justify-center rounded-full",
                  )}
                >
                  {day.date.split("-").pop()?.replace(/^0/, "") ?? ""}
                </time>
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-8 w-full rounded-md bg-highlight px-3 py-3 text-sm font-semibold text-white shadow hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
      >
        Book Seat
      </button>
    </>
  );
}

function classNames(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

function getCurrentDateInEST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC
  const estOffset = 5 * 60 * 60000; // EST is UTC-5 hours
  const estTime = new Date(utc - estOffset);
  estTime.setHours(0, 0, 0, 0);
  return estTime;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
