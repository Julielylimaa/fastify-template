import { PrismaClient } from "@prisma/client";

export class GetRandomQuestionsRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }


    // Método alternativo usando raw query para verdadeira aleatoriedade
    async executeRandom(quantity: number) {
        return this.prisma.$queryRaw<Array<{
            id: string;
            question: string;
            options: string[];
        }>>`
            SELECT id, question, options
            FROM questions 
            WHERE "deletedAt" IS NULL
            ORDER BY RANDOM() 
            LIMIT ${quantity}
        `;
    }
}
