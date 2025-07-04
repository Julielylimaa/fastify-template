import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userRouter } from "./user.routes";
import { questionsRouter } from "./questions.routes";

export const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(userRouter, { prefix: "/user" });
  fastify.register(questionsRouter, { prefix: "/questions" });
};
