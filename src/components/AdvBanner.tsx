import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdvBanner = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height={{ xs: "220px", sm: "280px", md: "320px" }}
      mx="auto"
      sx={{ backgroundImage: "url(/advBanner.svg)", backgroundSize: "cover", backgroundPosition: "center" }}
     >
      <Box height="100%" width="100%" bgcolor="rgba(0, 0, 0, 0.4)">
        <Stack
          direction={{ xs: "column", md: "row" }}
          width={{ xs: "90%", sm: "50%" }}
          height="100%"
          ml="auto"
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
          gap={{ xs: 2, sm: 3 }}
          px={{ xs: 2, sm: 3 }}
        >
          <Stack
            textAlign={{ xs: "center", md: "left" }}
            color="#fff"
            maxWidth={{ xs: "100%", md: "60%" }}
          >
            <Typography color="#FF9900" fontSize={{ xs: "16px", md: "18px" }}>
              Gamer Days
            </Typography>
            <Typography variant="h4" fontSize={{ xs: "24px", md: "32px" }}  mb={1}
            >
              SHOP. SAVE. WIN
            </Typography>
            <Typography fontSize={{ xs: "14px", md: "16px" }}>
              Exclusive limited-time offers & giveaway
            </Typography>
          </Stack>

          {/* navigate button */}

          <Button disableTouchRipple  disableFocusRipple
                  onClick={() => navigate("/shop")}
          >
            <Stack direction="row" bgcolor="#002E58" borderRadius="8px" p={2} gap={1}
                   justifyContent="center" alignItems="center" color="#fff" width="180px"
              sx={{ transition: "all 0.3s ease", "&:hover": { bgcolor: "#0057D9" } }}
            >
              <ArrowForward fontSize="small" />
              <Typography fontSize={{ xs: "14px", sm: "16px" }}>
                Shop now
              </Typography>
            </Stack>
          </Button>

          {/* navigate button */}

        </Stack>
      </Box>
    </Box>
  );
};

export default AdvBanner;
