import { z } from "zod";

export const contactSchema = z.object({
  locale: z.enum(["fa", "en"]),
  fullName: z.string().trim().min(2).max(100),
  business: z.string().trim().max(120).optional(),
  contact: z.string().trim().min(3).max(160),
  service: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  project: z.string().trim().min(20).max(3000),
  privacy: z.literal("on"),
  website: z.string().max(0),
});

export type ContactFields = z.infer<typeof contactSchema>;
