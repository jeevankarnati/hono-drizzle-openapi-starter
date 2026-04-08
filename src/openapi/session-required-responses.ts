import * as HTTP_STATUS_CODES from "@/helpers/http-status-codes";
import * as HTTP_STATUS_PHRASES from "@/helpers/http-status-phrases";
import jsonContent from "@/openapi/helpers/json-content";
import createMessageObjectSchema from "./schema/create-message-object";

export const sessionRequiredResponses = {
  [HTTP_STATUS_CODES.UNAUTHORIZED]: jsonContent({
    schema: createMessageObjectSchema(HTTP_STATUS_PHRASES.UNAUTHORIZED),
    description: `No valid session (${HTTP_STATUS_PHRASES.UNAUTHORIZED}); sign in required.`,
  }),
} as const;
