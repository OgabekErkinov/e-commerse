import useAlert from "@/store/alertStore";
import { Box, Stack, Typography } from "@mui/material";

const Alert = () => {
  const { message, color, isAlert } = useAlert();
  return (
    <Box
      position="fixed"
      top="20px"
      width='100%'
      zIndex={10}
      display={isAlert ? "flex" : "none"}
      justifyContent='center'
    >
      <Stack
        height="50px"
        width="300px"
        justifyContent="center"
        alignItems="center"
        border={`1px solid ${color}`}
        borderRadius='12px'
        bgcolor='#fff'
      >
        <Typography color={color} fontSize="14px" fontWeight={600}>
          {message}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Alert;
