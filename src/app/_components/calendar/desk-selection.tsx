"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { useQueryState } from "next-usequerystate";

const seats = [{ id: "1" }, { id: "2" }];

export default function DeskSelection() {
  const [selected, setSelected] = useQueryState("deskid");

  return (
    <Listbox value={selected} onChange={(e) => setSelected(e.id)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-primary">
            Currently Selected
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-700 py-1.5 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-highlight_hover sm:text-sm sm:leading-6">
              <span className="block truncate">Desk {selected ?? "1"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
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
                    key={seat.id}
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
                          Desk {seat.id}
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
