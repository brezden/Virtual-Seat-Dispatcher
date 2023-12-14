import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { fetchBookingsOnDate } from "~/app/utils/queries/memberList";
import MapViewToggle  from "~/app/_components/buttons/map-view-toggle";
import Image from "next/image";

export default async function BookedMembers({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentDate = searchParams.date as string;
  const meetings = await fetchBookingsOnDate(currentDate);
  const isSingleRow = meetings.length == 1; // Check if the last row has a single item

  return (
    <div className="justify-center">
      <h2 className="text-white-900 text-center text-xl font-medium leading-6">
        Booked Members
      </h2>
      <div className="items-center pt-3">
        <MapViewToggle meetings={meetings} />
      </div>
    </div>
  );
}
