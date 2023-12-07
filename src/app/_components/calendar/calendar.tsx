import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DayBoxes from "./day-boxes";
import BookedMembers from "./booked-members";

export default function Calendar() {
  return (
    <div>
      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-full xl:col-start-1 xl:col-end-9">
          <BookedMembers />
        </div>
        <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold text-white">
              December 2023
            </div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-200">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <DayBoxes />
        </div>
      </div>
    </div>
  );
}
