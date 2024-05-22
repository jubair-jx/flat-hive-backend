import { z } from "zod";

const createUser = z.object({
  name: z.string({ required_error: "Name is Required" }).min(1).max(255),
  email: z.string({ required_error: "Email is Required" }),
  password: z.string({ required_error: "Password is Required" }),
  bio: z.string().max(255).optional(),
  profession: z.string().max(255).optional(),
  address: z.string().max(255).optional(),
});

export const userValidationSchemas = {
  createUser,
};
