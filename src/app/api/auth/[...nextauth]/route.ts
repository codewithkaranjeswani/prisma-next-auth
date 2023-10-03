import NextAuth, { Account, Session, User } from "next-auth";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "../../../../../prisma/generated/prisma-client-js";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

// declare module "next-auth" {
//   interface User extends
// }

const prisma = new PrismaClient();

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (!credentials || !credentials.password || !credentials.username) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: { username: credentials.username },
        });
        if (user && credentials.password === user.password) {
          return user;
        }
        return null;
      },
    }),
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
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    async jwt({ token, user, account, profile }) {
      token.role = "admin";
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
