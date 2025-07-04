export default function ResultsHeader() {
  return (
    <div id="results-header" className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <span className="text-6xl drop-shadow-lg">🏆</span>
      </div>
      <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
        Quiz Complete!
      </h1>
      <p className="text-white/90 text-lg drop-shadow-md">
        Here are your results
      </p>
    </div>
  );
}
