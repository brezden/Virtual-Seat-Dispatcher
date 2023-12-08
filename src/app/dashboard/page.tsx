import NavigationBar from "../_components/navigation/navigationBar";
import Calendar from "../_components/calendar/calendar";
import BookedMembers from "../_components/calendar/booked-members";

export default function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div>
      <NavigationBar />
      <div className="mx-auto px-6 py-6 sm:px-6 lg:px-12">
        <main>
          <div className="flex flex-col">
            <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-16">
              <div className="flex justify-center lg:col-span-full xl:col-start-1 xl:col-end-9">
                <BookedMembers searchParams={searchParams} />
              </div>
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
