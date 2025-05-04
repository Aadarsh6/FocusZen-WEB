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


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FocusSetup = () => {
//   const navigate = useNavigate();
//   const [url, setUrl] = useState(["http://localhost:5173/focus", "", "" ]);
//   // const [blockWebsite, setBlockWebsite] = useState(["", ""]);
//   const [time, setTime] = useState(25);
//   const [error, setError] = useState("");

//   const handleUrl = (index, value) => {
//     const newUrl = [...url]; // clone the array  The ... (spread operator) creates a shallow copy of the array. Now you're safe to modify it without touching the original state.
//     newUrl[index] = value; //This line is updating one item inside an array.  "In the array url, go to position index, and replace what's there with value."
//     setUrl(newUrl);
//   };
//   // const handleBlockUrl = (index, value) => {
//   //   const updated = [...blockWebsite];
//   //   updated[index] = value;

//   //   setBlockWebsite(updated);
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!url[0]) {
//       setError("Enter At Least 1 URL");
//       return;
//     }
//     if (!time || time <= 0) {
//       setError("Set the timer for 1 minute or more");
//       setTime(1);
//       return;
//     }

//     const focusTime = parseInt(time);
//     const startTime = Date.now();
//     const endTime = startTime + focusTime * 60 * 1000;

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
//     localStorage.setItem("Focus.time", focusTime);
//     localStorage.setItem("Focus.StartTime", startTime);
//     localStorage.setItem("Focus.EndTime", endTime);

//     // console.log("navigate to focus");
//     navigate("/focus");
//   };

//   const timeOptions = [10, 25, 30, 45, 60, 90, 120];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center p-4">
//       <form
//       onSubmit={handleSubmit}
//       >
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Setup Focus Session</h1>
        
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-lg font-semibold text-purple-200 mb-3">Allowed Websites</h2>
//             <p className="text-sm text-purple-200 mb-3">Enter the websites you'll be using during your focus session</p>
            
//           <div className="space-y-3">
//               {url.map((siteUrl, index) => (
//                 <div key={index} className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                     </svg>
//                   </div>
//                   <input
//                     className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-purple-300 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
//                     type="text"
//                     placeholder={`Website ${index + 1} (e.g., example.com)`}
//                     value={siteUrl}
//                     onChange={(e) => handleUrl(index, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <h2 className="text-lg font-semibold text-purple-200 mb-3">Session Duration</h2>
//             <p className="text-sm text-purple-200 mb-3">How long do you want to focus?</p>
            
//             <div className="space-y-3">
//               <div className="flex gap-2 flex-wrap">
//                 {timeOptions.map((option) => (
//                   <button
//                     key={option}
//                     type="button"
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       time === option
//                         ? "bg-purple-600 text-white"
//                         : "bg-white/10 text-purple-200 hover:bg-white/20"
//                     }`}
//                     onClick={() => setTime(option)}
//                   >
//                     {option} min
//                   </button>
//                 ))}
//               </div>
              
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-purple-300 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
//                   type="number"
//                   placeholder="Custom time in minutes"
//                   value={time}
//                   min="1"
//                   onChange={(e) => setTime(Number(e.target.value))}
//                 />
//               </div>
//             </div>
//           </div>
          
//           {error && (
//             <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}
          
//           <button
//             type="submit"
//             // onClick={handleSubmit}
//             className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//           >
//             Start Focus Session
//           </button>
//         </div>
//       </div>
//       </form>
//     </div>
//   );
// };

// export default FocusSetup;



//v2.2

import { useState } from "react";
import { Clock, Link, X, Plus, Brain, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Component/NavBar";

const FocusSetup = () => {
  const navigate = useNavigate()
  const [urls, setUrls] = useState(["", "", ""]);
  const [time, setTime] = useState(10);
  const [error, setError] = useState("");
  const [customTimeActive, setCustomTimeActive] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(""); // default, nature, sunset, ocean

  const handleUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty URLs
    const hiddenUrl = ["https://focuszen.vercel.app/", "http://localhost:5173/focus"]

    const validUserUrls = urls.filter(Boolean);
    const validUrls = [...validUserUrls, ...hiddenUrl]
    
    if (validUrls.length === 2) {
      setError("Enter at least 1 website URL");
      return;
    }
    
    if (!time || time <= 0) {
      setError("Set the timer for 1 minute or more");
      setTime(1);
      return;
    }

    const focusTime = parseInt(time);
    const startTime = Date.now();
    const endTime = startTime + focusTime * 60 * 1000;

    localStorage.setItem("Focus.url", JSON.stringify(validUrls));
    localStorage.setItem("Focus.time", focusTime);
    localStorage.setItem("Focus.StartTime", startTime);
    localStorage.setItem("Focus.EndTime", endTime);
    // localStorage.setItem("Focus.theme", theme);

    // console.log("Starting focus session...");
    navigate("/focus")
  };

  const timeOptions = [10, 25, 30, 45, 60, 90, 120];

  const themes = [
    { id: "default", name: "Nature Calm", class: "from-emerald-700 to-teal-900" },
    { id: "sunset", name: "Sunset", class: "from-orange-600 to-rose-800" },
    { id: "ocean", name: "Ocean", class: "from-blue-700 to-cyan-900" },
    { id: "nature", name: "Deep Focus", class: "from-indigo-800 to-purple-900" },
  ];

  const getThemeClasses = () => {
    const selectedTheme = themes.find(t => t.id === theme);
    return selectedTheme ? selectedTheme.class : themes[0].class;
  };

  return (
    <div>
      <NavBar/>
    <div className={`min-h-screen pt-24 bg-gradient-to-br ${getThemeClasses()} transition-colors duration-500 flex items-center justify-center p-2`}>
        {/* <div className="flex justify-start mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-3 shadow-lg">
            <Brain size={20} className="text-white" />
          </div>
        </div> */}
      <div className="w-full max-w-lg">
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Theme Selector */}
          <div className="px-8 pt-8 pb-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Focus Session</h1>
            
            <div className="relative">
              <button 
                type="button"
                className="bg-white/20 hover:bg-white/40 transition text-white text-sm py-2 px-3 rounded-lg flex items-center space-x-2"
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              >
                <span>Theme</span>
                <ChevronDown size={16} />
              </button>
              
              {isTimeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-lg shadow-xl z-10 overflow-hidden">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className={`w-full text-left px-4 py-3 text-gray-700 font-semibold hover:bg-black/30 rounded-md transition flex items-center space-x-2 ${theme === t.id ? 'bg-white/20' : ''}`}
                      onClick={() => {
                        setTheme(t.id);
                        setIsTimeDropdownOpen(false);
                      }}
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${t.class}`}></div>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <p className="px-8 text-white/70 text-sm pb-6">
            Configure the websites you'll allow yourself to visit during your focus time
          </p>
          
          <div className="px-8 space-y-6">
            {/* Allowed Websites Section */}
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center mb-3">
                <Link size={18} className="mr-2 opacity-80" />
                Allowed Websites
              </h2>
              
              <div className="space-y-3">
                {urls.map((url, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative flex-grow">
                      <input
                        className="w-full pl-4 pr-10 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30"
                        type="text"
                        placeholder={`Website ${index + 1} (e.g., example.com)`}
                        value={url}
                        onChange={(e) => handleUrl(index, e.target.value)}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeUrlField(index)}
                      className="ml-2 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={()=>{
                    if(urls.length >= 3){
                      setError("Can not add more website in this free version" )
                        console.log("kh");
                    }else{
                      setError("")
                      addUrlField()
                    }
                  }}
                  className="flex items-center text-white/70 hover:text-white text-sm py-2 transition-all"
                >
                  <Plus size={18} className="mr-1" />
                  Add website
                </button>
              </div>
            </div>
            
            {/* Duration Section */}
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center mb-3">
                <Clock size={18} className="mr-2 opacity-80" />
                Session Duration
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                        time === option && !customTimeActive
                          ? "bg-white text-purple-900 shadow-xl transform scale-110 duration-600"
                          : "bg-white/10 text-white hover:bg-white/30"
                      }`}
                      onClick={() => {
                        setTime(option);
                        setCustomTimeActive(false);
                      }}
                    >
                      {option} min
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    className={`w-full pl-4 pr-16 py-3 bg-white/10 text-white rounded-lg border ${
                      customTimeActive ? "border-white" : "border-white/20"
                    } focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30`}
                    type="number"
                    placeholder="Custom time in minutes"
                    value={time}
                    min="1"
                    onChange={(e) => {
                      setTime(Number(e.target.value));
                      setCustomTimeActive(true);
                    }}
                    onFocus={() => setCustomTimeActive(true)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                    minutes
                  </div>
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-white px-4 py-2 rounded-lg flex items-center">
                <X
                role="button"
                aria-label="Dismiss error"
                onClick={()=>setError("")} 
                size={15} className="mr-1 cursor-pointer flex items-center hover:bg-black/10 hover:rounded-md flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-8 py-6 mt-6 bg-black/20">
            <button
              onClick={handleSubmit}
              className="w-full bg-white hover:bg-opacity-90 text-purple-900 font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center"
            >
              <Brain size={20} className="mr-2" />
              Start Focus Session
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4 text-white/50 text-sm">
          Design your perfect focus environment
        </div>
      </div>
    </div>
    </div>
  );
};

export default FocusSetup;