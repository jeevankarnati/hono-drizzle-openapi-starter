import env from "@/env";

/** Browser origins allowed for CORS and Better Auth trustedOrigins (dev + API base). */
export const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  env.BETTER_AUTH_URL,
];
