import type { Day } from "~/app/types/calendar";

export function getCurrentDateInEST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC
  const estOffset = 5 * 60 * 60000; // EST is UTC-5 hours
  const estTime = new Date(utc - estOffset);
  estTime.setHours(0, 0, 0, 0);
  return estTime;
}

export function getCurrentDateESTStringDash(): string {
  const now = new Date();

  // Convert the current time to Eastern Standard Time
  // 'America/New_York' is typically used for EST
  const estTime = now.toLocaleString("en-US", { timeZone: "America/New_York" });

  // Convert the EST time string back to a Date object
  const estDate = new Date(estTime);

  // Format the date in YYYY-MM-DD format
  const year = estDate.getFullYear();
  const month = estDate.getMonth() + 1; // getMonth() returns 0-11
  const day = estDate.getDate();

  // Pad single digit month and day with leading zero
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function getCurrentDateESTString(): string {
  const estOffset = 5 * 60; // EST is UTC-5 hours, converted to minutes
  const now = new Date();
  const estTime = new Date(now.getTime() - estOffset * 60000); // Adjust to EST

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = estTime.getDate();
  const monthIndex = estTime.getMonth();
  const year = estTime.getFullYear();

  const suffixes = ["th", "st", "nd", "rd"];
  const relevantSuffix =
    day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10;

  return `${months[monthIndex]} ${day}${suffixes[relevantSuffix]}, ${year}`;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateCalendarDays(inputMonth: string): Day[] {
  const parts = inputMonth.split("-");
  if (parts.length !== 2) {
    throw new Error("Invalid input format. Expected format: YYYY-MM");
  }

  const yearStr = parts[0];
  const monthStr = parts[1];

  if (!yearStr || !monthStr) {
    throw new Error("Invalid input format. Year or month is missing.");
  }

  const year = parseInt(yearStr);
  const month = parseInt(monthStr) - 1; // Month is 0-indexed

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Adjust start date to the nearest previous Monday
  const startDate = new Date(firstDayOfMonth);
  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Adjust end date to the nearest following Sunday
  const endDate = new Date(lastDayOfMonth);
  while (endDate.getDay() !== 0) {
    endDate.setDate(endDate.getDate() + 1);
  }

  // Ensure that we only generate 35 days (5 weeks)
  while (endDate.getDate() - startDate.getDate() + 1 > 35) {
    endDate.setDate(endDate.getDate() - 1);
  }

  const days = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push({
      date: d.toISOString().split("T")[0] ?? "",
      isExpired: d < today,
      isToday: d.toDateString() === today.toDateString(),
      isCurrentMonth: d.getMonth() === month,
    });
  }

  return days;
}

export function formatDateString(inputDate: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const suffixes = ["th", "st", "nd", "rd"];
  const relevantSuffix =
    day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10;

  return `${months[monthIndex]} ${day}${suffixes[relevantSuffix]}, ${year}`;
}
