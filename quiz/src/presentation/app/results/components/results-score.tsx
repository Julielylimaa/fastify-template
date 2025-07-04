interface ResultsScoreProps {
  playerName: string;
  playerUsername: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
}

export default function ResultsScore({
  playerName,
  playerUsername,
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  percentage,
}: ResultsScoreProps) {
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good job!";
    return "Keep practicing!";
  };

  return (
    <div id="results-score" className="text-center">
      <h2 className="text-2xl font-bold text-[#33276d] mb-2">
        Well done, {playerName}!
      </h2>
      <p className="text-[#76549e] mb-4">@{playerUsername}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{score}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor()}`}>
            {percentage}%
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">
            {totalQuestions}
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold text-green-600">
            {correctAnswers}
          </div>
          <div className="text-xs text-gray-500">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600">
            {incorrectAnswers}
          </div>
          <div className="text-xs text-gray-500">Wrong</div>
        </div>
      </div>

      <p className={`text-lg font-semibold ${getScoreColor()}`}>
        {getScoreMessage()}
      </p>
    </div>
  );
}
