"use client";

import { Fragment, useCallback, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const seats = ["0930", "0945"];

export default function StartTimeSelection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [selected, setSelected] = useState("0930");
  const disabledValue = searchParams.get("allDay");
  const isDisabled = disabledValue === "true";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log(value);
      setSelected(value)
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  

  return (
    <Listbox disabled={isDisabled} value={selected} onChange={(newTime) => {router.push(pathname + '?' + createQueryString('startTime', newTime))}}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Label className="block text-sm font-medium leading-6 text-primary text-center">
              Start Time
            </Listbox.Label>
            <Listbox.Button className={classNames(
              "relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6",
              disabledValue ? "bg-gray-400 text-gray-500 cursor-not-allowed" : "bg-gray-700 text-primary ring-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight_hover"
            )}>
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={classNames(
                    "h-5 w-5",
                    disabledValue ? "text-gray-500" : "text-gray-400"
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
                          {seat}
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
