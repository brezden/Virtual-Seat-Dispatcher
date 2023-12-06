import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { createUser } from "@utils/queries/user";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (
        typeof user.email === "string" &&
        typeof user.name === "string" &&
        typeof account?.access_token === "string"
      ) {
        await createUser(user.email, user.name, account.access_token);
      }
      return true;
    },
  },
};
