"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface DeleteBookingProps {
  bookingId: number;
}

export default function DeleteBooking({ bookingId }: DeleteBookingProps) {
  const router = useRouter();

  const { mutate } = api.meeting.deleteBooking.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = () => {
    mutate({ bookingId });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button 
          onClick={handleDelete} 
          className="flex justify-center items-center p-2 hover:bg-red-500 rounded transition-colors duration-300"
        >
          <TrashIcon 
            className="h-5 w-5 text-white lg:h-6 lg:w-6" 
            aria-hidden="true" 
          />
        </button>
      </div>
    </>
  );
}
