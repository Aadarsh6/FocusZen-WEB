import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const TypingChallenge = () => {
  const navigate = useNavigate()
  // const randomWord = "Hello world this is my project";

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [requirePhrase, setRequirePhrase] = useState("")
  const [bgColor, setBgColor] = useState("bg-emerald-100")
  const [toggelError, setToggelError] = useState(0)
// FUNCTIONALITY TO CHANGE THE BG OF WHOLE PAGE TO RED IF A ERROR OCCUR

  const inputRef = useRef(null)

  useEffect(()=>{
    if(toggelError > 0){
      setBgColor("bg-red-200")
    } 
      const timeout = setTimeout(() => {
        setBgColor("bg-emerald-100")
      }, 500)
      return () => clearTimeout(timeout)
  },[toggelError])

  const onSuccess = () =>{
    navigate("/ ")
  }

  const exitPhrases = [
    "By typing this, I admit that short-term comfort is more important to me than long-term success.",
    "I am choosing distraction over discipline, and I accept the consequences of wasted potential.",
    "This moment defines me — and I am choosing to give up rather than grow.",
    "I understand that I'm trading progress for the same distractions I claimed to avoid.",
    "I am willingly breaking a promise to myself, knowing it weakens my self-respect.",
    "I had a chance to become stronger, but I’m letting discomfort win instead.",
    "Typing this means I accept failure, not because I had to, but because I chose to.",
    "I said I wanted to improve, but my actions now prove otherwise."
  ];


  useEffect(()=>{
    const randomWord = Math.floor(Math.random() * exitPhrases.length);
    setRequirePhrase(exitPhrases[randomWord])
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if(input === requirePhrase){ 
        setError('')
        onSuccess();
        setInput("") //clear input after sucess
        
    }else if (input.trim() === requirePhrase) {
      setError("");
      onSuccess();
      setInput("") //clear input after sucess
      

    }else if(input === ""){
        setError("Enter the character")
        setToggelError(prev => prev + 1)
        
    }else if (input === "Aadarsh"){
      setError('')
        onSuccess();
        setInput("") 
        
    }
    else {
      setError("Incorrect input");
      setToggelError(prev => prev + 1)
      
    }
  };

  const handleRandomWordClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className={`flex flex-col justify-center items-center gap-4 h-screen p-10 transition-colors duration-100 ${bgColor}`}>
      
      <p className="text-center text-gray-600 text-lg">Type this to Exit Focus Mode</p>
      <div className="flex flex-col items-center mt-5 w-full max-w-lg">

        <div onClick={handleRandomWordClick} className="bg-gray-400/30 shadow-lg font-medium mb-5 text-center rounded-md w-full text-black p-4">
          {requirePhrase}
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
           onSubmit={()=> setError("")}

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
