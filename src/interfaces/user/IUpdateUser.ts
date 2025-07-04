import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string().uuid("Id must be a valid UUID"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),

  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username cannot be empty")
    .max(50, "Username must be less than 50 characters")
    .trim()
    .optional(),

  points: z.number().int().min(0).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
