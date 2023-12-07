"use client";

import React, { useState } from "react";
import type { Day } from "../../types/calendar";
import {
  formatDate,
  generateCalendarDays,
  getCurrentDateInEST,
} from "../../utils/calendar/dates";

const days = generateCalendarDays("2024-02");
const currentDate = getCurrentDateInEST();
const currentDateString = formatDate(currentDate);

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
