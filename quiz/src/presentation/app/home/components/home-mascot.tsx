import Image from "next/image";

export default function HomeMascot() {
  return (
    <div id="home-mascot" className="relative">
      <div className="relative w-120 h-120 lg:w-[500px] lg:h-[500px] xl:w-[700px] xl:h-[700px]">
        <Image
          src="/images/suriquiz-mascot.png"
          alt="SuriQuiz Mascot - Friendly sloth with smartphone"
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="(max-width: 1024px) 384px, (max-width: 1280px) 500px, 600px"
        />
      </div>

      {/* Glow effect behind the mascot with purple theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#76549e]/20 via-[#33276d]/20 to-[#05054d]/20 rounded-full blur-3xl -z-10 scale-110"></div>
    </div>
  );
}
