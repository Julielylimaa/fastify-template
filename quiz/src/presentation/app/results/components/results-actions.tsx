"use client";

import { useQuizActions } from "../../../../hooks/use-quiz-actions";
import FormButton from "../../../components/form/form-button";

export default function ResultsActions() {
  const { resetQuiz } = useQuizActions();

  return (
    <div id="results-actions" className="text-center">
      <FormButton
        id="play-again-button"
        onClick={resetQuiz}
        className="px-8 py-3"
      >
        Play Again
      </FormButton>
    </div>
  );
}
