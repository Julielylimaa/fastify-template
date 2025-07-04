interface QuizQuestionProps {
  question: string;
}

export default function QuizQuestion({ question }: QuizQuestionProps) {
  return (
    <div id="quiz-question" className="mb-6">
      <h2 className="text-xl font-semibold text-purple-900 leading-relaxed">
        {question}
      </h2>
    </div>
  );
}
