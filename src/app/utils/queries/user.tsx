import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { convertBase64ToBlob } from "../convertImage";

const prisma = new PrismaClient();

export async function createUser(email: string, name: string, picture: string) {
  // Check if a user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // If user exists, return the existing user
  if (existingUser !== null) {
    return existingUser;
  }

  const pictureBlob = await convertBase64ToBlob(picture);

  // Upload the blob to Vercel Blob Storage
  const uploadedBlob = await put(`${email}-profile-picture.png`, pictureBlob, {
    access: "public",
  });

  // // Use the URL from the uploaded blob
  const pictureUrl = uploadedBlob.url;

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
