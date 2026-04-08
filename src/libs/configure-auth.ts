import { cors } from "hono/cors";
import { requireSession } from "@/middleware/require-session";
import type { AppOpenAPI } from "./types";
import { allowedOrigins } from "./allowed-origins";
import { auth } from "./auth";

export default function configureAuth(app: AppOpenAPI) {
  app.use(
    "/api/auth/*",
    cors({
      origin: allowedOrigins,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  });

  app.use("*", requireSession);

  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
