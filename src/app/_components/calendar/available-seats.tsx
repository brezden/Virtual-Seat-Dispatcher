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
  
    console.log(date, startTime, location);
  
    if (!location) {
      console.error("Error: Please select a desk");
      return;
    }
  
    // If date is null, set it to the current date in EST
    if (!date) {
      const currentDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      date = new Date(currentDate).toISOString().split('T')[0];
    }
  
    let startDateUTC;
    // Modify startDate based on allDayStatus
    if (allDayStatus === "true") {
      startDateUTC = new Date(`${date}T00:00:00Z`);
    } else {
      // Assuming startTime is in HHMM format
      const formattedTime = `${startTime.substring(0, 2)}:${startTime.substring(2, 4)}:00.000`;
      startDateUTC = new Date(`${date}T${formattedTime}Z`);
    }
  
    // Prepare common booking data
    const bookingData = {
      userEmail: userEmail ?? "",
      startDate: startDateUTC,
      allDay: allDayStatus === "true",
      location: parseInt(location, 10),
      guests: false
    };
  
    // Modify booking data based on allDayStatus
    if (allDayStatus === "false") {
      const endTime = searchParams.get("endTime");
      // Ensure endDate is also set in UTC
      const formattedEndTime = `${endTime.substring(0, 2)}:${endTime.substring(2, 4)}:00.000`;
      bookingData.endDate = new Date(`${date}T${formattedEndTime}Z`);
      delete bookingData.allDay; // Remove allDay field for non-all-day bookings
    }
  
    console.log(bookingData);
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
