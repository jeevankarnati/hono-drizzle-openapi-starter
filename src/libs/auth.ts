import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import db from "@/db";
import env from "@/env";
import { allowedOrigins } from "@/libs/allowed-origins";
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationsTable,
} from "@/routers/users/users.model";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    transaction: true,
    usePlural: true,
    schema: {
      users: usersTable,
      sessions: sessionsTable,
      accounts: accountsTable,
      verifications: verificationsTable,
    },
  }),
  trustedOrigins: allowedOrigins,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  advanced: { database: { generateId: "uuid" } },
  plugins: [openAPI({ disableDefaultReference: true })],
});
