"use client";

import { Switch } from "@headlessui/react";
import { classNames } from "../../utils/classNames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function AllDayToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [selected, setSelected] = useState("false");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      setSelected(value);
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const disabledValue = selected === "true";

  return (
    <Switch.Group as="div" className="flex items-center justify-center">
      <Switch.Label as="span" className="justify-content ml-3 pr-3 text-sm">
        <span className="text-font-bold font-medium text-white">All Day</span>
      </Switch.Label>
      <Switch
        checked={disabledValue}
        onChange={(newTime) => {
          router.push(
            pathname + "?" + createQueryString("allDayStatus", String(newTime)), { scroll: false }
          );
        }} // Convert boolean to string
        className={classNames(
          disabledValue ? "bg-highlight" : "bg-gray-900",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            disabledValue ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
