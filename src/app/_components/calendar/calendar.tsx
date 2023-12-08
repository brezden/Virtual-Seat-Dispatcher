"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Day } from "../../types/calendar";
import {
  formatDate,
  generateCalendarDays,
  getCurrentDateInEST,
} from "../../utils/calendar/dates";
import { classNames } from "../../utils/classNames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const currentDate = getCurrentDateInEST();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export default function Calendar() {
  const searchParams = useSearchParams();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    setDays(generateCalendarDays(`${year}-${month + 1}`));
  }, [month, year]);

  const handleNextMonth = useCallback(() => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
  }, [month]);

  const handlePrevMonth = useCallback(() => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
  }, [month]);

  const getMonthYearHeader = useMemo(() => {
    const date = new Date(year, month);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  }, [month, year]);

  const isCurrentMonth = useCallback(() => {
    return month === currentMonth && year === currentYear;
  }, [month, year]);

  const isTwoMonthsAhead = useCallback(() => {
    // Calculate the real-world current date again to ensure it's up-to-date
    const realCurrentMonth = currentMonth;
    const realCurrentYear = currentYear;

    // Check if the selected year is the same as the current year
    if (year === realCurrentYear) {
      // Check if the selected month is two months ahead of the current month
      return month === (realCurrentMonth + 2) % 12;
    } else if (year === realCurrentYear + 1) {
      // Check for the case where the year has changed (e.g., from December to January)
      return month === (realCurrentMonth - 10) % 12;
    }

    // In all other cases, return false
    return false;
  }, [month, year]);

  const selectedDate = searchParams.get("date") ?? currentDate;

  return (
    <>
      <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
        <div className="flex items-center justify-between text-gray-900">
          {!isCurrentMonth() ? (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <div className="h-5 w-5"></div>
          )}

          <div className="flex-auto text-sm font-semibold text-white">
            {getMonthYearHeader}
          </div>

          {!isTwoMonthsAhead() ? (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <div className="h-5 w-5"></div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-200">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-700 text-sm shadow ring-1 ring-gray-600">
          {days.map((day: Day, dayIdx: number) => {
            return (
              <div
                key={day.date}
                className="relative w-full"
                style={{ paddingTop: "100%" }}
              >
                <Link
                  type="button"
                  href={`?date=${day.date}`}
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
                </Link>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="mt-8 w-full rounded-md bg-highlight px-3 py-3 text-sm font-semibold text-white shadow transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
        >
          Book Seat
        </button>
      </div>
    </>
  );
}
