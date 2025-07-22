import FeatureSection from "@/Component/UI/FeatureSection";
import Footer from "@/Component/UI/Footer";
import HeroSection from "@/Component/UI/HeroSection";
import ProblemSection from "@/Component/UI/ProblemSection";
import ProblemToSolutionTransition from "@/Component/UI/Sepereation";

export default function HomePage() {
  return (
    
      <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <ProblemToSolutionTransition/>
      <FeatureSection /> {/* ✅ Sits directly in the main page flow */}
      <Footer/>
      {/* <Footer /> */}
    </main>
  );
}