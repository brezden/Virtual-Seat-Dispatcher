"use client";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../../utils/classNames";
import Image from "next/image";
import { type BookingData } from "~/app/types/meeting";
import { Map } from "../map";
import { formatTimesToEST } from "~/app/utils/calendar/dates";
import MapView2D from "../map-view";
interface MapViewToggleProps {
  meetings: BookingData[];
}
export default function MapViewToggle({ meetings }: MapViewToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [is3DView, setIs3DView] = useState(false);
  const isSingleRow = meetings.length == 1;
  const toggle3DView = () => {
    setIs3DView(!is3DView);
  };
  return (
    <div>
      <Switch.Group as="div" className="flex items-center justify-center">
        <Switch.Label as="span" className="justify-content ml-3 pr-3 text-sm">
          <span className="text-font-bold font-medium text-white">
            Map View
          </span>
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? "bg-highlight" : "bg-gray-900",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2",
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            )}
          />
        </Switch>
      </Switch.Group>
      <div className="mt-4 text-center">
        {enabled ? (
          <div className="h-[70vh] relative">
          {is3DView ? (
            <>
            <Map />
            <button
              onClick={toggle3DView}
              className="absolute top-0 right-12 m-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
            >
              2D
            </button>
            <button
              disabled
              className="absolute top-0 right-0 m-2 p-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed"
            >
              3D
            </button>
          </>
          ) : (
          <>
            <MapView2D meetings={meetings}/>
            <button
              disabled
              className="absolute top-0 right-12 m-2 p-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed"
            >
              2D
            </button>
            <button
              onClick={toggle3DView}
              className="absolute top-0 right-0 m-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
            >
              3D
            </button>
          </>
          )}
        </div>
        ) : (
          <div>
            {meetings.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center pt-2">
                <ol
                  className={`mt-4 ${
                    isSingleRow
                      ? "flex justify-center"
                      : "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2"
                  }`}
                >
                  {meetings.map((meeting) => (
                    <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                      <div className="w-28 h-28 flex justify-center items-center"> {/* w-24 and h-24 are Tailwind classes for width and height */}
                        <Image
                          src={meeting.imageUrl ?? ""}
                          alt="User Profile Picture"
                          className="rounded-full object-cover object-center"
                          width={112}  // Corresponds to the Tailwind size (24 * 4 = 96)
                          height={112} // Corresponds to the Tailwind size
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
                              <CalendarIcon
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
        )}
      </div>
    </div>
  );
}
