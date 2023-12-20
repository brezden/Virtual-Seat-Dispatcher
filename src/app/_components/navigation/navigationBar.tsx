import BookProfile from "./navigationProfile";
import { classNames } from "../../utils/classNames";
import SignOutButton from "../buttons/sign-out";

interface NavigationBarProps {
  currentPath: string;
}

export default function NavigationBar({ currentPath }: NavigationBarProps) {
  const navigation = [
    { name: "Book", href: "/book", current: currentPath === "/book" },
    { name: "Manage Bookings", href: "/manageBooking", current: currentPath === "/manageBooking" },
  ];

  return (
    <>
      <div className="mx-auto px-6 pt-3 sm:px-6 lg:px-12">
        <div className="relative flex items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium lg:px-4 lg:py-3 lg:text-lg lg:font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <BookProfile />
            <SignOutButton />
          </div>
        </div>
      </div>
    </>
  );
}
