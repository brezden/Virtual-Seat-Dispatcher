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

  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1); // Move to the next day

  console.log(startDate, endDate, "sdfjsdjf")
  const bookings = await prisma.booking.findMany({
    where: {
      startDate: {
        gte: startDate,
        lt: endDate, // 'lt' for less than (before the start of the next day)
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
