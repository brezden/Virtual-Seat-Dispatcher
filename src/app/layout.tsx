import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "~/app/_components/SessionProvider";
import { getServerSession } from "next-auth/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Virtual Seat Dispatcher",
  description: "Choose your seats with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="flex min-h-screen flex-col bg-gradient-to-b from-background to-[#15162c] text-white">
          <TRPCReactProvider cookies={cookies().toString()}>
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </TRPCReactProvider>
        </main>
      </body>
    </html>
  );
}
