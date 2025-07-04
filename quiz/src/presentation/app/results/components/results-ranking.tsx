import { RankingEntry } from "../../../../domain/interfaces/ranking";

interface ResultsRankingProps {
  ranking: RankingEntry[];
  isLoading: boolean;
  error?: string | null;
  currentPlayerId?: string;
}

export default function ResultsRanking({
  ranking,
  isLoading,
  error,
  currentPlayerId,
}: ResultsRankingProps) {
  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${position}`;
    }
  };

  if (isLoading) {
    return (
      <div id="ranking-loading" className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#76549e] mx-auto mb-4"></div>
        <p className="text-[#33276d]">Loading ranking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div id="ranking-error" className="text-center py-8">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const topRanking = ranking.slice(0, 10);

  return (
    <div id="results-ranking">
      <h3 className="text-xl font-bold text-[#33276d] mb-4 text-center">
        Top 10 Players
      </h3>

      {topRanking.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No players yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {topRanking.map((entry, index) => {
            const isCurrentPlayer = entry.id === currentPlayerId;
            return (
              <div
                key={entry.id}
                id={`ranking-entry-${index}`}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isCurrentPlayer
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-400 ring-2 ring-yellow-300"
                    : "bg-gradient-to-r from-[#76549e]/10 to-[#33276d]/10 border-[#76549e]/20"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <span className="font-bold text-lg">
                      {getMedalEmoji(index + 1)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        isCurrentPlayer ? "text-yellow-800" : "text-[#33276d]"
                      }`}
                    >
                      {entry.name}
                      {isCurrentPlayer && (
                        <span className="ml-2 text-xs">(You!)</span>
                      )}
                    </span>
                    <span
                      className={`text-sm ${
                        isCurrentPlayer ? "text-yellow-600" : "text-[#76549e]"
                      }`}
                    >
                      @{entry.username}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    isCurrentPlayer ? "text-yellow-800" : "text-[#33276d]"
                  }`}
                >
                  {entry.points} pts
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
