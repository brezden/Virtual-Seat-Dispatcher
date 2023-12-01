import SignInButton from "src/app/_components/buttons/sign-in";

export default async function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
        Virtual Seat Dispatcher
      </h1>
      <SignInButton />
    </div>
  );
}
