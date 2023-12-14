"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { utcToZonedTime } from "date-fns-tz";
import { addMinutes, format } from "date-fns";
import { convertUtcToEst } from "../../utils/calendar/dates";

export default function StartTimeSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [isDisabled, setIsDisabled] = useState(
    searchParams.get("allDayStatus") === "true",
  );

  useEffect(() => {
    setIsDisabled(searchParams.get("allDayStatus") === "true");
  }, [searchParams]);

  const generateTimeSlots = () => {
    const startEST = new Date();
    startEST.setUTCHours(12, 0, 0, 0); // 7am EST is 12pm UTC
    const endEST = new Date();
    endEST.setUTCHours(23, 0, 0, 0); // 6pm EST is 11pm UTC

    let currentTime = startEST;
    const timeSlots = [];
    while (currentTime <= endEST) {
      timeSlots.push(currentTime.toISOString().substring(11, 16)); // Store only the time part
      currentTime = addMinutes(currentTime, 15); // Increment by 15 minutes
    }
    return timeSlots;
  };

  // Initial seats are now generated from the function
  const [seats, setSeats] = useState(generateTimeSlots());
  const [selected, setSelected] = useState(seats[0] ?? "12:00");

  const createQueryString = (name: string, value: string) => {
    setSelected(value);
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleTimeChange = (newTime: string) => {
    router.push(pathname + "?" + createQueryString("startTime", newTime));
  };

  useEffect(() => {
    handleTimeChange(selected);
  }, []);

  return (
    <Listbox
      disabled={isDisabled}
      value={selected}
      onChange={handleTimeChange}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Label className="block text-center text-sm font-medium leading-6 text-primary">
              Start Time
            </Listbox.Label>
            <Listbox.Button
              className={classNames(
                "relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6",
                isDisabled
                  ? "cursor-not-allowed bg-gray-400 text-gray-500"
                  : "bg-gray-700 text-primary ring-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight_hover",
              )}
            >
              <span className="block truncate">
                {convertUtcToEst(selected)}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={classNames(
                    "h-5 w-5",
                    isDisabled ? "text-gray-500" : "text-gray-400",
                  )}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-gray-500 ring-opacity-5 focus:outline-none sm:text-sm">
                {seats.map((seat) => (
                  <Listbox.Option
                    key={seat}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-highlight_hover text-white"
                          : " text-white",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={seat}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {convertUtcToEst(seat)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-highlight_hover",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
