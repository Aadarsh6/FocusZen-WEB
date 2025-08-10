import { createContext, useContext, useEffect, useState } from "react"
import { isCookie } from "react-router-dom";


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
    const savedUrl = localStorage.setItem("Focus.url");
    const savedTime = localStorage.setItem("Focus.time");
    const savedStartTime = localStorage.setItem("Focus.StartTime");
    const savedEndTime = localStorage.setItem("Focus.EndTime");


    if(savedUrl && savedTime && savedStartTime && savedEndTime){
        setSessionState({
            isConfigured: true,
            isActive: Date.now() < parseInt(savedEndTime), //! This return true if current time is less than our end time of focus mode and vice versa
            isComplete: Date.now() >= parseInt(savedEndTime),
            urls: JSON.parse(savedUrl); //! as local storage oly save string
            duration: parseInt(savedTime),
            startTime: parseInt(savedStartTime),
            endTime: parseInt(savedEndTime)
        })
    }
    },[])

    const startSession = () => {
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
    }

}