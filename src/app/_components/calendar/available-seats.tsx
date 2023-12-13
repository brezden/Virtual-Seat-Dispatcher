"use client"

import DeskSelection from "./desk-selection";
import AllDayToggle from "../buttons/all-day-toggle";
import StartTimeSelection from "./start-time-selection";
import EndTimeSelection from "./end-time-selection";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";



export default function AvailableMembers() {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email;
  const bookSeat = api.meeting.createSeat.useMutation();
  return (
    <div className="flex flex-col gap-5 justify-center pt-4">
      <DeskSelection />
      <div className="grid grid-cols-3 lg:gap-x-3 justify-center">
        <StartTimeSelection/>
        <EndTimeSelection />
        <AllDayToggle />
      </div>
      <div className="pt-3">
          <button
            type="button"
            className="w-full rounded-md bg-highlight px-3 py-3 text-lg font-semibold text-white shadow transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
            onClick={() => {
              bookSeat.mutate({
                userEmail: userEmail ?? "",
                startDate: new Date("2021-10-10T10:00:00.000Z") ,
                endDate: new Date("2021-10-10T11:00:00.000Z"),
                location: 1,
                guests: false
              })
            }}
            >
            Book Seat
          </button>
        </div>
    </div>
  );
}
