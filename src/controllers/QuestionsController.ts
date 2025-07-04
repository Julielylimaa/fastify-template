import { answerQuestionService, getRandomQuestionsService, listQuestionsService } from "@services/questions";
import { FastifyReply, FastifyRequest } from "fastify";
import { AnswerQuestionDto, AnswerQuestionSchema } from "@interfaces/questions/IAnswerQuestion";


export class QuestionsController {

    async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const questions = await listQuestionsService.execute();

        reply.status(200).send({
            success: true,
            data: [...questions],
        });
    }

    async random(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { quantity } = request.query as { quantity?: string };

        const questionsQuantity = quantity ? parseInt(quantity) : 10;

        const questions = await getRandomQuestionsService.execute(questionsQuantity);

        reply.status(200).send({
            success: true,
            data: questions,
        });
    }

    async answer(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const answerData: AnswerQuestionDto = AnswerQuestionSchema.parse(request.body);

        const result = await answerQuestionService.execute(answerData);

        reply.status(200).send({
            success: true,
            data: result,
        });
    }

}
