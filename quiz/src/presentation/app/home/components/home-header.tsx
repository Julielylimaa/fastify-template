export default function HomeHeader() {
  return (
    <div id="home-header" className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/20">
          <span className="text-white text-3xl font-bold">🧠</span>
        </div>
      </div>
      <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        SuriQuiz
      </h1>
      <p className="text-xl text-white/90 drop-shadow-md max-w-md mx-auto">
        Test your knowledge and compete with others in the most colorful quiz
        experience!
      </p>
    </div>
  );
}
