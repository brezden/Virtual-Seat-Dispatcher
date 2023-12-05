import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function createUser(
  email: string,
  name: string,
  accessToken: string,
) {
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

  let pictureUrl = "";

  try {
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me/photo/$value",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");

      // Upload the blob to Vercel Blob Storage
      const uploadedBlob = await put(
        `${email}-profile-picture.png`,
        base64Image,
        {
          access: "public",
        },
      );

      // Use the URL from the uploaded blob
      pictureUrl = uploadedBlob.url;
    }
  } catch (error) {
    console.error("Error fetching profile picture:", error);
  }

  // Create a new user with the URL of the uploaded image
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      picture: pictureUrl,
    },
  });

  return { newUser, pictureUrl };
}
