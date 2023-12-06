import NavigationBar from "../_components/navigation/navigationBar";
import Calendar from "../_components/dashboard/calendar";

export default async function Dashboard() {
  return (
    <div>
      <NavigationBar />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}
