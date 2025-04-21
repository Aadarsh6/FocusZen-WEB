import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <NavLink to="/">
          <h1 className="text-4xl font-extrabold text-white">FocusZen</h1>
        </NavLink>

        {/* Navigation Links */}
        <div className="space-x-8">
          <NavLink
            to="/"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/focusMode"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            FocusMode
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


// "use client"

// import Link from "next/link"
// import { Menu } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export default function NavBar() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="font-bold text-xl">
//             Focus
//           </Link>
//         </div>

//         <nav className="hidden md:flex items-center gap-6">
//           <Link href="/" className="text-sm font-medium hover:text-primary">
//             Home
//           </Link>
//           <Link href="/focus" className="text-sm font-medium hover:text-primary">
//             Focus Timer
//           </Link>
//           <Link href="/about" className="text-sm font-medium hover:text-primary">
//             About
//           </Link>
//           <Link href="/contact" className="text-sm font-medium hover:text-primary">
//             Contact
//           </Link>
//         </nav>

//         <div className="flex items-center gap-4">
//           <Button variant="outline" size="sm" asChild className="hidden md:flex">
//             <Link href="/login">Log in</Link>
//           </Button>
//           <Button size="sm" asChild className="hidden md:flex">
//             <Link href="/signup">Sign up</Link>
//           </Button>

//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <nav className="flex flex-col gap-4 mt-8">
//                 <Link href="/" className="text-base font-medium hover:text-primary">
//                   Home
//                 </Link>
//                 <Link href="/focus" className="text-base font-medium hover:text-primary">
//                   Focus Timer
//                 </Link>
//                 <Link href="/about" className="text-base font-medium hover:text-primary">
//                   About
//                 </Link>
//                 <Link href="/contact" className="text-base font-medium hover:text-primary">
//                   Contact
//                 </Link>
//                 <div className="flex flex-col gap-2 mt-4">
//                   <Button variant="outline" asChild>
//                     <Link href="/login">Log in</Link>
//                   </Button>
//                   <Button asChild>
//                     <Link href="/signup">Sign up</Link>
//                   </Button>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }
