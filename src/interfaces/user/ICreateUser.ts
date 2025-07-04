import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username cannot be empty")
    .max(50, "Username must be less than 50 characters")
    .trim(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export type CreateUserData = CreateUserDto;
