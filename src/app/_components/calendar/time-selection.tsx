"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addMinutes } from "date-fns";
import { convertUtcToEst, isEarlier } from "../../utils/calendar/dates";

export default function TimeSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [isDisabled, setIsDisabled] = useState(
    searchParams.get("allDayStatus") === "true",
  );

  
  // Generate Start Time Slots
  const generateStartSlots = () => {
      const startEST = new Date();
      startEST.setUTCHours(12, 0, 0, 0);
      const endEST = new Date();
      endEST.setUTCHours(23, 0, 0, 0);
      
      let currentTime = startEST;
      const timeSlots = [];
      while (currentTime <= endEST) {
          timeSlots.push(currentTime.toISOString().substring(11, 16));
          currentTime = addMinutes(currentTime, 15);
        }
        return timeSlots;
    };
    
    // Generate End Time Slots
    const generateEndSlots = (startTime: string) => {
        const timeParts = startTime.split(":").map(Number);
        const hours = timeParts[0];
        const minutes = timeParts[1];
        
        const startEST = new Date();
        startEST.setUTCHours(hours!, minutes, 0, 0);
        startEST.setMinutes(startEST.getMinutes() + 15);
        
        const endEST = new Date();
        endEST.setUTCHours(23, 0, 0, 0);
        
        let currentTime = startEST;
        const timeSlots = [];
        while (currentTime <= endEST) {
            timeSlots.push(currentTime.toISOString().substring(11, 16));
            currentTime = addMinutes(currentTime, 15);
        }
        return timeSlots;
    };
    
    const [startSeats, setStartSeats] = useState(generateStartSlots());
    const [endSeats, setEndSeats] = useState(generateEndSlots(startSeats[0]!));
    const [startTime, setStartTime] = useState(startSeats[0] ?? "12:00");
    const [endTime, setEndTime] = useState(endSeats[0] ?? "12:15");
    
    const handleStartTimeChange = (newTime: string) => {
        setStartTime(newTime);
        setEndSeats(generateEndSlots(newTime));
    };
    
    const handleEndTimeChange = (newTime: string) => {
        setEndTime(newTime);
    };
    
    const updateURLParams = () => {
        const params = new URLSearchParams(searchParams);
        params.set("startTime", startTime);
        params.set("endTime", endTime);
        router.push(`${pathname}?${params.toString()}`);
    };
    
    // Update URL Params on Mount
    useEffect(() => {
        updateURLParams();
    }, [startTime, endTime]);
    
    // Checking for All Day Status Change
    useEffect(() => {
      setIsDisabled(searchParams.get("allDayStatus") === "true");
    }, [searchParams]);

    // 
    useEffect(() => {
        if (!isEarlier(startTime, endTime)) setEndTime(endSeats[0]!);
    }, [endSeats]);    

    return (
        <>
      {/* StartTime Selection */}
      <Listbox
        disabled={isDisabled}
        value={startTime}
        onChange={handleStartTimeChange}
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
                  {convertUtcToEst(startTime)}
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
                  {startSeats.map((seat) => (
                    <Listbox.Option
                      key={seat}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-highlight_hover text-white"
                            : "text-white",
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

      {/* EndTime Selection */}
      <Listbox
        disabled={isDisabled}
        value={endTime}
        onChange={handleEndTimeChange}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Label className="block text-center text-sm font-medium leading-6 text-primary">
                End Time
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
                  {convertUtcToEst(endTime)}
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
                  {endSeats.map((seat) => (
                    <Listbox.Option
                      key={seat}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-highlight_hover text-white"
                            : "text-white",
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
    </>
    );
}