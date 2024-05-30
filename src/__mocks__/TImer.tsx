// Timer.mock.tsx
import { useEffect } from "react";

interface ITimer {
  onTimerComplete: () => void;
}

const TimerMock: React.FC<ITimer> = ({ onTimerComplete }) => {
  useEffect(() => {
    onTimerComplete();
  }, [onTimerComplete]);

  return <div className="timer">Time left:[0] second(s)</div>;
};

export default TimerMock;
