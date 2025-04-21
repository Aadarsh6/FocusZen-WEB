import { useEffect } from "react";
import { Link } from "react-router-dom";
import ShootConfetti from "../Component/UI/ShootConfettie";
// import ShootConfetti from "../Component/UI/ShootConfettie";

const Success = () => {

  useEffect(()=>{
    localStorage.removeItem("Focus.url")
    localStorage.removeItem("Focus.time")
  },[])

  useEffect(()=>{
    try{
    ShootConfetti()
  }catch(e){
    console.log("erroe E", e)
  }
},[])  

return (
  <div className="h-screen flex flex-col justify-center items-center gap-8 bg-green-50">
   
    <h1 className="text-6xl font-extrabold text-green-800">
      🎉 Congratulations!
    </h1>


    <p className="text-xl text-gray-600 text-center max-w-lg">
      You've stayed focused till the end! Keep up the great work.
    </p>


    <Link 
      to="/" 
      className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-125 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Go Back Home
    </Link>
  </div>
);
};


export default Success;



