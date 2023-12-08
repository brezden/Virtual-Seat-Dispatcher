import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import {
  formatDate,
  formatDateString,
  getCurrentDateESTString,
} from "~/app/utils/calendar/dates";
import { fetchBookingsOnDate } from "~/app/utils/queries/memberList";

const currentDateEST = getCurrentDateESTString();

export default async function BookedMembers({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentDate = searchParams.date as string;
  const meetings = await fetchBookingsOnDate(currentDate);

  return (
    <div className="justify-center">
      <h2 className="text-white-900 text-center text-lg font-medium leading-6">
        Booked Members for{" "}
        {currentDate ? formatDateString(currentDate) : currentDateEST}
      </h2>

      {meetings.length > 0 ? (
        <ol className="divide-ytext-sm mt-4 leading-6 lg:col-span-7 xl:col-span-8">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <img
                src={meeting.imageUrl ?? ""}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              />
              <div className="flex-auto">
                <h3 className="text-white-600 pr-10 font-semibold xl:pr-0">
                  {meeting.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    {meeting.allDay ? (
                      <dd>All Day</dd>
                    ) : (
                      <dd>{meeting.enddate}</dd>
                    )}
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex h-full w-full items-center justify-center pt-2">
          <h3 className="text-xl font-medium text-gray-600">
            Grab Your Favorite Spot!
          </h3>
        </div>
      )}
    </div>
  );
}
