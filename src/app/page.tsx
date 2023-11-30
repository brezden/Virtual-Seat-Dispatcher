import { getServerSession } from "next-auth/next"
import SignInButton  from 'src/app/_components/buttons/sign-in';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-primary">
          Virtual Seat Dispatcher
        </h1>
        {session ? (
          <div>
            <p>Hi {session?.user?.name}!</p>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </main>
  );
}

