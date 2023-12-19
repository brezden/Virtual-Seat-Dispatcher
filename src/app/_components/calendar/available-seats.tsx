"use client";

import DeskSelection from "./desk-selection";
import AllDayToggle from "../buttons/all-day-toggle";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { createDateFromDateTime, formatBookingDetails } from "../../utils/calendar/dates";
import { deskAvailable, availableTimeSlots } from "../../utils/booking/booking";
import type { Booking, BookingData } from "../../types/meeting";
import TimeSelection from "./time-selection";
import { useEffect, useState } from "react";
import {SuccessNotification} from "../notifications/success";
import { ErrorNotification } from "../notifications/error";

interface BookedMembersProps {
  meetings: BookingData[];
}

export default function AvailableMembers({ meetings }: BookedMembersProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const bookSeat = api.meeting.createSeat.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const currentDesk = searchParams.get("deskid") ?? "";
  const deskBookedList = deskAvailable(meetings);
  const availableTimes = availableTimeSlots(meetings.filter(m => m.location === parseInt(currentDesk, 10)));

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccessNotification) {
      timer = setTimeout(() => {
        setShowSuccessNotification(false);
      }, 9000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessNotification]);

  function handleBookingError(errorMsg: string) {
    setIsBooking(false);
    setErrorMessage(errorMsg); // Set the error message
    setShowErrorNotification(true); // Show the error notification
    setErrorTrigger(prev => prev + 1);
  }

  function addBooking() {
    setIsBooking(true);
    let date = searchParams.get("date");
    const allDayStatus = searchParams.get("allDayStatus");
    const startTime = searchParams.get("startTime");
    const location = searchParams.get("deskid");

    if (!location) {
      handleBookingError("Please select a desk to proceed with the booking.");
      return;
    }

    // If date is null, set it to the current date in EST
    if (!date) {
      const now = new Date();

      // Convert UTC to EST (UTC-5)
      const estTime = new Date(now.getTime() - 5 * 60 * 60 * 1000);

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
      guests: false,
    };

    // Modify booking data based on allDayStatus
    if (bookingData.allDay === false) {
      const endTime = searchParams.get("endTime");
      bookingData.startDate = createDateFromDateTime(date, startTime!);
      bookingData.endDate = createDateFromDateTime(date, endTime!);
      delete bookingData.allDay; // Remove allDay field for non-all-day bookings
    }

    setSuccessMessage(formatBookingDetails(bookingData))

    // Execute the mutate call with the prepared booking data
    bookSeat.mutate(bookingData, {
      onSuccess: () => {
        setShowSuccessNotification(true);
        setIsBooking(false);
      },
      onError: () => {
        handleBookingError("An error occurred while booking the seat.");
        setIsBooking(false);
      },
    });
  }

  return (
    <div className="flex flex-col justify-center gap-5 pt-4">
      <DeskSelection fullDesks={deskBookedList}/>
      <div className="grid grid-cols-3 justify-center lg:gap-x-3">
        <TimeSelection timeSlots={availableTimes} />
        <AllDayToggle />
      </div>
      <div className="pt-3">
        <button
          type="button"
          className={`w-full rounded-md px-3 py-3 text-lg font-semibold shadow transition duration-300 ease-in-out
    ${
      isBooking
        ? "cursor-not-allowed bg-gray-400 text-gray-700" // Styles for disabled state
        : "bg-highlight text-white hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
    }`}
          onClick={() => {
            if (!isBooking) {
              addBooking();
            }
          }}
          disabled={isBooking}
        >
          Book Seat
        </button>
        <div className="pt-3">
          {showSuccessNotification && <SuccessNotification message={successMessage}/>}
        </div>
        <div className="pt-3">
          {showErrorNotification && <ErrorNotification message={errorMessage} trigger={errorTrigger} />}
        </div>
      </div>
    </div>
  );
}
