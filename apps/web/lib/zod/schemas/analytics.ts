import { intervals, VALID_TINYBIRD_ENDPOINTS } from "@/lib/analytics";
import z from "@/lib/zod";
import { COUNTRY_CODES } from "@dub/utils";
import { booleanQuerySchema } from "./misc";

export const getAnalyticsQuerySchema = z.object({
  domain: z.string().optional().describe("The domain of the short link."),
  key: z.string().optional().describe("The short link slug."),
  interval: z
    .enum(intervals)
    .optional()
    .describe("The interval to retrieve analytics for."),
  country: z
    .enum(COUNTRY_CODES)
    .optional()
    .describe("The country to retrieve analytics for."),
  city: z.string().optional().describe("The city to retrieve analytics for."),
  device: z
    .string()
    .optional()
    .describe("The device to retrieve analytics for."),
  browser: z
    .string()
    .optional()
    .describe("The browser to retrieve analytics for."),
  os: z.string().optional().describe("The OS to retrieve analytics for."),
  referer: z
    .string()
    .optional()
    .describe("The referer to retrieve analytics for."),
  url: z.string().optional().describe("The URL to retrieve analytics for."),
  tagId: z
    .string()
    .optional()
    .describe("The tag ID to retrieve analytics for."),
  qr: booleanQuerySchema
    .optional()
    .describe(
      "Filter for QR code scans. If true, filter for QR codes only. If false, filter for links only. If undefined, return both.",
    ),
  root: booleanQuerySchema
    .optional()
    .describe(
      "Filter for root domains. If true, filter for domains only. If false, filter for links only. If undefined, return both.",
    ),
});

export const getAnalyticsEdgeQuerySchema = getAnalyticsQuerySchema.required({
  domain: true,
});

export const analyticsEndpointSchema = z.object({
  endpoint: z.enum(VALID_TINYBIRD_ENDPOINTS, {
    errorMap: (_issue, _ctx) => {
      return {
        message: `Invalid endpoint. Valid endpoints are: ${VALID_TINYBIRD_ENDPOINTS.join(", ")}`,
      };
    },
  }),
});
