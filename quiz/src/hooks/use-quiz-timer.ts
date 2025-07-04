"use client";

import { useEffect } from "react";

import { useQuizActions } from "./use-quiz-actions";
import { useQuizStore } from "../data/stores/quiz-store";

export function useQuizTimer() {
  const timeLeft = useQuizStore((state) => state.timeLeft);
  const setTimeLeft = useQuizStore((state) => state.setTimeLeft);
  const showFeedback = useQuizStore((state) => state.showFeedback);
  const currentScreen = useQuizStore((state) => state.currentScreen);

  const { handleTimeUp } = useQuizActions();

  useEffect(() => {
    if (currentScreen !== "quiz" || showFeedback || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = timeLeft - 1;
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showFeedback, currentScreen, setTimeLeft, handleTimeUp]);

  return { timeLeft };
}
