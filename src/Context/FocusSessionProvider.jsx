import { createContext, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

const FocusSessionContext = createContext()

export const FocusSessionProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState({
        status: 'idle', // 'idle' | 'active' | 'paused' | 'complete'
        urls: [],
        duration: 0,
        timeRemaining: 0,
        startTime: null,
        endTime: null
    });

    const [isLoading, setIsLoading] = useState(true);

    // Initialize session state from localStorage
    useEffect(() => {
        const savedUrl = localStorage.getItem("Focus.url");
        const savedTime = localStorage.getItem("Focus.time");
        const savedStartTime = localStorage.getItem("Focus.StartTime");
        const savedEndTime = localStorage.getItem("Focus.EndTime");

        console.log("🔍 Initializing from localStorage:", { savedUrl, savedTime, savedStartTime, savedEndTime });

        if (savedUrl && savedTime && savedStartTime && savedEndTime) {
            const now = Date.now();
            const endTime = parseInt(savedEndTime);
            const startTime = parseInt(savedStartTime);
            
            let status = 'idle';
            if (now < endTime) {
                status = 'active';
            } else {
                status = 'complete';
            }

            const newState = {
                status,
                urls: JSON.parse(savedUrl),
                duration: parseInt(savedTime),
                timeRemaining: Math.max(0, endTime - now),
                startTime,
                endTime
            };
            
            console.log("✅ Session state initialized:", newState);
            setSessionState(newState);
        }
        
        setIsLoading(false);
    }, []);

    const startSession = (urls, duration) => {
        const startTime = Date.now();
        const endTime = Date.now() + duration * 60 * 1000;

        const newState = {
            status: 'active',
            urls,
            duration,
            timeRemaining: duration * 60,
            startTime,
            endTime
        };
        
        console.log("🚀 Starting session:", newState);
        
        // Save to localStorage
        localStorage.setItem("Focus.url", JSON.stringify(urls));
        localStorage.setItem("Focus.time", duration.toString());
        localStorage.setItem("Focus.StartTime", startTime.toString());
        localStorage.setItem("Focus.EndTime", endTime.toString());
        
        // Update state
        setSessionState(newState);
    };

    const pauseSession = () => {
        setSessionState(prev => ({
            ...prev,
            status: 'paused'
        }));
    };

    const resumeSession = () => {
        setSessionState(prev => ({
            ...prev,
            status: 'active'
        }));
    };

    const completeSession = () => {
        console.log("🏁 Completing session");
        
        setSessionState(prev => ({
            ...prev,
            status: 'complete',
            timeRemaining: 0
        }));
        
        // Clear localStorage after state update
        setTimeout(() => {
            localStorage.removeItem("Focus.url");
            localStorage.removeItem("Focus.time");
            localStorage.removeItem("Focus.StartTime");
            localStorage.removeItem("Focus.EndTime");
            localStorage.removeItem("timeLeft");
        }, 100);
    };

    const resetSession = () => {
        console.log("🔄 Resetting session");
        
        setSessionState({
            status: 'idle',
            urls: [],
            duration: 0,
            timeRemaining: 0,
            startTime: null,
            endTime: null
        });

        // Clear localStorage
        localStorage.removeItem("Focus.url");
        localStorage.removeItem("Focus.time");
        localStorage.removeItem("Focus.StartTime");
        localStorage.removeItem("Focus.EndTime");
        localStorage.removeItem("timeLeft");
    };

    return (
        <FocusSessionContext.Provider
            value={{
                ...sessionState,
                isLoading,
                startSession,
                pauseSession,
                resumeSession,
                completeSession,
                resetSession
            }}
        >
            {children}
        </FocusSessionContext.Provider>
    );
};

export const useFocusSession = () => {
    const context = useContext(FocusSessionContext);
    if (!context) {
        throw new Error('useFocusSession must be used within a FocusSessionProvider');
    }
    return context;
};

// Simplified Route Guards
const ProtectedRoute = ({ children, allowedStatuses, fallback = "/focusMode", loadingText = "Loading..." }) => {
    const { status, isLoading } = useFocusSession();
    
    console.log(`🛡️ ProtectedRoute check:`, { status, allowedStatuses, isLoading });
    
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-[#0a0a0a]">{loadingText}</div>;
    }
    
    // Special case: if session is complete, redirect to success
    console.log(allowedStatuses);
    
    if (status === 'complete' && allowedStatuses.includes('complete') && location.pathname !== "/success") {
        console.log("🏁 Redirecting to success page");
        return <Navigate to="/success"/>;
    }
    
    if (!allowedStatuses.includes(status)) {
        console.log(`🚫 Access denied. Status: ${status}, Allowed: ${allowedStatuses}`);
        return <Navigate to={fallback} replace />;
    }
    
    return children;
};

// Specific route guards
export const RequireActiveSession = ({ children, fallback = "/focusMode" }) => (
    <ProtectedRoute 
        allowedStatuses={['active', 'paused']} 
        fallback={fallback}
        loadingText="Checking session..."
    >
        {children}
    </ProtectedRoute>
);

export const RequireCompleteSession = ({ children, fallback = "/focusMode" }) => (
    <ProtectedRoute 
        allowedStatuses={['complete']} 
        fallback={fallback}
        loadingText="Verifying completion..."
    >
        {children}
    </ProtectedRoute>
);

export const RequireConfiguredSession = ({ children, fallback = "/focusMode" }) => (
    <ProtectedRoute 
        allowedStatuses={['active', 'paused', 'complete']} 
        fallback={fallback}
        loadingText="Loading focus session..."
    >
        {children}
    </ProtectedRoute>
);