"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignOutButton() {
  return (
    <>
      <div className="flex justify-center items-center pl-4">
        <button
          type="button"
          className="inline-flex p-4 items-center rounded-lg bg-gray-800/20 transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
          onClick={() => {
            void signOut({ callbackUrl: 'https://virtual-seat-dispatcher.vercel.app' });
          }}
        >
          <LogoutIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
