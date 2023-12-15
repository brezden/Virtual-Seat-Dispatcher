"use client"

import DeskSelection from "./desk-selection";
import AllDayToggle from "../buttons/all-day-toggle";
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { createDateFromDateTime } from "../../utils/calendar/dates";
import type { Booking } from "../../types/meeting";
import TimeSelection from "./time-selection";

export default function AvailableMembers() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const bookSeat = api.meeting.createSeat.useMutation(
    {
      onSuccess: () => {
        router.refresh();
      }
    }
  )

  function addBooking() {
    let date = searchParams.get("date");
    const allDayStatus = searchParams.get("allDayStatus");
    const startTime = searchParams.get("startTime");
    const location = searchParams.get("deskid");

    if (!location) {
      console.error("Error: Please select a desk");
      return;
    }
  
    // If date is null, set it to the current date in EST
    if (!date) {
      const now = new Date();

      // Convert UTC to EST (UTC-5)
      const estTime = new Date(now.getTime() - (5 * 60 * 60 * 1000));
  
      // Set to midnight in EST
      estTime.setHours(0, 0, 0, 0);
  
      date = estTime.toISOString().split("T")[0]!;
    }

    // Prepare common booking data
    const bookingData: Booking = {
      userEmail: userEmail ?? "",
      startDate: new Date(`${date}T00:00:00Z`), // Treats date as UTC
      allDay: allDayStatus === "true",
      location: parseInt(location, 10), // Assuming `location` is a string
      guests: false
    };
  
    // Modify booking data based on allDayStatus
    if (bookingData.allDay === false) {
      const endTime = searchParams.get("endTime");
      bookingData.startDate = createDateFromDateTime(date, startTime!);
      bookingData.endDate = createDateFromDateTime(date, endTime!);
      delete bookingData.allDay; // Remove allDay field for non-all-day bookings
    }

    // Execute the mutate call with the prepared booking data
    bookSeat.mutate(bookingData);
  }
  

  return (
    <div className="flex flex-col gap-5 justify-center pt-4">
      <DeskSelection />
      <div className="grid grid-cols-3 lg:gap-x-3 justify-center">
        <TimeSelection />
        <AllDayToggle />
      </div>
      <div className="pt-3">
          <button
            type="button"
            className="w-full rounded-md bg-highlight px-3 py-3 text-lg font-semibold text-white shadow transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
            onClick={() => {
              addBooking()
            }}
            >
            Book Seat
          </button>
        </div>
    </div>
  );
}
