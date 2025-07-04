import { z } from "zod";

export const AnswerQuestionSchema = z.object({
    userId: z.string().uuid("User ID must be a valid UUID"),
    questionId: z.string().uuid("Question ID must be a valid UUID"),
    selectedOption: z
        .string({
            required_error: "Selected option is required",
            invalid_type_error: "Selected option must be a string",
        })
        .min(1, "Selected option cannot be empty")
        .trim(),
});

export type AnswerQuestionDto = z.infer<typeof AnswerQuestionSchema>;
