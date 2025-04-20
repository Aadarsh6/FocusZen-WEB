import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FocusSetup = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(["", "", ""]);
  // const [blockWebsite, setBlockWebsite] = useState(["", ""]);
  const [time, setTime] = useState(25);
  const [error, setError] = useState("");

  const handleUrl = (index, value) => {
    const newUrl = [...url]; // clone the array  The ... (spread operator) creates a shallow copy of the array. Now you’re safe to modify it without touching the original state.
    newUrl[index] = value; //This line is updating one item inside an array.  "In the array url, go to position index, and replace what's there with value."
    setUrl(newUrl);
  };
  // const handleBlockUrl = (index, value) => {
  //   const updated = [...blockWebsite];
  //   updated[index] = value;

  //   setBlockWebsite(updated);
  // };

  const handleSubmit = () => {
    if (!url[0]) {
      setError("Enter At Lest 1 URL");
      return;
    }
    if (!time || time <= 0) {
      setError("Set the timer for 1 minutes or");
      return;
    }

    const focusTime = parseInt(time)
    const startTime = Date.now()
    const endTime = startTime + focusTime * 60 * 1000

    localStorage.setItem(
      "Focus.url",
      JSON.stringify(url.filter(Boolean))
    ); /* url is presumably an array (e.g., ["http://example.com", "", "http://test.com"]).
    .filter(Boolean):
    This is using the .filter() array method.
    .filter(Boolean) is a trick that filters out falsy values from the array.
    Boolean is a function that converts a value to its truthy or falsy equivalent.  
    Falsy values in JavaScript are:  
    false, 0, "" (empty string), null, undefined, and NaN. 
    So, url.filter(Boolean) will remove any empty strings or null values from the array. */
    localStorage.setItem("Focus.time", focusTime);
    localStorage.setItem("Focus.StartTime", startTime);
    localStorage.setItem("Focus.EndTime", endTime);

    
    // console.log("navigate to focus");

    navigate("/focus");
  };

  return (
    <div className="w-full h-screen bg-slate-300/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 justify-center bg-slate-600/20 rounded-xl shadow-xl px-20 py-12">
      <h2 className="text-xl font-semibold text-white">Allowed Websites</h2>
        {url.map((url, index) => (
          <input
            className="rounded p-0.5 bg-slate-200/90 outline-none"
            type="text"
            key={index}
            placeholder={`Enter URL ${index + 1}`}
            value={url}
            onChange={(e) => handleUrl(index, e.target.value)}
          />
        ))}

      

        <input
          className="rounded p-0.5 bg-slate-200/90 outline-none text-gray-900"
          type="number"
          placeholder="Minutes"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />

        {error && <p className="text-gray-600 font-semibold">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-slate-800/30 hover:bg-slate-700/50 px-5 py-2 rounded-xl text-white font-bold transition duration-200 hover:scale-105
      "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FocusSetup;
