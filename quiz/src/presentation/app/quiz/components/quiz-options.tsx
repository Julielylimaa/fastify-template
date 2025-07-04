"use client";

import { useQuizActions } from "../../../../hooks/use-quiz-actions";
import { useQuizStore } from "../../../../data/stores/quiz-store";

interface QuizOptionsProps {
  options: string[];
  questionId: string;
}

export default function QuizOptions({ options, questionId }: QuizOptionsProps) {
  const { selectAnswer } = useQuizActions();
  const isLoading = useQuizStore((state) => state.isLoading);

  const handleOptionClick = (option: string) => {
    if (isLoading) return;
    selectAnswer(questionId, option);
  };

  return (
    <div id="quiz-options" className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          id={`option-${index}`}
          onClick={() => handleOptionClick(option)}
          disabled={isLoading}
          className="w-full p-4 text-left bg-gradient-to-r from-[#76549e]/10 to-[#33276d]/10 hover:from-[#76549e]/20 hover:to-[#33276d]/20 border border-[#76549e]/30 hover:border-[#76549e]/50 rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-medium text-[#33276d] mr-3">
            {String.fromCharCode(65 + index)}.
          </span>
          <span className="text-gray-800">{option}</span>
          {isLoading && (
            <span className="ml-2 text-sm text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
