"use client";

import { useEffect } from "react";
import { useQuizActions } from "../../../../hooks/use-quiz-actions";

interface QuizFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  selectedAnswer?: string;
  pointsEarned: number;
  isLastQuestion: boolean;
}

export default function QuizFeedback({
  isCorrect,
  correctAnswer,
  selectedAnswer,
  pointsEarned,
  isLastQuestion,
}: QuizFeedbackProps) {
  const { nextQuestion, finishQuiz } = useQuizActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLastQuestion) {
        finishQuiz();
      } else {
        nextQuestion();
      }
    }, 3000); // Aumentei o tempo para dar mais tempo para ver o feedback

    return () => clearTimeout(timer);
  }, [isLastQuestion, nextQuestion, finishQuiz]);

  return (
    <div id="quiz-feedback" className="text-center py-8">
      <div className="flex justify-center mb-4">
        <span className="text-6xl">{isCorrect ? "✅" : "❌"}</span>
      </div>

      <h3
        className={`text-2xl font-bold mb-2 ${
          isCorrect ? "text-green-600" : "text-red-600"
        }`}
      >
        {isCorrect ? "Correct!" : "Wrong!"}
      </h3>

      {isCorrect && (
        <p className="text-green-600 mb-2">
          You earned <strong>{pointsEarned} points</strong>!
        </p>
      )}

      {!isCorrect && (
        <div className="text-[#33276d] mb-2">
          <p className="mb-1">
            The correct answer was:{" "}
            <strong className="text-[#05054d]">{correctAnswer}</strong>
          </p>
          {selectedAnswer && (
            <p className="text-red-600">
              Your answer: <strong>{selectedAnswer}</strong>
            </p>
          )}
        </div>
      )}

      <div className="text-sm text-gray-600 mt-4">
        {isLastQuestion ? "Finishing quiz..." : "Next question in 3 seconds..."}
      </div>
    </div>
  );
}
