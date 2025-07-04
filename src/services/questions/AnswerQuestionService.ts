import { AnswerQuestionDto } from "@interfaces/questions/IAnswerQuestion";
import { GetQuestionRepository } from "@repositories/questions/GetQuestionRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";
import { UpdateUserRepository } from "@repositories/user/UpdateUserRepository";
import { HTTPError } from "@config/errors";

export class AnswerQuestionService {
    private getQuestionRepository: GetQuestionRepository;
    private getUserRepository: GetUserRepository;
    private updateUserRepository: UpdateUserRepository;

    constructor(
        getQuestionRepository: GetQuestionRepository,
        getUserRepository: GetUserRepository,
        updateUserRepository: UpdateUserRepository
    ) {
        this.getQuestionRepository = getQuestionRepository;
        this.getUserRepository = getUserRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async execute(answerData: AnswerQuestionDto) {
        // Buscar a questão
        const question = await this.getQuestionRepository.getById(answerData.questionId);
        if (!question) {
            throw new HTTPError(404, "Question not found");
        }

        // Buscar o usuário
        const user = await this.getUserRepository.getById(answerData.userId);
        if (!user) {
            throw new HTTPError(404, "User not found");
        }

        // Verificar se a resposta está correta
        const isCorrect = question.answer === answerData.selectedOption;

        let newPoints = user.points;

        if (isCorrect) {
            // Adicionar 5 pontos se a resposta estiver correta
            newPoints = user.points + 5;

            // Atualizar pontos do usuário
            await this.updateUserRepository.execute({
                id: user.id,
                points: newPoints,
            });
        }

        return {
            correct: isCorrect,
            correctAnswer: question.answer,
            pointsEarned: isCorrect ? 5 : 0,
            totalPoints: newPoints,
            message: isCorrect
                ? "Resposta correta! Você ganhou 5 pontos!"
                : `Resposta incorreta. A resposta correta era: ${question.answer}`,
        };
    }
}
