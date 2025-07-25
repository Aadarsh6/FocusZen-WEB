// import { useEffect } from "react";
import FeatureSection from "@/Component/UI/FeatureSection";
import Footer from "@/Component/UI/Footer";
import HeroSection from "@/Component/UI/HeroSection";
import ProblemSection from "@/Component/UI/ProblemSection";
import Lenis from "lenis";
import { useEffect } from "react";

export default function HomePage() {
useEffect(()=>{
  const len = new Lenis()
})


  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <FeatureSection />
      <Footer/>
    </main>
  );
}