// import { useEffect } from "react";
import FeatureSection from "@/Component/UI/FeatureSection";
import Footer from "@/Component/UI/Footer";
import HeroSection from "@/Component/UI/HeroSection";
import ProblemSection from "@/Component/UI/ProblemSection";
import ProblemToSolutionTransition from "@/Component/UI/Sepereation";

export default function HomePage() {
  // useEffect(() => {
  //   // Set body styles to prevent overscroll
  //   document.body.style.backgroundColor = '#0a0a0a';
  //   document.body.style.overscrollBehavior = 'none';
  //   document.documentElement.style.backgroundColor = '#0a0a0a';
  //       return () => {
  //   };
  // }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <ProblemToSolutionTransition/>
      <FeatureSection />
      <Footer/>
    </main>
  );
}