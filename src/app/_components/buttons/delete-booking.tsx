"use client";

import { TrashIcon } from "@heroicons/react/20/solid";

interface DeleteBookingProps {
  bookingId: number;
}

export default function DeleteBooking({ bookingId }: DeleteBookingProps) {
  const handleDelete = () => {
    // Implement the delete logic here
    console.log(`Deleting booking with ID: ${bookingId}`);
    // For example, you could call an API to delete the booking
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button 
          onClick={handleDelete} 
          className="flex justify-center items-center p-2 hover:bg-red-500 rounded transition-colors duration-300" // Adjusted padding and added transition
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
