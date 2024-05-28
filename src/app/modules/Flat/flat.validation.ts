import { z } from "zod";

const createFlatValidation = z.object({
  squareFeet: z
    .number({ required_error: "Square Feet is required" })
    .int()
    .positive(),
  totalBedrooms: z
    .number({ required_error: "Total Bedrooms is required" })
    .int()
    .positive(),
  totalRooms: z
    .number({ required_error: "Total Rooms is required" })
    .int()
    .positive(),
  utilitiesDescription: z
    .string({ required_error: "Utilities Description is required" })
    .max(255),
  location: z.string({ required_error: "Location is required" }).max(255),
  description: z.string({ required_error: "Description is required" }).max(255),
  rent: z.number({ required_error: "Rent is required" }).int().positive(),
  advanceAmount: z
    .number({ required_error: "Advance Amount is required" })
    .int()
    .positive(),
  availability: z.boolean().default(true),
  amenities: z.string({ required_error: "Amenities is required" }).max(255),
  flatPhoto: z.array(z.string()).optional(), // Optional array of strings
});
const updateFlatValidation = z.object({
  squareFeet: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Square Feet is required"),
  totalBedrooms: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Total Bedrooms is required"),
  totalRooms: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Total Rooms is required"),
  utilitiesDescription: z
    .string()
    .max(255)
    .optional()
    .describe("Utilities Description is required"),
  location: z
    .string()
    .max(255)
    .optional()
    .describe("Location is required"),
  description: z
    .string()
    .max(255)
    .optional()
    .describe("Description is required"),
  rent: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Rent is required"),
  advanceAmount: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Advance Amount is required"),
  flatPhoto: z
    .array(z.string())
    .optional()
    .describe("Flat photos should be an array of strings"),
});

export const flatValidations = {
  createFlatValidation,
  updateFlatValidation,
};
