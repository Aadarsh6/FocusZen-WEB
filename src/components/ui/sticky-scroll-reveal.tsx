"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const StickyScroll = ({
  content,
}: {
  content: { title: string; description: string; content?: React.ReactNode }[];
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const { scrollYProgress } = useScroll(); // Use page scroll instead of a ref

  // Calculate active section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / (content.length - 1));
    const closestIndex = breakpoints.reduce(
      (acc, point, i) =>
        Math.abs(latest - point) < Math.abs(latest - breakpoints[acc])
          ? i
          : acc,
      0
    );
    setActiveCard(closestIndex);
  });

  return (
    <section className="relative w-full min-h-screen bg-black text-white py-6">
      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-2 px-6">
        {/* Left Text Content */}
        <div className="flex-1 space-y-28">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: activeCard === index ? 1 : 0.4, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                {item.title}
              </h2>
              <p className="text-md md:text-lg text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Sticky Visual */}
        <div className="lg:block w-1/2 sticky top-32 h-[400px] flex items-center justify-center">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full rounded-2xl overflow-hidden"
          >
            {content[activeCard]?.content ?? null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
