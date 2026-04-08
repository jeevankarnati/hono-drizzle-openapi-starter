import { createRoute, type RouteConfig } from "@hono/zod-openapi";
import { sessionRequiredResponses } from "@/openapi/session-required-responses";

export function createProtectedRoute<R extends RouteConfig>(route: R) {
  return createRoute({
    ...route,
    responses: {
      ...route.responses,
      ...sessionRequiredResponses,
    },
  });
}
