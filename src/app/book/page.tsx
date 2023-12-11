import NavigationBar from "../_components/navigation/navigationBar";
import Calendar from "../_components/calendar/calendar";
import BookedMembers from "../_components/calendar/booked-members";
import AvailableMembers from "../_components/calendar/available-seats";

export default function Book({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div>
      <NavigationBar />
      <div className="mx-auto px-6 py-6 sm:px-6 lg:px-12">
        <main>
          <div className="flex h-full flex-col justify-center px-12">
            <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-4 xl:col-start-1 xl:col-end-4">
                <BookedMembers searchParams={searchParams} />
              </div>
              <div className="lg:col-span-4 xl:col-start-5 xl:col-end-9">
                <AvailableMembers searchParams={searchParams} />
              </div>
              <div className="lg:col-span-4 xl:col-start-9 xl:col-end-13">
                <Calendar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
