import useAlert from "@/store/alertStore";
import { Box, Stack, Typography } from "@mui/material";

const Alert = () => {
  const { message, color, isAlert } = useAlert();
  return (
    <Box
      position="absolute"
      top="10px"
      left="25%"
      zIndex={10}
      display={isAlert ? "block" : "none"}
    >
      <Stack
        height="250px"
        width="60%"
        justifyContent="center"
        alignItems="center"
        border={`1px solid ${color}`}
      >
        <Typography color={color} fontSize="18px">
          {message}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Alert;
