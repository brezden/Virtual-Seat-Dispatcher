import NavigationBar from "../_components/navigation/navigationBar";
import Calendar from "../_components/calendar/calendar";
import BookedMembers from "../_components/calendar/booked-members";

export default async function Dashboard() {
  return (
    <div>
      <NavigationBar />
      <div className="mx-auto px-6 py-6 sm:px-6 lg:px-12">
        <main>
          <div className="flex flex-col">
            {/* <BookedMembers /> */}
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}
