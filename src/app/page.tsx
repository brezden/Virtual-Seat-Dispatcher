import SignInButton from "src/app/_components/buttons/sign-in";
import DashboardButton from "src/app/_components/buttons/dashboard";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
          Virtual Seat Dispatcher
        </h1>
        {session ? <DashboardButton /> : <SignInButton />}
      </div>
    </div>
  );
}
