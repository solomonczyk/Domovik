import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const serviceRequestSchema = z.object({
  service: z.enum([
    "prepareArrival",
    "cleaning",
    "yardCare",
    "stormCheck",
    "plantWatering",
    "petCare",
  ]),
  date: z.string().min(1, "Preferred date is required"),
  urgency: z.enum(["standard", "urgent", "scheduled"]),
  note: z.string().max(2000).optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
export type ServiceRequestData = z.infer<typeof serviceRequestSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(6, "Phone number is required")
    .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City is required"),
  propertyType: z.enum(["house", "apartment", "rental"]),
  comment: z.string().optional(),
  consent: z.literal(true, {
    message: "You must agree to data processing",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
