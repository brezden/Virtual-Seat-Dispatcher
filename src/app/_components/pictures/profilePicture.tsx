import { getServerSession } from "next-auth/next";
import { getUserPicture } from "@utils/queries/user";
import Image from "next/image";

export default async function ProfilePicture() {
  const session = await getServerSession();
  const picture = await getUserPicture(session?.user?.email ?? "");

  return (
    <Image
      className="rounded-full"
      src={picture ?? ""}
      width={200}
      height={200}
      alt="Profile Picture"
    />
  );
}
