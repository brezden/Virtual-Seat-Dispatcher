"use client";

import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-3 rounded-lg bg-highlight px-5 py-3 text-lg font-bold text-primary shadow-lg transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
        onClick={() => {
          void signIn("azure-ad", { callbackUrl: "/Book" });
        }}
      >
        <MicrosoftIcon className="h-6 w-6" aria-hidden="true" />
        Sign in with Microsoft
      </button>
    </>
  );
}
