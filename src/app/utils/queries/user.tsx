import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(email: string, name: string, picture: string) {
  // Check if a user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("Existing user:", existingUser);
  // If user exists, return the existing user
  if (existingUser) {
    return existingUser;
  }

  // If user does not exist, create a new user
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        picture,
      },
    });

    console.log("Created new user:", newUser);
    return newUser;
  } catch (e) {
    console.error("Error creating user:", e);
    throw e;
  }
}

export async function getUserPicture(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user?.picture;
}
