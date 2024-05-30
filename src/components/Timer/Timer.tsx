import { useEffect, useState } from "react";

interface ITimer {
  waitTimeSeconds: number;
  onTimerComplete: () => void;
}

export default function Timer({ waitTimeSeconds, onTimerComplete }: ITimer) {
  const [timerCounter, setTimeLeft] = useState(waitTimeSeconds);
  const timerSpeedInMiliseconds = 1000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, timerSpeedInMiliseconds);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timerCounter === 0) {
      onTimerComplete();
    }
  }, [timerCounter]);

  return <div className="timer">{`Time left:[${timerCounter}] second(s)`}</div>;
}
