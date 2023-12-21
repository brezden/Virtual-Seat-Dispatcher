import type { Day } from "~/app/types/calendar";
import type { Booking } from "~/app/types/meeting";
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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

export function createDateFromDateTime(dateStr: string, timeStr: string): Date {
    // Format time string into HH:MM format
    const formattedTime = timeStr.slice(0, 2) + ':' + timeStr.slice(2);
    const dateTimeStr = `${dateStr}T${formattedTime}:00`;
    const date = new Date(dateTimeStr + 'Z');
    return date;
}

export function convertUtcToEst(time: string): string {
  // Parse the time as UTC
  const utcDate = new Date(`1970-01-01T${time}:00Z`);

  // Convert UTC to EST (UTC-5)
  const estOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
  const estDate = new Date(utcDate.getTime() - estOffset);

  // Convert to 12-hour format
  let hours = estDate.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the time
  const formattedHours = hours.toString().padStart(2, '0');
  const minutes = estDate.getUTCMinutes().toString().padStart(2, '0');

  return `${formattedHours}:${minutes} ${ampm}`;
}

export function isEarlier(time1: string, time2: string): boolean {
  // Helper function to convert time string to minutes since midnight
  const toMinutes = (time: string): number => {
      const [hours, minutes] = time.split(":").map(Number);
      if (hours !== undefined && minutes !== undefined) return hours * 60 + minutes;
      return 0;
  };

  // Convert each time to minutes since midnight and compare
  const minutes1 = toMinutes(time1);
  const minutes2 = toMinutes(time2);
  return minutes1 < minutes2;
}

export function formatTimesToEST(startTime: string, endTime: string): string {
  // Convert the ISO strings to Date objects
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Options for toLocaleTimeString to format time in 12-hour format with AM/PM
  const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/New_York' // EST time zone
  };

  // Format times to EST
  const formattedStartTime = startDate.toLocaleTimeString('en-US', options);
  const formattedEndTime = endDate.toLocaleTimeString('en-US', options);

  return `${formattedStartTime} - ${formattedEndTime}`;
}

export function formatBookingDetails(booking: Booking): string {
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', timeZone: 'UTC' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', timeZone: 'America/New_York' };

  if (booking.allDay ?? !booking.endDate) {
      const date = booking.startDate.toLocaleDateString('en-US', dateOptions);
      return `Booked All Day for ${date} at Desk ${booking.location}`;
  } else {
      const startDate = booking.startDate.toLocaleDateString('en-US', dateOptions) + ' ' + booking.startDate.toLocaleTimeString('en-US', timeOptions);
      const endTime = booking.endDate.toLocaleTimeString('en-US', timeOptions);
      return `You booked on ${startDate} to ${endTime} at Desk ${booking.location}`;
  }
}

export function formatDateToString(date: string): string {
  const zonedDate = utcToZonedTime(date, 'UTC');
  return format(zonedDate, 'MMMM do yyyy');
}