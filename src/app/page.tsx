import { getServerSession } from "next-auth/next";
import Image from "next/image";
import SignInButton from "src/app/_components/buttons/sign-in";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
          Virtual Seat Dispatcher
        </h1>
        {session ? (
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
        ) : (
          <SignInButton />
        )}
      </div>
    </main>
  );
}
