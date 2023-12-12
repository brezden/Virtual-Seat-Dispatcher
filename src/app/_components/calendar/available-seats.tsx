import DeskSelection from "./desk-selection";

export default async function AvailableMembers({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentDate = searchParams.date as string;

  return (
    <div className="justify-center">
      <div className="px-12">
        <DeskSelection />
      </div>
      <button
          type="button"
          className="mt-8 w-full rounded-md bg-highlight px-3 py-3 text-lg font-semibold text-white shadow transition duration-300 ease-in-out hover:bg-highlight_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight_hover"
        >
          Book Seat
        </button>
    </div>
  );
}
