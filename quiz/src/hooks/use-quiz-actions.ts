"use client";

import { useCallback } from "react";
import {
  useCurrentQuestion,
  useIsLastQuestion,
  useQuizStore,
  useTotalQuestions,
} from "../data/stores/quiz-store";
import { apiRepository } from "../data/repositories/api-repository";
import { QUIZ_CONSTANTS } from "../domain/constants/quiz";

export function useQuizActions() {
  const setCurrentScreen = useQuizStore((state) => state.setCurrentScreen);
  const setPlayerData = useQuizStore((state) => state.setPlayerData);
  const setPlayerName = useQuizStore((state) => state.setPlayerName);
  const setPlayerUsername = useQuizStore((state) => state.setPlayerUsername);
  const setPlayerId = useQuizStore((state) => state.setPlayerId);
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const setCurrentQuestionIndex = useQuizStore(
    (state) => state.setCurrentQuestionIndex
  );
  const incrementScore = useQuizStore((state) => state.incrementScore);
  const setShowFeedback = useQuizStore((state) => state.setShowFeedback);
  const setTimeLeft = useQuizStore((state) => state.setTimeLeft);
  const selectAnswerStore = useQuizStore((state) => state.selectAnswer);
  const updateQuestionResult = useQuizStore((state) => state.updateQuestionResult);
  const setLoading = useQuizStore((state) => state.setLoading);
  const setError = useQuizStore((state) => state.setError);
  const resetQuizStore = useQuizStore((state) => state.resetQuiz);

  const currentQuestion = useCurrentQuestion();
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const isLastQuestion = useIsLastQuestion();
  const playerName = useQuizStore((state) => state.playerName);
  const playerUsername = useQuizStore((state) => state.playerUsername);
  const playerId = useQuizStore((state) => state.playerId);
  const score = useQuizStore((state) => state.score);
  const totalQuestions = useTotalQuestions();

  const startQuiz = useCallback(
    async (name: string, username: string) => {
      try {
        setLoading(true);
        setError(null);

        // Criar usuário no backend
        const user = await apiRepository.createUser({ name, username });

        // Atualizar estado do quiz
        setPlayerName(name);
        setPlayerUsername(username);
        setPlayerId(user.id);

        // Buscar perguntas aleatórias
        const questions = await apiRepository.getRandomQuestions(10);

        // Converter perguntas para o formato interno
        const formattedQuestions = questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          selectedAnswer: undefined,
          isAnswered: false,
          isCorrect: undefined,
          correctAnswer: undefined,
          pointsEarned: undefined,
        }));

        setQuestions(formattedQuestions);
        setCurrentScreen("quiz");
        setTimeLeft(QUIZ_CONSTANTS.QUESTION_TIME_LIMIT);
        setLoading(false);
      } catch (error) {
        console.error("Failed to start quiz:", error);
        setError("Failed to start quiz. Please try again.");
        setLoading(false);
      }
    },
    [setPlayerName, setPlayerUsername, setPlayerId, setCurrentScreen, setQuestions, setTimeLeft, setLoading, setError]
  );

  const selectAnswer = useCallback(
    async (questionId: string, selectedOption: string) => {
      if (!currentQuestion || !playerId) return;

      try {
        setLoading(true);

        // Marcar resposta como selecionada
        selectAnswerStore(questionId, selectedOption);

        // Enviar resposta para o backend
        const result = await apiRepository.answerQuestion({
          userId: playerId,
          questionId,
          selectedOption,
        });

        // Atualizar resultado da questão
        updateQuestionResult(
          questionId,
          result.correct,
          result.correctAnswer,
          result.pointsEarned
        );

        // Atualizar pontuação total
        if (result.correct) {
          incrementScore(result.pointsEarned);
        }

        // Mostrar feedback
        setShowFeedback(true);
        setLoading(false);
      } catch (error) {
        console.error("Failed to submit answer:", error);
        setError("Failed to submit answer. Please try again.");
        setLoading(false);
      }
    },
    [currentQuestion, playerId, selectAnswerStore, updateQuestionResult, incrementScore, setShowFeedback, setLoading, setError]
  );

  const nextQuestion = useCallback(() => {
    setShowFeedback(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeLeft(QUIZ_CONSTANTS.QUESTION_TIME_LIMIT);
  }, [
    setShowFeedback,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    setTimeLeft,
  ]);

  const finishQuiz = useCallback(async () => {
    setCurrentScreen("results");
  }, [setCurrentScreen]);

  const resetQuiz = useCallback(() => {
    resetQuizStore();
  }, [resetQuizStore]);

  const handleTimeUp = useCallback(() => {
    if (!currentQuestion || useQuizStore.getState().showFeedback) return;

    // Auto-select empty answer when time is up
    selectAnswerStore(currentQuestion.id, "");
    setShowFeedback(true);
  }, [currentQuestion, selectAnswerStore, setShowFeedback]);

  return {
    startQuiz,
    selectAnswer,
    nextQuestion,
    finishQuiz,
    resetQuiz,
    handleTimeUp,
  };
}
