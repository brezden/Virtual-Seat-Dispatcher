import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function DashboardProfile() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name ?? "Default Name";
  const email = session?.user?.email ?? "";
  return (
    <div className="flex flex-row pt-0.5">
      <div className="mr-2 flex flex-col pr-1.5 text-right">
        <p className="hidden text-lg sm:block"> {name} </p>
        <p className="hidden text-sm opacity-40 sm:block">{email}</p>
      </div>

      {session?.user?.image ? (
        <span className="inline-block h-12 w-12 overflow-hidden rounded-full border border-transparent sm:h-10 sm:w-10">
          <Image src={session.user.image} alt={name} width={200} height={200} />
        </span>
      ) : (
        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 sm:h-10 sm:w-10">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </div>
  );
}
