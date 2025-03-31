import { Box, Divider, Stack, Typography } from "@mui/material";
import { Call, Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  
  return (
    <Box width="100%" py={3} bgcolor="white" borderBottom="1px solid grey">
      <Stack direction={{ xs: "column", sm: "row" }}  justifyContent="space-between" alignItems="center"
             width={{ xs: "100%", sm: "80%" }} mx="auto" gap={3} >
        
        {/* Logo Section */}
        <Box height="100%" width="80px" display="flex" flexDirection={{ xs: "row", sm: "column", md: "row" }}
             alignItems="center" gap={1} onClick={() => navigate("/")} >
          <Box component="img" src="/Vector.svg" height={{ xs: "36px", md: "42px" }}
               width={{ xs: "24px", md: "28px" }}/>
          <Typography fontSize={{ xs: "18px", md: "24px" }} fontWeight="600">
            GanGet
          </Typography>
        </Box>

        {/* Contact Info */}
        <Stack  direction={{ xs: "column", sm: "row" }}  alignItems="center" gap={2}>

          {/* Phone Section */}
          <Stack direction={{ xs: "row", sm: "column", md: "row" }} alignItems="center" gap={1} >
            <Stack direction="row" gap={0.5}>
              <Call sx={{ color: "black" }} />
              <Typography color="gray">call us</Typography>
            </Stack>
            <Typography color="black">+99897 229 32 99</Typography>
          </Stack>

          {/* Divider */}
          <Divider orientation="vertical" flexItem sx={{ bgcolor: "grey" }} />

          {/* Email Section */}
          <Stack direction={{ xs: "row", sm: "column", md: "row" }} alignItems="center" gap={1}>
            <Stack direction="row" gap={1}>
              <Email sx={{ color: "black" }} />
              <Typography color="gray">mail us</Typography>
            </Stack>
            <Typography color="black">ogabekerkinov56@gmail.com</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
