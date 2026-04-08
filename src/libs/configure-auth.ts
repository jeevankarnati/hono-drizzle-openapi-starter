import type { AppOpenAPI } from "./types";
import { auth } from "./auth";

export default function configureAuth(app: AppOpenAPI) {
  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
