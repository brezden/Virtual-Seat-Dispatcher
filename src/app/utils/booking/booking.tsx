import type { BookingData } from "~/app/types/meeting";
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