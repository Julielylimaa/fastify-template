import type { Question } from "./question"

export type QuizScreen = "home" | "quiz" | "results"

export interface QuizState {
  currentScreen: QuizScreen
  playerName: string
  playerUsername: string
  playerId?: string
  questions: Question[]
  currentQuestionIndex: number
  score: number
  showFeedback: boolean
  timeLeft: number
  isLoading?: boolean
  error?: string
}

export interface AnswerSubmission {
  questionId: string
  selectedAnswer: string
  timeSpent: number
}

export interface ScoreSubmission {
  playerName: string
  playerUsername: string
  score: number
  totalQuestions: number
}
