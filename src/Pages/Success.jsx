// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import ShootConfetti from "../Component/UI/ShootConfettie";
// // import ShootConfetti from "../Component/UI/ShootConfettie";

// const Success = () => {

//   useEffect(()=>{
//     localStorage.removeItem("Focus.url")
//     localStorage.removeItem("Focus.time")
//     localStorage.removeItem("Focus.EndTime");
//     localStorage.removeItem("Focus.StartTime");
//     localStorage.removeItem("timeLeft");

//   },[])

//   useEffect(()=>{
//     try{
//     ShootConfetti()
//   }catch(e){
//     console.log("erroe E", e)
//   }
// },[])  

// return (
//   <div className="h-screen flex flex-col justify-center items-center gap-8 bg-green-50">
   
//     <h1 className="text-6xl font-extrabold text-green-800">
//       🎉 Congratulations!
//     </h1>


//     <p className="text-xl text-gray-600 text-center max-w-lg">
//       You've stayed focused till the end! Keep up the great work.
//     </p>


//     <Link 
//       to="/" 
//       className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-125 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
//     >
//       Go Back Home
//     </Link>
//   </div>
// );
// };


// export default Success;



//v2.1 UI/UX responsive too


import { useEffect } from "react";
import { Link } from "react-router-dom";
import ShootConfetti from "../Component/UI/ShootConfettie";

const Success = () => {
  // Clear all localStorage items on component mount
  useEffect(() => {
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.EndTime");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("timeLeft");
  }, []);

  // Trigger confetti with error handling
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      try {
        ShootConfetti();
      } catch (error) {
        console.error("Failed to shoot confetti:", error);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-600 via-red-500 to-orange-400 px-6 sm:px-10 md:px-16 py-12 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Success icon with animation */}
      <div className="mb-6 animate-bounce">
        <span className="text-6xl sm:text-7xl">🎉</span>
      </div>
      
      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg mb-6 animate-fadeIn">
        Congratulations!
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-white text-center max-w-lg mb-10 leading-relaxed animate-fadeIn animation-delay-300">
        You've stayed focused until the end! 
        <span className="block mt-2">
          Keep up the great work. Your consistency will lead to even greater achievements.
        </span>
      </p>
      
      {/* Stats summary (optional) */}
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-4 rounded-lg mb-10 w-full max-w-md animate-fadeIn animation-delay-600">
        <p className="text-white text-center">
          You've completed your focus session successfully!
        </p>
      </div>
      
      {/* Back to Home Button */}
      <Link
        to="/"
        className="group bg-white text-red-600 font-bold px-8 py-3 rounded-full shadow-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300 animate-fadeIn animation-delay-900"
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:mr-3 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default Success;