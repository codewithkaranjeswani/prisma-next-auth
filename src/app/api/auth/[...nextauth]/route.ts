import NextAuth, { Account, Session, User } from "next-auth";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "../../../../../prisma/generated/prisma-client-js";

const prisma = new PrismaClient();

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
} satisfies NextAuthConfig;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
