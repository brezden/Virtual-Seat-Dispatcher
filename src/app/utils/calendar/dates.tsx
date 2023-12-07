import type { Day } from "~/app/types/calendar";

export function getCurrentDateInEST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC
  const estOffset = 5 * 60 * 60000; // EST is UTC-5 hours
  const estTime = new Date(utc - estOffset);
  estTime.setHours(0, 0, 0, 0);
  return estTime;
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

export function formatDateString(dateString: string): string {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Define an array of month names
  const monthNames = [
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

  // Extract the day, month and year from the date
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Determine the ordinal suffix for the day
  const suffix =
    (day > 3 && day < 21) || day % 10 > 3
      ? "th"
      : ["st", "nd", "rd"][(day % 10) - 1];

  // Return the formatted date string
  return `${month} ${day}${suffix}, ${year}`;
}
