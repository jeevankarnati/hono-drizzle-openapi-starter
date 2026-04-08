import { createMiddleware } from "hono/factory";
import type { AppBindings } from "@/libs/types";
import * as HTTP_STATUS_CODES from "@/helpers/http-status-codes";
import * as HTTP_STATUS_PHRASES from "@/helpers/http-status-phrases";

function isPublicPath(path: string): boolean {
  if (path === "/doc" || path === "/reference") {
    return true;
  }
  if (path.startsWith("/api/auth/")) {
    return true;
  }
  return false;
}

export const requireSession = createMiddleware<AppBindings>(async (c, next) => {
  if (isPublicPath(c.req.path)) {
    return next();
  }
  const user = c.get("user");
  const session = c.get("session");
  if (!user || !session) {
    return c.json({ message: HTTP_STATUS_PHRASES.UNAUTHORIZED }, HTTP_STATUS_CODES.UNAUTHORIZED);
  }
  return next();
});
