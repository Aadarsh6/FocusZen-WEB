// import { Link } from "react-router-dom";
// import NavBar from "../Component/NavBar";
// import { useEffect } from "react";

// const Home = () => {

//    useEffect(()=>{
//       localStorage.removeItem("Focus.url")
//       localStorage.removeItem("Focus.time")
//     },[])
  

//   return (
//     <>
//       <NavBar />
//       <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#f3e5f5] via-[#d1c4e9] to-[#f8bbd0] text-gray-800">
//         <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
//           Welcome to FocusZen
//         </h1>
//         <p className="text-lg text-gray-700 font-light max-w-lg text-center mb-8">
//           Focus on what matters and achieve your goals with ease. Begin your journey with FocusZen now!
//         </p>
//         <Link 
//           to="/focusMode" 
//           className="bg-gradient-to-r from-[#8e24aa] to-[#ff4081] px-8 py-4 text-2xl font-semibold text-white rounded-lg transform hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
//         >
//           Start Session
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Home;



//v2.1 UI/UX responsive too

import { Link } from "react-router-dom";
import NavBar from "../Component/NavBar";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.EndTime");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("timeLeft");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-10 py-12 w-full">
        <div className="w-full max-w-3xl text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to <span className="text-purple-600">FocusZen</span>
          </h1>
          
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Focus on what matters and achieve your goals with ease.
          </p>
          
          <div className="mt-8">
            <Link 
              to="/focusMode" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-lg"
            >
              Start Session
            </Link>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 w-full max-w-4xl px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimize Distractions</h3>
              <p className="text-gray-600">
                Block out noise and stay focused on the task at hand.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your focus sessions and see your productivity improve over time.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Achieve Goals</h3>
              <p className="text-gray-600">
                Turn your focus into achievements with consistent practice.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-gray-500">
        <p className="text-sm">© 2025 FocusZen. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;