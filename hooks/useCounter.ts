import { Nullable } from "@/services/api";
import { useEffect, useState } from "react";

export type TimeLeft = Nullable<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}>;

const calculateTimeDifference = (
    targetDate: string
  ) => {
    const formatTime = (time: number) => {
      return time < 10 ? `0${time}` : `${time}`;
    };
    /*
      The counter should always work backwards!
      This is a workaround for messed up timestamps on the BE side
      long story short: if timestamps are messed up -> don't render anything
    */
    if (+new Date(targetDate) < +new Date()) {
      return null
     }
  
    const difference = Math.abs(+new Date(targetDate) - +new Date());
  
    return {
      days: formatTime(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: formatTime(Math.floor((difference / 1000 / 60) % 60)),
      seconds: formatTime(Math.floor((difference / 1000) % 60)),
    };
  };
  
const useCounter = (targetDate: string ) => {
  const [time, setTime] = useState<TimeLeft>(
    calculateTimeDifference(targetDate)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentRemainingTime = calculateTimeDifference(targetDate);
      setTime(currentRemainingTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return time;
};

export default useCounter;