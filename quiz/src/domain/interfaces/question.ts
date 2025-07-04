export interface Question {
  id: string;
  question: string;
  options: string[];
  selectedAnswer?: string;
  isAnswered?: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
  pointsEarned?: number;
}

export interface QuestionResponse {
  questions: Question[];
}
