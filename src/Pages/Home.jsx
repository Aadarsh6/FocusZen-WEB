import { Link } from "react-router-dom";
import NavBar from "../Component/NavBar";
import { useEffect } from "react";

const Home = () => {

   useEffect(()=>{
      localStorage.removeItem("Focus.url")
      localStorage.removeItem("Focus.time")
    },[])
  

  return (
    <>
      <NavBar />
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#f3e5f5] via-[#d1c4e9] to-[#f8bbd0] text-gray-800">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
          Welcome to FocusZen
        </h1>
        <p className="text-lg text-gray-700 font-light max-w-lg text-center mb-8">
          Focus on what matters and achieve your goals with ease. Begin your journey with FocusZen now!
        </p>
        <Link 
          to="/focusMode" 
          className="bg-gradient-to-r from-[#8e24aa] to-[#ff4081] px-8 py-4 text-2xl font-semibold text-white rounded-lg transform hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
        >
          Start Session
        </Link>
      </div>
    </>
  );
};

export default Home;


// "use client"

// import { useEffect } from "react"
// import Link from "next/link"
// import { ArrowRight, Clock, Layers, Target } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import NavBar from "@/components/NavBar"

// export default function Home() {
//   useEffect(() => {
//     localStorage.removeItem("Focus.url")
//     localStorage.removeItem("Focus.time")
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <NavBar />

//       <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
//         <div className="flex flex-col items-center text-center space-y-8 mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//             Stay <span className="text-primary">Focused</span> on What Matters
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
//             Eliminate distractions and boost your productivity with our powerful focus tools.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button size="lg" asChild>
//               <Link href="/focus">
//                 Get Started <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" asChild>
//               <Link href="/about">Learn More</Link>
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           <Card>
//             <CardHeader>
//               <Target className="h-8 w-8 text-primary mb-2" />
//               <CardTitle>Set Goals</CardTitle>
//               <CardDescription>Define what you want to accomplish</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">
//                 Create clear objectives and track your progress as you work toward achieving them.
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <Clock className="h-8 w-8 text-primary mb-2" />
//               <CardTitle>Manage Time</CardTitle>
//               <CardDescription>Make every minute count</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">
//                 Use our timer tools to implement techniques like Pomodoro and maximize your productivity.
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <Layers className="h-8 w-8 text-primary mb-2" />
//               <CardTitle>Build Habits</CardTitle>
//               <CardDescription>Develop consistent routines</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">
//                 Transform your focus sessions into lasting habits that drive long-term success.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       <footer className="border-t py-6 md:py-8">
//         <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Focus App. All rights reserved.</p>
//           <div className="flex gap-4 mt-4 md:mt-0">
//             <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
//               Privacy
//             </Link>
//             <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
//               Terms
//             </Link>
//             <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
