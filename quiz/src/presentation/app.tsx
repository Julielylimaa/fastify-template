"use client";

import { useQuizStore } from "../data/stores/quiz-store";
import HomePage from "./app/home/page";
import QuizPage from "./app/quiz/page";
import ResultsPage from "./app/results/page";

export default function App() {
  const currentScreen = useQuizStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomePage />;
      case "quiz":
        return <QuizPage />;
      case "results":
        return <ResultsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      id="quiz-app"
      className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d]"
    >
      {renderScreen()}
    </div>
  );
}
