import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["test", "development", "production"]),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
  },
  // client: {
  //   NEXT_PUBLIC_API_URL: z.string().min(1),
  // },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NODE_ENV: process.env.NODE_ENV,
  //   GITHUB_ID: process.env.GITHUB_ID,
  //   GITHUB_SECRET: process.env.GITHUB_SECRET,
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  //   DATABASE_URL: z.string().min(1),
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // },
});
