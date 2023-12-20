import NavigationBar from "../_components/navigation/navigationBar";
import Calendar from "../_components/calendar/calendar";
import BookedMembers from "../_components/calendar/booked-members";
import AvailableMembers from "../_components/calendar/available-seats";
import { fetchBookingsOnDate } from "../utils/queries/memberList";

export default async function Book({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currentDate = searchParams.date as string;
  const meetingList = await fetchBookingsOnDate(currentDate);

  return (
    <div>
      <NavigationBar currentPath="/book"/>
      <div className="mx-auto px-6 py-6 sm:px-6 lg:px-12">
        <main>
          <div className="flex h-full flex-col justify-center px-12">
            <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-x-16">
              <div className="lg:col-span-4 xl:col-start-1 xl:col-end-2">
                <BookedMembers meetings={meetingList} />
              </div>
              <div className="lg:col-span-4 xl:col-start-2 xl:col-end-3 xl:px-12 1xl:px-24 2xl:px-48 ">
                <Calendar />
                <AvailableMembers meetings={meetingList}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
