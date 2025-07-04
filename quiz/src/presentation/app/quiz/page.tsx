"use client";

import {
  useCurrentQuestion,
  useIsLastQuestion,
  useQuizStore,
  useTotalQuestions,
} from "../../../data/stores/quiz-store";
import { useQuizTimer } from "../../../hooks/use-quiz-timer";
import QuizFeedback from "./components/quiz-feedback";
import QuizHeader from "./components/quiz-header";
import QuizOptions from "./components/quiz-options";
import QuizQuestion from "./components/quiz-question";

export default function QuizPage() {
  const currentQuestion = useCurrentQuestion();
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const totalQuestions = useTotalQuestions();
  const showFeedback = useQuizStore((state) => state.showFeedback);
  const isLastQuestion = useIsLastQuestion();
  const isLoading = useQuizStore((state) => state.isLoading);
  const error = useQuizStore((state) => state.error);

  const { timeLeft } = useQuizTimer();

  if (error) {
    return (
      <div
        id="quiz-error"
        className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-white text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-purple-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion || isLoading) {
    return (
      <div
        id="quiz-loading"
        className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="quiz-page"
      className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d] flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl">
        <QuizHeader
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          timeLeft={timeLeft}
        />

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <QuizQuestion question={currentQuestion.question} />

          {!showFeedback ? (
            <QuizOptions
              options={currentQuestion.options}
              questionId={currentQuestion.id}
            />
          ) : (
            <QuizFeedback
              isCorrect={currentQuestion.isCorrect || false}
              correctAnswer={currentQuestion.correctAnswer || ""}
              selectedAnswer={currentQuestion.selectedAnswer}
              pointsEarned={currentQuestion.pointsEarned || 0}
              isLastQuestion={isLastQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
}
