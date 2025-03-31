import { Button } from "@mui/material";

const CallButton: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Button sx={{bgcolor : 'transparent', color : 'black'}} onClick={handleCall}>
      Call {phoneNumber}
    </Button>
  );
};

export default CallButton;
