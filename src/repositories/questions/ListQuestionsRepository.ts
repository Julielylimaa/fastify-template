import { PrismaClient } from "@prisma/client";

export class ListQuestionsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async execute() {
        return this.prisma.questions.findMany();
    }
}
