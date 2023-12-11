import DeskSelection from "./desk-selection";

export default async function AvailableMembers({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentDate = searchParams.date as string;

  return (
    <div className="justify-center">
      <h2 className="text-white-900 text-center text-lg font-medium leading-6">
        Available Desks
      </h2>
      <DeskSelection />
    </div>
  );
}
