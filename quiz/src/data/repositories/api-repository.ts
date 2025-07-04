import { Question } from "../../domain/interfaces/question";
import { Player } from "../../domain/interfaces/player";

// Detecta se está rodando no cliente ou servidor e define a URL correta
const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // Cliente: usa a URL do ambiente ou localhost
        return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    } else {
        // Servidor: sempre usa localhost
        return "http://localhost:3000";
    }
};

const API_BASE_URL = getApiBaseUrl();

export interface BackendQuestion {
    id: string;
    question: string;
    options: string[];
}

export interface BackendUser {
    id: string;
    name: string;
    username: string;
    points: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    name: string;
    username: string;
}

export interface CreateUserResponse {
    success: boolean;
    data: BackendUser;
}

export interface GetQuestionsResponse {
    success: boolean;
    data: BackendQuestion[];
}

export interface GetUsersResponse {
    success: boolean;
    data: BackendUser[];
}

export interface AnswerQuestionRequest {
    userId: string;
    questionId: string;
    selectedOption: string;
}

export interface AnswerQuestionResponse {
    success: boolean;
    data: {
        correct: boolean;
        correctAnswer: string;
        pointsEarned: number;
        totalPoints: number;
        message: string;
    };
}

export class ApiRepository {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        try {
            console.log(`🔗 API Request: ${config.method || 'GET'} ${url}`);

            const response = await fetch(url, config);

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {
                    // Se não conseguir parsear JSON, usa a mensagem padrão
                }

                console.error(`❌ API Error: ${errorMessage}`);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(`✅ API Success: ${config.method || 'GET'} ${url}`);
            return data;
        } catch (error) {
            console.error(`🚫 API request failed for ${endpoint}:`, error);

            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 3000.');
            }

            throw error;
        }
    }

    async createUser(userData: CreateUserRequest): Promise<BackendUser> {
        const response = await this.request<CreateUserResponse>("/user", {
            method: "POST",
            body: JSON.stringify(userData),
        });
        return response.data;
    }

    async getRandomQuestions(quantity: number = 10): Promise<BackendQuestion[]> {
        const response = await this.request<GetQuestionsResponse>(
            `/questions/random?quantity=${quantity}`
        );
        return response.data;
    }

    async answerQuestion(
        answerData: AnswerQuestionRequest
    ): Promise<AnswerQuestionResponse["data"]> {
        const response = await this.request<AnswerQuestionResponse>(
            "/questions/answer",
            {
                method: "POST",
                body: JSON.stringify(answerData),
            }
        );
        return response.data;
    }

    async getAllUsers(): Promise<BackendUser[]> {
        const response = await this.request<GetUsersResponse>("/user");
        return response.data;
    }
}

export const apiRepository = new ApiRepository();
