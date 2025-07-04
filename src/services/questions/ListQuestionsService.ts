import { ListQuestionsRepository } from "@repositories/questions/ListQuestionsRepository";

export class ListQuestionsService {
    private listQuestionsRepository: ListQuestionsRepository;

    constructor(listQuestionsRepository: ListQuestionsRepository) {
        this.listQuestionsRepository = listQuestionsRepository;
    }

    async execute() {
        const questions = await this.listQuestionsRepository.execute();

        return questions;
    }
}
