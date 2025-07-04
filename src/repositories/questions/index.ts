import prisma from "@config/postgres";

import { ListQuestionsRepository } from "./ListQuestionsRepository";
import { GetRandomQuestionsRepository } from "./GetRandomQuestionsRepository";
import { GetQuestionRepository } from "./GetQuestionRepository";

export const listQuestionsRepository = new ListQuestionsRepository(prisma);
export const getRandomQuestionsRepository = new GetRandomQuestionsRepository(prisma);
export const getQuestionRepository = new GetQuestionRepository(prisma); 
