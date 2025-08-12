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
    });

    useEffect(()=>{
        const savedUrl = localStorage.getItem("Focus.url");
        const savedTime = localStorage.getItem("Focus.time");
        const savedStartTime = localStorage.getItem("Focus.StartTime");
        const savedEndTime = localStorage.getItem("Focus.EndTime");

        console.log("🔍 Checking localStorage:", { savedUrl, savedTime, savedStartTime, savedEndTime });

        if(savedUrl && savedTime && savedStartTime && savedEndTime){
            const newState = {
                isConfigured: true,
                isActive: Date.now() < parseInt(savedEndTime),
                isComplete: Date.now() >= parseInt(savedEndTime),
                urls: JSON.parse(savedUrl),
                duration: parseInt(savedTime),
                startTime: parseInt(savedStartTime),
                endTime: parseInt(savedEndTime)
            };
            
            console.log("✅ Setting session state:", newState);
            setSessionState(newState);
        }
    },[])

    const startSession = (urls, duration, callback) => {
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
        
        console.log("🚀 Starting session:", newState);
        
        // Save to localStorage first
        localStorage.setItem("Focus.url", JSON.stringify(urls));
        localStorage.setItem("Focus.time", duration.toString());
        localStorage.setItem("Focus.StartTime", startTime.toString());
        localStorage.setItem("Focus.EndTime", endTime.toString());
        
        // Update state
        setSessionState(newState);
        
        // Call callback if provided (for navigation)
        if (callback) {
            setTimeout(() => callback(), 50);
        }
    }

    const completeSession = () => {
        setSessionState(prev => ({
            ...prev,
            isActive: false,
            isComplete: true
        }));
         // Clear localStorage to prevent issues
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("Focus.EndTime");
    };

    const resetSession = () => {
        setSessionState({
            isConfigured: false,
            isActive: false,
            isComplete: false, // Fixed: was "isCompleted"
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
        >
            {children}
        </FocusSessionContext.Provider>
    )
};

export const useFocusSession = () => {
    const context = useContext(FocusSessionContext)
    if(!context){
        throw new Error('useFocusSession must be used within a FocusSessionProvider')
    }
    return context;
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
                console.log("🛡️ Route guard check:", { condition, result, hasAccess });
                setHasAccess(result)
            } catch (error) {
                console.log("❌ Route guard failed", error)
                setHasAccess(false)
            }finally{
                setIsChecking(false)
            }
        }
        checkAccess()
    }, [condition]) // This will re-run when condition changes

    console.log("🔍 RouteGuard render:", { isChecking, hasAccess, condition });

    if(isChecking && loading) return loading;
    
    if(!hasAccess){
        console.log("🚫 Route guard blocking access, redirecting to:", fallback);
        return <Navigate to={fallback} replace/>
    }
    return children;
};

export const RequiredActiveSession = ({children, fallback="/focusMode"}) => {
    const { isActive } = useFocusSession()
    console.log("🔒 RequiredActiveSession check:", { isActive });
    
    return(
        <RouteGuard
            condition={isActive}
            fallback={fallback}
            loading={<div>Checking session...</div>}
        >
            {children}
        </RouteGuard>
    )
}

export const RequiredCompleteSession = ({children, fallback="/focusMode"}) => {
    const { isComplete } = useFocusSession()
    console.log("🏁 RequiredCompleteSession check:", { isComplete });

    return (
        <RouteGuard
            condition={isComplete}
            fallback={fallback}
        >
            {children}
        </RouteGuard>
    )
}

export const RequiredConfigureSession = ({children, fallback = "/focusMode"}) => {
    const { isConfigured } = useFocusSession() // Fixed: was missing destructuring
    console.log("⚙️ RequiredConfigureSession check:", { isConfigured });
    
    return(
        <RouteGuard
            condition={isConfigured}
            fallback={fallback}
        >
            {children}
        </RouteGuard>
    )
}