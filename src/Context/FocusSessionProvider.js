import { createContext, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";


const FocusSessionContext = createContext()

export const FocusSessionProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState({
        isConfigured: false,
        isActive: false,
        isComplete: false,
        urls:[],
        duration: 0,
        startTime: null,
        endTime: null
    });;


    useEffect(()=>{

    const savedUrl = localStorage.setItem("Focus.url");
    const savedTime = localStorage.setItem("Focus.time");
    const savedStartTime = localStorage.setItem("Focus.StartTime");
    const savedEndTime = localStorage.setItem("Focus.EndTime");


    if(savedUrl && savedTime && savedStartTime && savedEndTime){
        setSessionState({
            isConfigured: true,
            isActive: Date.now() < parseInt(savedEndTime), //! This return true if current time is less than our end time of focus mode and versa
            isComplete: Date.now() >= parseInt(savedEndTime),
            urls: JSON.parse(savedUrl), //! as local storage only save string
            duration: parseInt(savedTime),
            startTime: parseInt(savedStartTime),
            endTime: parseInt(savedEndTime)
        })
    }
    },[])

    const startSession = (urls, duration) => {
        const startTime = Date.now();
        const endTime = Date.now() + duration * 60 * 1000;

        const newState = {
            isConfigured: true,
            isActive: true, 
            isComplete: false,
            urls,
            duration,
            startTime,
            endTime
        };
        setSessionState(newState)
          // Save to localStorage
    localStorage.setItem("Focus.url", JSON.stringify(urls));
    localStorage.setItem("Focus.time", duration.toString());
    localStorage.setItem("Focus.StartTime", startTime.toString());
    localStorage.setItem("Focus.EndTime", endTime.toString());
    }

    const completeSession = () => {
        setSessionState(prev => ({
            ...prev,
            isActive: false,
            isComplete: true
        }));
    };

      const resetSession = () => {
    setSessionState({
      isConfigured: false,
      isActive: false,
      isCompleted: false,
      urls: [],
      duration: 0,
      startTime: null,
      endTime: null
    });

       // Clear localStorage
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("Focus.EndTime");
}

return(
    <FocusSessionContext.Provider
    value={{
        ...sessionState,
        startSession,
        completeSession,
        resetSession
    }}
    >{children}</FocusSessionContext.Provider>
)
};

export const useFocusSession = () => {
    const context = useContext(useFocusSession);
    if(!context){
        throw new Error('useFocusSession must be used within a FocusSessionProvider')
    }
    return context
}



const RouteGuard = ({
    children,
    condition,
    fallback = "/",
    loading = null
}) => {
    const [isChecking, setIsChecking] = useState(true)
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(()=>{
        const checkAccess = async()=>{
            try {
                const result = typeof condition === 'function' ? await condition() : condition;
                setHasAccess(result)
            } catch (error) {
                console.log("Route guard failed", error)
                setHasAccess(false)
            }finally{
                setIsChecking(false)
            }
        }
        checkAccess()
    }, [condition])

    if(isChecking && loading) return loading;
    
    if(!hasAccess){
        return <Navigate to={fallback} replace/> //! The new route is pushed onto the history stack. If the user clicks the browser's Back button, they can go back to the protected route (which might be unwanted).
    }
    return children;
};


export const RequiredActiveSession = ({children, fallback="/focusMode"}) => {
    const { isActive } = useFocusSession()
    return(
        <RouteGuard
        condition = {isActive}
        fallback = {fallback}
        loading = {<div>Checking session...</div>}
        >
            {children}
        </RouteGuard>
    )
}

export const RequiredConfigureSession = ({children, fallback = "/focusMode"}) => {
    const isConfigured = useFocusSession()
    return(
        <RouteGuard
        condition = {isConfigured}
        fallback = {fallback}
        >
            {children}
        </RouteGuard>
    )
}