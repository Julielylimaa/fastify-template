import { create } from "zustand";
import { QuizScreen, QuizState } from "../../domain/interfaces/quiz";
import { Question } from "../../domain/interfaces/question";

interface QuizStore extends QuizState {
  setPlayerData: (data: Partial<QuizState>) => void;
  // Actions
  setCurrentScreen: (screen: QuizScreen) => void;
  setPlayerName: (name: string) => void;
  setPlayerUsername: (username: string) => void;
  setPlayerId: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  incrementScore: (points: number) => void;
  setShowFeedback: (show: boolean) => void;
  setTimeLeft: (time: number) => void;
  selectAnswer: (questionId: string, answer: string) => void;
  updateQuestionResult: (questionId: string, isCorrect: boolean, correctAnswer: string, pointsEarned: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  currentScreen: "home",
  playerName: "",
  playerUsername: "",
  playerId: undefined,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showFeedback: false,
  timeLeft: 15,
  isLoading: false,
  error: undefined,
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,

  // Actions
  setPlayerData: (data: Partial<QuizState>) => set(data),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setPlayerName: (name) => set({ playerName: name }),
  setPlayerUsername: (username) => set({ playerUsername: username }),
  setPlayerId: (id) => set({ playerId: id }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  incrementScore: (points) => set((state) => ({ score: state.score + points })),
  setShowFeedback: (show) => set({ showFeedback: show }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error || undefined }),

  selectAnswer: (questionId, answer) => {
    const state = get();
    const updatedQuestions = state.questions.map((q) =>
      q.id === questionId ? { ...q, selectedAnswer: answer, isAnswered: true } : q
    );
    set({ questions: updatedQuestions });
  },

  updateQuestionResult: (questionId, isCorrect, correctAnswer, pointsEarned) => {
    const state = get();
    const updatedQuestions = state.questions.map((q) =>
      q.id === questionId ? {
        ...q,
        isCorrect,
        correctAnswer,
        pointsEarned
      } : q
    );
    set({ questions: updatedQuestions });
  },

  resetQuiz: () => set(initialState),
}));

// Computed selectors (hooks) - CORRIGIDO
export const useCurrentQuestion = () => {
  return useQuizStore((state) => {
    // Verificar se questions existe e não está vazio
    if (!state.questions || state.questions.length === 0) {
      return null;
    }

    // Verificar se o índice é válido
    if (
      state.currentQuestionIndex < 0 ||
      state.currentQuestionIndex >= state.questions.length
    ) {
      return null;
    }

    return state.questions[state.currentQuestionIndex];
  });
};

export const useTotalQuestions = () => {
  return useQuizStore((state) => state.questions.length);
};

export const useIsLastQuestion = () => {
  return useQuizStore((state) => {
    if (!state.questions || state.questions.length === 0) {
      return false;
    }
    return state.currentQuestionIndex === state.questions.length - 1;
  });
};
