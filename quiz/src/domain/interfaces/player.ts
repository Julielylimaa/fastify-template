import { z } from "zod";

export const playerDataSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    )
    .toLowerCase(),
});

export type PlayerDataInput = z.infer<typeof playerDataSchema>;

export interface Player {
  id: string;
  name: string;
  username: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}
