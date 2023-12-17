import type { BookingData } from "~/app/types/meeting";

export function deskAvailable(bookings: BookingData[]): number[] {
    const fullDesksSet = new Set<number>();

    bookings.forEach((booking) => {
        if (booking.allDay === true) {
            fullDesksSet.add(booking.location);
        }
    });

    return Array.from(fullDesksSet);
}