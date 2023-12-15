import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState} from "react";
import type { FC } from "react";

interface SuccessNotificationProps {
  message: string;
}

export const SuccessNotification: FC<SuccessNotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`rounded-md bg-green-600 p-4 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-300"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-200">
              Booking Completed
            </h3>
          </div>
        </div>
        <div className="ml-3">
          <div className="mt-2 text-sm text-green-200">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
