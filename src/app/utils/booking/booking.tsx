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

export function availableTimeSlots(bookings: BookingData[]): number[] {
    const deskId = 3;
    const deskMeetings = bookings.filter(m => m.location === deskId);
    const timeSlots: number[] = [];

    console.log(deskMeetings)
    const startTime = 7 * 60; // 7 AM in minutes
    const endTime = 18 * 60; // 6 PM in minutes

    for (let time = startTime; time < endTime; time += 15) {
        let isAvailable = true;

        for (const m of deskMeetings) {
            const meetingStart = new Date(m.date).getHours() * 60 + new Date(m.date).getMinutes();
            const meetingEnd = m.enddate ? new Date(m.enddate).getHours() * 60 + new Date(m.enddate).getMinutes() : meetingStart + 60; // Assuming 1 hour duration if end date is not specified

            console.log(meetingStart, meetingEnd)

            if (time >= meetingStart && time < meetingEnd) {
                isAvailable = false;
                break;
            }
        }

        if (isAvailable) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            timeSlots.push(parseInt(`${hours < 10 ? '0' : ''}${hours}${minutes < 10 ? '0' : ''}${minutes}`));
        }
    }

    // NEW APPROACH WOULD BE TO TAKE THE START AND END DATE AND GET AN ARRAY WITH NUMBER FORMAT FOR
    // THAT TIME RANGE

    // EXAMPLE 1: 7:00 AM - 8:00 AM

    // [700, 715, 730, 745, 800]

    // THEN WE CAN FILTER OUT THE TIMES THAT ARE ALREADY BOOKED AND RETURN THE AVAILABLE TIMES

    // WE NEED AN OBJECT THAT HAS THE DESK ID SO WE CAN MATCH THE TIMES TO THE DESK

    return timeSlots;
}