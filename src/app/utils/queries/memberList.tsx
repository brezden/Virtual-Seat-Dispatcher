import { PrismaClient } from "@prisma/client";
import type { BookingData } from "../../types/meeting";
import { getCurrentDateESTStringDash } from "../calendar/dates";

const prisma = new PrismaClient();

export async function fetchBookingsOnDate(
  date: string,
): Promise<BookingData[]> {
  if (date === undefined) {
    date = getCurrentDateESTStringDash();
  }

  // Convert date to EST and find start of the day in EST, then convert to UTC
  const startDateEST = new Date(`${date}T00:00:00-05:00`); // Assuming EST is UTC-5
  const endDateEST = new Date(startDateEST);
  endDateEST.setDate(startDateEST.getDate() + 1); // Move to the next day
  console.log(startDateEST, endDateEST)

  const bookings = await prisma.booking.findMany({
    where: {
      startDate: {
        gte: startDateEST,
        lt: endDateEST, // 'lt' for less than (before the start of the next day)
      },
    },
    include: {
      user: true,
    },
  });

  return bookings.map((booking): BookingData => {
    return {
      id: booking.id,
      name: booking.user.name ?? "User",
      imageUrl: booking.user.picture,
      date: booking.startDate.toISOString(),
      enddate: booking.endDate ? booking.endDate.toISOString() : null,
      allDay: booking.allDay ?? null,
      location: `Desk ${booking.location}`,
    };
  });
}
