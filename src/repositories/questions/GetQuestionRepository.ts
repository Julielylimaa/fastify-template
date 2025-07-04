import { PrismaClient } from "@prisma/client";

export class GetQuestionRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getById(questionId: string) {
        return this.prisma.questions.findUnique({
            where: {
                id: questionId,
                deletedAt: null,
            },
            select: {
                id: true,
                question: true,
                answer: true,
                options: true,
            },
        });
    }
}
