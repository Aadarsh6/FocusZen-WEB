// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FocusSetup = () => {
//   const navigate = useNavigate();
//   const [url, setUrl] = useState(["", "", ""]);
//   // const [blockWebsite, setBlockWebsite] = useState(["", ""]);
//   const [time, setTime] = useState(25);
//   const [error, setError] = useState("");

//   const handleUrl = (index, value) => {
//     const newUrl = [...url]; // clone the array  The ... (spread operator) creates a shallow copy of the array. Now you’re safe to modify it without touching the original state.
//     newUrl[index] = value; //This line is updating one item inside an array.  "In the array url, go to position index, and replace what's there with value."
//     setUrl(newUrl);
//   };
//   // const handleBlockUrl = (index, value) => {
//   //   const updated = [...blockWebsite];
//   //   updated[index] = value;

//   //   setBlockWebsite(updated);
//   // };

//   const handleSubmit = () => {
//     if (!url[0]) {
//       setError("Enter At Lest 1 URL");
//       return;
//     }
//     if (!time || time <= 0) {
//       setError("Set the timer for 1 minutes or");
//       return;
//     }

//     const focusTime = parseInt(time)
//     const startTime = Date.now()
//     const endTime = startTime + focusTime * 60 * 1000

//     localStorage.setItem(
//       "Focus.url",
//       JSON.stringify(url.filter(Boolean))
//     ); /* url is presumably an array (e.g., ["http://example.com", "", "http://test.com"]).
//     .filter(Boolean):
//     This is using the .filter() array method.
//     .filter(Boolean) is a trick that filters out falsy values from the array.
//     Boolean is a function that converts a value to its truthy or falsy equivalent.  
//     Falsy values in JavaScript are:  
//     false, 0, "" (empty string), null, undefined, and NaN. 
//     So, url.filter(Boolean) will remove any empty strings or null values from the array. */

//     // When focus starts (in your setup or submit function)

//     localStorage.setItem("Focus.time", focusTime );
//     localStorage.setItem("Focus.StartTime", startTime);
//     localStorage.setItem("Focus.EndTime", endTime);

//     // console.log("navigate to focus");

//     navigate("/focus");
//   };

//   return (
//     <div className="w-full h-screen bg-slate-300/80 flex items-center justify-center">
//       <div className="flex flex-col items-center gap-4 justify-center bg-slate-600/20 rounded-xl shadow-xl px-20 py-12">
//       <h2 className="text-xl font-semibold text-white">Allowed Websites</h2>
//         {url.map((url, index) => (
//           <input
//             className="rounded p-0.5 bg-slate-200/90 outline-none"
//             type="text"
//             key={index}
//             placeholder={Enter URL ${index + 1}}
//             value={url}
//             onChange={(e) => handleUrl(index, e.target.value)}
//           />
//         ))}

//         <input
//           className="rounded p-0.5 bg-slate-200/90 outline-none text-gray-900"
//           type="number"
//           placeholder="Minutes"
//           value={time}
//           onChange={(e) => setTime(Number(e.target.value))}
//         />

//         {error && <p className="text-gray-600 font-semibold">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="bg-slate-800/30 hover:bg-slate-700/50 px-5 py-2 rounded-xl text-white font-bold transition duration-200 hover:scale-105
//       "
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FocusSetup;


//v2.1 UI/UX responsive too


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FocusSetup = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(["", "", ""]);
  // const [blockWebsite, setBlockWebsite] = useState(["", ""]);
  const [time, setTime] = useState(25);
  const [error, setError] = useState("");

  const handleUrl = (index, value) => {
    const newUrl = [...url]; // clone the array  The ... (spread operator) creates a shallow copy of the array. Now you're safe to modify it without touching the original state.
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
      setError("Enter At Least 1 URL");
      return;
    }
    if (!time || time <= 0) {
      setError("Set the timer for 1 minute or more");
      return;
    }

    const focusTime = parseInt(time);
    const startTime = Date.now();
    const endTime = startTime + focusTime * 60 * 1000;

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

    // When focus starts (in your setup or submit function)
    localStorage.setItem("Focus.time", focusTime);
    localStorage.setItem("Focus.StartTime", startTime);
    localStorage.setItem("Focus.EndTime", endTime);

    // console.log("navigate to focus");
    navigate("/focus");
  };

  const timeOptions = [10, 25, 30, 45, 60, 90, 120];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Setup Focus Session</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-purple-200 mb-3">Allowed Websites</h2>
            <p className="text-sm text-purple-200 mb-3">Enter the websites you'll be using during your focus session</p>
            
            <div className="space-y-3">
              {url.map((siteUrl, index) => (
                <div key={index} className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-purple-300 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    type="text"
                    placeholder={`Website ${index + 1} (e.g., example.com)`}
                    value={siteUrl}
                    onChange={(e) => handleUrl(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-purple-200 mb-3">Session Duration</h2>
            <p className="text-sm text-purple-200 mb-3">How long do you want to focus?</p>
            
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {timeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      time === option
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-purple-200 hover:bg-white/20"
                    }`}
                    onClick={() => setTime(option)}
                  >
                    {option} min
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-purple-300 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  type="number"
                  placeholder="Custom time in minutes"
                  value={time}
                  min="1"
                  onChange={(e) => setTime(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Start Focus Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusSetup;