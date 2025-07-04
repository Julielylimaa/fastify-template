import { getRandomQuestionsRepository, listQuestionsRepository, getQuestionRepository } from "@repositories/questions";
import { getUserRepository, updateUserRepository } from "@repositories/user";
import { ListQuestionsService } from "./ListQuestionsService";
import { GetRandomQuestionsService } from "./GetRandomQuestionsService";
import { AnswerQuestionService } from "./AnswerQuestionService";

export const listQuestionsService = new ListQuestionsService(listQuestionsRepository);
export const getRandomQuestionsService = new GetRandomQuestionsService(getRandomQuestionsRepository);
export const answerQuestionService = new AnswerQuestionService(
    getQuestionRepository,
    getUserRepository,
    updateUserRepository
);


