import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function createUser(email: string, name: string, picture: Buffer) {
  // Check if a user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("Existing user:", existingUser);
  // If user exists, return the existing user
  if (existingUser !== null) {
    return existingUser;
  }

  // Convert the base64 string to a Blob
  // const pictureBlob = convertBase64ToBlob(picture); // Make sure this function returns a Blob
  // console.log("Picture blob:", pictureBlob);

  // Upload the blob to Vercel Blob Storage
  const uploadedBlob = await put(`${email}-profile-picture.png`, picture, {
    access: "public",
  });

  // // Use the URL from the uploaded blob
  const pictureUrl = uploadedBlob.url;

  console.log("Uploaded blob:", uploadedBlob.url);

  // Create a new user with the URL of the uploaded image
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      picture: pictureUrl,
    },
  });

  return newUser;
}

export async function getUserPicture(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user?.picture;
}
