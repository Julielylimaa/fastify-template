interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

export default function QuizHeader({
  currentQuestion,
  totalQuestions,
  timeLeft,
}: QuizHeaderProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div id="quiz-header" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-white/90">
          Question {currentQuestion} of {totalQuestions}
        </span>

        <div className="flex items-center space-x-2">
          <span className="text-2xl">⏰</span>
          <span
            className={`font-bold ${
              timeLeft <= 5 ? "text-red-300" : "text-white"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[#76549e] to-white h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
