import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      try {
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
      } catch (e) {
        console.error(e);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // You can specify any custom redirect here.
      // After signing in, redirect users to the '/SELECTION' page
      if (url === baseUrl) {
        return `${baseUrl}/SELECTION`;
      }
      return url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
});

export { handler as GET, handler as POST };
