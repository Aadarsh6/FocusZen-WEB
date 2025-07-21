import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import React from 'react'

export const FeatureSection = () => {
  const content = [
    {
      title: "Focus Timer",
      description: "A customizable Pomodoro timer to help you stay focused and productive. Set your work intervals and break times to match your workflow.",
      content: (
        <div className="h-screen w-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-2">25:00</div>
            <div className="text-lg">Focus Time</div>
          </div>
        </div>
      ),
    },
    {
      title: "Task Management",
      description: "Organize your tasks efficiently with our intuitive task management system. Track progress and stay organized throughout your day.",
      content: (
        <div className="h-screen w-full bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="space-y-2">
              <div className="bg-white/20 p-2 rounded">Task 1 ✓</div>
              <div className="bg-white/20 p-2 rounded">Task 2 ✓</div>
              <div className="bg-white/20 p-2 rounded">Task 3 ⏳</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Progress Tracking",
      description: "Monitor your productivity with detailed analytics and insights. See how your focus sessions improve over time.",
      content: (
        <div className="h-screen w-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-2xl font-bold mb-2">📊</div>
            <div className="text-lg">Daily Progress</div>
            <div className="text-sm mt-2">8/10 sessions completed</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='h-screen w-full bg-[#0a0a0a]'>
      <StickyScroll content={content} />
    </div>
  )
}
