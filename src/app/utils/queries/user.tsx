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

      // Convert the ArrayBuffer to a Base64 string
      const base64Image = Buffer.from(imageBuffer).toString("base64");

      // Convert Base64 string to a Blob
      const blob = base64ToBlob(base64Image, "image/jpeg");

      // Upload the blob to Vercel Blob Storage
      const uploadedBlob = await put(
        `${email}-profile-picture.jpeg`, // Ensure the file extension is .jpeg
        blob,
        {
          access: "public",
          contentType: "image/jpeg", // Set the correct MIME type
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

  return newUser;
}

function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}
