"use client";

import { useQuizActions } from "../../../hooks/use-quiz-actions";
import HomeForm from "./components/home-form";
import HomeHeader from "./components/home-header";
import HomeMascot from "./components/home-mascot";

export default function HomePage() {
  const { startQuiz } = useQuizActions();

  const handleStartQuiz = (playerName: string, playerUsername: string) => {
    startQuiz(playerName, playerUsername);
  };

  return (
    <div
      id="home-page"
      className="min-h-screen bg-gradient-to-br from-[#33276d] via-[#76549e] to-[#05054d]"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="flex flex-col items-center lg:items-center justify-center space-y-8 lg:pl-8">
            <HomeHeader />
            <div className="w-full max-w-md">
              <HomeForm onSubmit={handleStartQuiz} />
            </div>
          </div>

          {/* Right Column - Mascot */}
          <div className="hidden lg:flex justify-center items-center ">
            <HomeMascot />
          </div>
        </div>
      </div>
    </div>
  );
}
