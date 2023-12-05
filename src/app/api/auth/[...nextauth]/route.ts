import NextAuth, { NextAuthOptions } from "next-auth";
import { options } from "./options";

const handler = NextAuth(options) as NextAuthOptions;

// Named exports for each HTTP method (GET and POST)
export default handler;
export { handler as GET };
export { handler as POST };
