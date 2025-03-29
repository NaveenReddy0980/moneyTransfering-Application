import GoogleProvider from "next-auth/providers/google";
import { db } from "@repo/db/client";
import type { AuthOptions, User, Account } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      console.log("hi signin");

      if (!user?.email || !account) {
        return false; // Prevent sign-in if email or account is missing
      }

      try {
        await db.merchant.upsert({
          where: { email: user.email },
          create: {
            email: user.email,
            name: user.name ?? "Unknown", // Handle possible undefined names
            auth_type: account.provider === "google" ? "Google" : "Github",
          },
          update: {
            name: user.name ?? "Unknown",
            auth_type: account.provider === "google" ? "Google" : "Github",
          },
        });

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};
