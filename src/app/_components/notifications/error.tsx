import { XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState} from "react";
import type { FC } from "react";

interface ErrorNotificationProps {
  message: string;
  trigger: number
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({ message, trigger}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div
      className={`rounded-md bg-red-500 p-4 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-200" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-200">
            Problem with Booking
          </h3>
          <div className="mt-2 text-sm text-red-100">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
