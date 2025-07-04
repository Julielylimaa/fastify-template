import { GetRandomQuestionsRepository } from "@repositories/questions/GetRandomQuestionsRepository";

export class GetRandomQuestionsService {
    private getRandomQuestionsRepository: GetRandomQuestionsRepository;

    constructor(getRandomQuestionsRepository: GetRandomQuestionsRepository) {
        this.getRandomQuestionsRepository = getRandomQuestionsRepository;
    }

    async execute(quantity: number = 10) {
        // Limitar a quantidade máxima para evitar sobrecarga
        const maxQuestions = Math.min(quantity, 50);

        // Usar o método com raw query para verdadeira aleatoriedade
        const questions = await this.getRandomQuestionsRepository.executeRandom(maxQuestions);

        // Retornar apenas os dados necessários para o quiz (sem a resposta correta)
        return questions.map(question => ({
            id: question.id,
            question: question.question,
            options: question.options, // Já embaralhadas do seed
        }));
    }
}
