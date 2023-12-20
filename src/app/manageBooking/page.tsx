import NavigationBar from "../_components/navigation/navigationBar";
import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/options";
import { fetchBookingsForUser } from "../utils/queries/memberList";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/20/solid";
import { formatDateToString, formatTimesToEST } from "../utils/calendar/dates";
import DeleteBooking from "../_components/buttons/delete-booking";

export default async function ManageBook() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const meetings = await fetchBookingsForUser(email);

  return (
    <div>
      <NavigationBar currentPath="/manageBooking"/>
      <div className="mx-auto px-6 py-6 sm:px-6 lg:px-12">
        <main>
          <div className="flex h-full flex-col justify-center px-12">
          <div>
            <h2 className="text-white-900 text-center text-xl font-medium leading-6">
                Upcoming Bookings
            </h2>
            {meetings.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center pt-2">
                <ol
                  className={`mt-4 grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-1"
                  }`}
                >
                {meetings.map((meeting) => (
                <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                    <div className="w-32 h-32 flex justify-center items-center">
                    <Image
                        src={meeting.imageUrl ?? ""}
                        alt="User Profile Picture"
                        className="rounded-full object-cover object-center"
                        width={128}
                        height={128}
                    />
                    </div>
                      <div className="flex-auto">
                        <h2 className="text-white-600 pr-10 text-xl font-semibold">
                          {meeting.name}
                        </h2>
                        <dl className="mt-2 flex flex-col text-gray-500">
                          <div className="flex items-start space-x-3">
                            <dt className="mt-0.5">
                              <span className="sr-only">Date</span>
                              <ClockIcon
                                className="h-5 w-5 text-gray-400 lg:h-6  lg:w-6"
                                aria-hidden="true"
                              />
                            </dt>
                            {meeting.allDay ? (
                              <dd className="text-sm lg:text-lg">All Day</dd>
                            ) : (
                              <dd className="text-sm lg:text-lg">
                                {formatTimesToEST(
                                  meeting.date,
                                  meeting.enddate!,
                                )}
                              </dd>
                            )}
                          </div>
                          <div className="mt-2 flex items-start space-x-3 ">
                            <dt className="mt-0.5">
                              <CalendarIcon
                                className="h-5 w-5 text-gray-400 lg:h-6  lg:w-6"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="text-sm lg:text-lg">{formatDateToString(meeting.date)}</dd>
                          </div>
                          <div className="mt-2 flex items-start space-x-3 ">
                            <dt className="mt-0.5">
                              <span className="sr-only">Location</span>
                              <MapPinIcon
                                className="h-5 w-5 text-gray-400 lg:h-6 lg:w-6"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="text-sm lg:text-lg">
                              Desk {meeting.location}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <DeleteBooking bookingId={meeting.id} />                
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center pt-6">
                <h3 className="text-xl font-medium text-slate-400">
                  No Upcoming Bookings.
                </h3>
              </div>
            )}
          </div>
          <div className="pt-6">
            <h2 className="text-white-900 text-center text-xl font-medium leading-6">
                Past Bookings
            </h2>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
