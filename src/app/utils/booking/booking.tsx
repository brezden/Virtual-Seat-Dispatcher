import type { Booking, BookingData } from "~/app/types/meeting";
import { addMinutes } from "date-fns";

export function deskAvailable(bookings: BookingData[]): number[] {
    const fullDesksSet = new Set<number>();

    bookings.forEach((booking) => {
        if (booking.allDay === true) {
            fullDesksSet.add(booking.location);
        }
    });

    return Array.from(fullDesksSet);
}

export function availableTimeSlots(bookings: BookingData[]): string[] {
    let defaultTimeSlots = getTimeSlots();
    if (bookings.length === 0) {
        return defaultTimeSlots;
    }
    bookings.forEach(booking => {
        const meetingSlots = getTimeSlots(booking.date, booking.enddate!);
        defaultTimeSlots = defaultTimeSlots.filter(slot => !meetingSlots.includes(slot));
    });
    return defaultTimeSlots;
}

function getTimeSlots(startDate?: string, endDate?: string): string[] {
    let startEST: Date;
    let endDateEST: Date;

    if (!startDate || !endDate) {
        startEST = new Date();
        startEST.setUTCHours(12, 0, 0, 0); // Start time at 12:00 UTC
        endDateEST = new Date();
        endDateEST.setUTCHours(23, 0, 0, 0); // End time at 23:00 UTC
    } else {
        startEST = new Date(startDate);
        endDateEST = new Date(endDate);
    }

    let currentTime = startEST;
    const timeSlots: string[] = [];
    while (currentTime <= endDateEST) {
        timeSlots.push(currentTime.toISOString().substring(11, 16));
        currentTime = addMinutes(currentTime, 15); // Increment by 15 minutes
    }
    return timeSlots;
}

export function bookingIsInvalid(bookingData: BookingData[], booking: Booking): boolean {
  // Convert start date to Date object and determine the end date based on the allDay flag
  const newBookingStart = booking.startDate;
  const newBookingEnd = booking.allDay ? new Date(booking.startDate.setHours(23, 59, 59, 999)) : (booking.endDate ?? new Date(booking.startDate.setHours(23, 59, 59, 999)));

    if (booking.endDate != undefined && booking.startDate.getTime() === booking.endDate.getTime()) {
        return true;
    }

    if (booking.endDate != undefined && booking.endDate < booking.startDate) {
        return true;
    }

  // Iterate through existing bookings to check for overlap
  for (const existingBooking of bookingData) {
    const existingStart = new Date(existingBooking.date);
    const existingEnd = existingBooking.enddate ? new Date(existingBooking.enddate) : new Date(existingBooking.date).setHours(23, 59, 59, 999);

    // Check if the locations are the same
    if ((booking.location === existingBooking.location) || (existingBooking.userEmail === booking.userEmail)) {
        if (booking.allDay === true){
            return true;
        }

        if (existingBooking.allDay === true){
            return true;
        }

        if ((newBookingStart < existingEnd) && (newBookingEnd > existingStart)) {
          return true; // Overlap found
        }
    }
  }

  return false; // No overlap found
}