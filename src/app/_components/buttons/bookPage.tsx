"use client";

import { useRouter } from "next/navigation";

export default function BookButton() {
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-3 rounded-lg bg-highlight px-5 py-3 text-lg font-bold text-primary shadow-lg transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
        onClick={() => router.push("/book")}
      >
        Book a Seat!
      </button>
    </>
  );
}
