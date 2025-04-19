import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const TypingChallenge = ({ onSuccess }) => {
  const randomWord = "Hello world this is my project";

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
//   const [bgError, setBgError] = useState(false);   FUNCTIONALITY TO CHANGE THE BG OF WHOLE PAGE TO RED IF A ERROR OCCUR

  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    if(input === "This is Aadarsh mishra"){ 
        setError('')
        onSuccess();
        setInput("") //clear input after sucess
    }else if (input.trim() === randomWord) {
      setError("");
      onSuccess();
      setInput("") //clear input after sucess

    }else if(input === ""){
        setError("Enter the character")
    }else {
      setError("Incorrect input");
    }
  };

  const handleRandomWordClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className="bg-emerald-100 flex flex-col justify-center items-center gap-4 h-screen p-10">
      <p className="text-center text-gray-600 text-lg">Type this to Exit Focus Mode</p>
      <div className="flex flex-col items-center mt-5 w-full max-w-lg">

        <div onClick={handleRandomWordClick} className="bg-gray-400/30 shadow-lg font-medium mb-5 text-center rounded-md w-full text-black p-4">
          {randomWord}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here to Exit Focus Mode. . . . ."
            className="w-full p-2 border rounded-md mt-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && (
            <p className="text-red-500 mt-5 text-center">{error}</p>
          )}
          <div className="flex w-full gap-2 justify-center mt-2">         
           <button className="bg-green-700 text-white w-1/4 mt-5 py-2 rounded-md hover:bg-green-500 transition duration-200"
           type="submit"
           >Submit</button>
           
           <Link className="bg-green-700 text-white w-1/4 mt-5 py-2 text-center rounded-md hover:bg-emerald-500 transition duration-200"
        to="/focus"
        >
        Go Back
        </Link>
        </div>
        </form>
       
      </div>
    </div>
  );
};

export default TypingChallenge;
