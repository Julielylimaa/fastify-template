import { QuestionsController } from "@controllers/QuestionsController";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const questionsRouter: FastifyPluginAsync = async (
    fastify: FastifyInstance
): Promise<void> => {
    const questionsController = new QuestionsController();

    fastify.get("/", questionsController.list);
    fastify.get("/random", questionsController.random);
    fastify.post("/answer", questionsController.answer);

}
