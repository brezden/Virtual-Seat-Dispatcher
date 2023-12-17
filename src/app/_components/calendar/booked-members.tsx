import MapViewToggle  from "~/app/_components/buttons/map-view-toggle";
import type { BookingData } from "~/app/types/meeting";

interface BookedMembersProps {
  meetings: BookingData[];
}

export default async function BookedMembers({ meetings }: BookedMembersProps) {

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
