"use client";

import { useState, useEffect, useCallback } from "react";
import { apiRepository } from "../data/repositories/api-repository";
import { RankingEntry } from "../domain/interfaces/ranking";

export function useRanking() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanking = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const users = await apiRepository.getAllUsers();

      // Ordenar por pontos (decrescente) e depois por data de criação (crescente)
      const sortedUsers = users.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      setRanking(sortedUsers);
    } catch (err) {
      console.error("Failed to fetch ranking:", err);
      setError("Failed to load ranking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  return {
    ranking,
    isLoading,
    error,
    refetch: fetchRanking,
  };
}
