import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { createUser } from "@utils/queries/user";
// import other necessary modules

export const options: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      profilePhotoSize: 240,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (
        typeof user.email === "string" &&
        typeof user.name === "string" &&
        typeof user.image === "string"
      ) {
        await createUser(user.email, user.name, user.image);
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};
