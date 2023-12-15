import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { fetchBookingsOnDate } from "~/app/utils/queries/memberList";
import MapViewToggle  from "~/app/_components/buttons/map-view-toggle";
import Image from "next/image";
import { formatTimesToEST } from "~/app/utils/calendar/dates";

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
        <MapViewToggle />
      </div>

      {meetings.length > 0 ? (
        <div className="flex h-full w-full items-center justify-center pt-2">
          <ol className={`mt-4 ${isSingleRow ? 'flex justify-center' : 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2'}`}>
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className="relative flex space-x-6 py-6 xl:static"
              >
                <Image
                  src={meeting.imageUrl ?? ""}
                  alt="User Profile Picture"
                  className="rounded-full object-cover object-center"
                  width={100}
                  height={100}
                />
                <div className="flex-auto">
                  <h2 className="text-white-600 pr-10 text-xl font-semibold">
                    {meeting.name}
                  </h2>
                  <dl className="mt-2 flex flex-col text-gray-500">
                    <div className="flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon
                          className="h-5 w-5 lg:h-6 lg:w-6  text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      {meeting.allDay ? (
                        <dd className="text-sm lg:text-lg">All Day</dd>
                      ) : (
                        <dd className="text-sm lg:text-lg">{formatTimesToEST(meeting.date, meeting.enddate!)}</dd>
                      )}
                    </div>
                    <div className="mt-2 flex items-start space-x-3 ">
                      <dt className="mt-0.5">
                        <span className="sr-only">Location</span>
                        <MapPinIcon
                          className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd className="text-sm lg:text-lg">{meeting.location}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center pt-6">
          <h3 className="text-xl font-medium text-slate-400">
            No members booked for today.
          </h3>
        </div>
      )}
    </div>
  );
}
