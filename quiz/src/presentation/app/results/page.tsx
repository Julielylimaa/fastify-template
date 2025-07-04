"use client";

import {
  useQuizStore,
  useTotalQuestions,
} from "../../../data/stores/quiz-store";
import { useRanking } from "../../../hooks/use-ranking";
import ResultsActions from "./components/results-actions";
import ResultsHeader from "./components/results-header";
import ResultsRanking from "./components/results-ranking";
import ResultsScore from "./components/results-score";

export default function ResultsPage() {
  const playerName = useQuizStore((state) => state.playerName);
  const playerUsername = useQuizStore((state) => state.playerUsername);
  const playerId = useQuizStore((state) => state.playerId);
  const score = useQuizStore((state) => state.score);
  const questions = useQuizStore((state) => state.questions);
  const totalQuestions = useTotalQuestions();

  const { ranking, isLoading, error } = useRanking();

  // Calcular estatísticas
  const correctAnswers = questions.filter((q) => q.isCorrect).length;
  const incorrectAnswers = questions.filter(
    (q) => q.isCorrect === false
  ).length;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return (
    <div
      id="results-page"
      className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d] flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl">
        <ResultsHeader />

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border border-white/20">
          <ResultsScore
            playerName={playerName}
            playerUsername={playerUsername}
            score={score}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            percentage={percentage}
          />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border border-white/20">
          <ResultsRanking
            ranking={ranking}
            isLoading={isLoading}
            error={error}
            currentPlayerId={playerId}
          />
        </div>

        <ResultsActions />
      </div>
    </div>
  );
}
