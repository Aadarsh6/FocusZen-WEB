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
