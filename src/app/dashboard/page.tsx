import { getServerSession } from "next-auth/next";
import NavigationBar from "../_components/navigation/navigationBar";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerSession();
  return (
    <div>
      <NavigationBar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <p>Hi {session?.user?.name}!</p>
          <Image
            className="rounded-full"
            src={session?.user?.image ?? ""}
            width={200}
            height={200}
            alt="Profile Picture"
          />
        </div>
      </div>
    </div>
  );
}
