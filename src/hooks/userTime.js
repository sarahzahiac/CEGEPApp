import { useState, useEffect, useRef, useCallback } from "react";

export function userTime(){
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const start = (minutes) => {

        if (timeLeft > 0){
            setIsRunning(true);
            return;
        }
        setTimeLeft(minutes * 60);
        setIsRunning(true);
    }

    const pause = () => {
        setIsRunning(false);
    }

    const stop = () => {
        setIsRunning(false);
        setTimeLeft(0);
    }

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning])

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return { minutes, seconds, isRunning, start, pause, stop };
}