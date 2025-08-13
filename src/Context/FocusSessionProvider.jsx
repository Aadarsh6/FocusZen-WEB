import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { Navigate } from "react-router-dom";

const FocusSessionContext = createContext()

export const FocusSessionProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState({
        status: 'idle', // 'idle' | 'active' | 'paused' | 'complete'
        urls: [],
        duration: 0, // original duration in minutes
        timeRemaining: 0, // calculated time remaining in seconds
        startTime: null,
        endTime: null,
        pausedAt: null,
        totalPausedTime: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    // Calculate time remaining based on current time and session state
    const calculateTimeRemaining = useCallback((sessionData) => {
        if (!sessionData.startTime || !sessionData.endTime) return 0;
        
        const now = Date.now();
        
        // If session is paused, calculate time remaining as of pause time
        if (sessionData.status === 'paused' && sessionData.pausedAt) {
            const timeElapsedBeforePause = sessionData.pausedAt - sessionData.startTime - sessionData.totalPausedTime;
            const originalDurationMs = sessionData.duration * 60 * 1000;
            return Math.max(0, Math.floor((originalDurationMs - timeElapsedBeforePause) / 1000));
        }
        
        // For active sessions, calculate based on adjusted end time (accounting for pauses)
        const adjustedEndTime = sessionData.endTime + sessionData.totalPausedTime;
        const timeRemainingMs = Math.max(0, adjustedEndTime - now);
        return Math.floor(timeRemainingMs / 1000);
    }, []);

    // Update time remaining for active sessions
    useEffect(() => {
        let interval;
        
        if (sessionState.status === 'active' && sessionState.startTime && sessionState.endTime) {
            interval = setInterval(() => {
                setSessionState(prevState => {
                    const newTimeRemaining = calculateTimeRemaining(prevState);
                    
                    // Auto-complete if time is up
                    if (newTimeRemaining === 0 && prevState.status === 'active') {
                        console.log("⏰ Timer reached zero, auto-completing session");
                        // Don't call completeSession here to avoid recursion
                        // Just update the status, the useEffect below will handle completion
                        return {
                            ...prevState,
                            status: 'complete',
                            timeRemaining: 0
                        };
                    }
                    
                    return {
                        ...prevState,
                        timeRemaining: newTimeRemaining
                    };
                });
            }, 1000);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [sessionState.status, sessionState.startTime, sessionState.endTime, calculateTimeRemaining]);

    // Handle completion cleanup
    useEffect(() => {
        if (sessionState.status === 'complete') {
            console.log("🏁 Session completed, cleaning up localStorage");
            setTimeout(() => {
                localStorage.removeItem("Focus.sessionData");
            }, 100);
        }
    }, [sessionState.status]);

    // Initialize session state from localStorage
    useEffect(() => {
        try {
            const savedSessionData = localStorage.getItem("Focus.sessionData");
            
            if (savedSessionData) {
                const parsedData = JSON.parse(savedSessionData);
                console.log("🔍 Initializing from localStorage:", parsedData);
                
                const now = Date.now();
                const timeRemaining = calculateTimeRemaining(parsedData);
                
                let status = parsedData.status;
                
                // Determine current status based on time
                if (parsedData.status === 'active') {
                    if (timeRemaining <= 0) {
                        status = 'complete';
                    }
                } else if (parsedData.status === 'paused') {
                    // Keep paused status but update time remaining
                    status = 'paused';
                }
                
                const newState = {
                    ...parsedData,
                    status,
                    timeRemaining
                };
                
                console.log("✅ Session state initialized:", newState);
                setSessionState(newState);
            }
        } catch (error) {
            console.error("❌ Error loading session data:", error);
            localStorage.removeItem("Focus.sessionData");
        }
        
        setIsLoading(false);
    }, [calculateTimeRemaining]);

    // Save session state to localStorage whenever it changes (except during loading)
    useEffect(() => {
        if (!isLoading && sessionState.status !== 'idle') {
            try {
                localStorage.setItem("Focus.sessionData", JSON.stringify(sessionState));
                console.log("💾 Session state saved:", sessionState);
            } catch (error) {
                console.error("❌ Error saving session data:", error);
            }
        }
    }, [sessionState, isLoading]);

    const startSession = (urls, duration) => {
        const startTime = Date.now();
        const endTime = startTime + duration * 60 * 1000;

        const newState = {
            status: 'active',
            urls,
            duration,
            timeRemaining: duration * 60,
            startTime,
            endTime,
            pausedAt: null,
            totalPausedTime: 0
        };
        
        console.log("🚀 Starting session:", newState);
        setSessionState(newState);
    };

    const pauseSession = () => {
        setSessionState(prev => {
            if (prev.status !== 'active') return prev;
            
            const now = Date.now();
            console.log("⏸️ Pausing session at:", now);
            
            return {
                ...prev,
                status: 'paused',
                pausedAt: now
            };
        });
    };

    const resumeSession = () => {
        setSessionState(prev => {
            if (prev.status !== 'paused' || !prev.pausedAt) return prev;
            
            const now = Date.now();
            const pauseDuration = now - prev.pausedAt;
            const newTotalPausedTime = prev.totalPausedTime + pauseDuration;
            
            console.log("▶️ Resuming session. Pause duration:", pauseDuration, "ms");
            
            return {
                ...prev,
                status: 'active',
                pausedAt: null,
                totalPausedTime: newTotalPausedTime
            };
        });
    };

    const completeSession = () => {
        console.log("🏁 Manually completing session");
        
        setSessionState(prev => ({
            ...prev,
            status: 'complete',
            timeRemaining: 0
        }));
    };

    const resetSession = () => {
        console.log("🔄 Resetting session");
        
        setSessionState({
            status: 'idle',
            urls: [],
            duration: 0,
            timeRemaining: 0,
            startTime: null,
            endTime: null,
            pausedAt: null,
            totalPausedTime: 0
        });

        // Clear localStorage
        localStorage.removeItem("Focus.sessionData");
    };

    // Get formatted time remaining
    const getFormattedTimeRemaining = () => {
        const seconds = sessionState.timeRemaining;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
                resetSession,
                getFormattedTimeRemaining
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

// Improved Route Guards with better loading states
const ProtectedRoute = ({ children, allowedStatuses, fallback = "/focusMode", loadingText = "Loading..." }) => {
    const { status, isLoading } = useFocusSession();
    
    console.log(`🛡️ ProtectedRoute check:`, { status, allowedStatuses, isLoading });
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-[#0a0a0a]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4 mx-auto"></div>
                    <div>{loadingText}</div>
                </div>
            </div>
        );
    }
    
    // Handle completion redirect
    if (status === 'complete' && allowedStatuses.includes('complete') && window.location.pathname !== "/success") {
        console.log("🏁 Redirecting to success page");
        return <Navigate to="/success" replace />;
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