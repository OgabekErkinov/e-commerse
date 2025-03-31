import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <Box width="120px" bgcolor="#002E58" height="40px" textAlign="center">
        <Typography variant="h5" color="error">
          Time is up! 
        </Typography>
      </Box>
    );
  }

  return (
    <Box width="240px" height="40px" display="flex" flexDirection="column" justifyContent="center"
         alignItems="center" borderRadius="8px" bgcolor="#002E58" >
        <Typography fontSize="14px" color="#fff">
           Ending soon : {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "} {timeLeft.seconds}s
        </Typography>
    </Box>
  );
};

export default CountdownTimer;
