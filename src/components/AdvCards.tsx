import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdvCards = () => {
  const navigate = useNavigate();

  return (
    <Box
      width="94%"
      mx="auto"
      my={2}
      p={2}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
      gap={{ xs: "20px", md: "40px" }}
    >
      {/* First Card */}
      <Box
        height={{ xs: "350px", md: "260px" }}
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        p="14px"
        borderRadius="12px"
        sx={{
          backgroundImage: "url(/redBg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          width={{ xs: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          p={{ xs: "14px", md: "16px" }}
        >
          <Typography variant="h5" color="#fff" fontWeight="600">
            Handheld Smartphone Gimbal
          </Typography>
          <Typography color="#eee" fontSize="14px" mt={1} mb={2}>
            Professional stabilization for smooth and cinematic shots on your
            phone.
          </Typography>
          <Button
            disableTouchRipple
            onClick={() => navigate("/shop")}
            sx={{
              bgcolor: "#000",
              color: "#fff",
              borderRadius: "8px",
              px: 2,
              py: 1,
              "&:hover": { bgcolor: "#222" },
            }}
          >
            <ArrowForward sx={{ mr: 1 }} />
            <Typography>Shop now</Typography>
          </Button>
        </Box>

        <Box
          component="img"
          src="/handheld.svg"
          height={{ xs: "50%", md: "100%" }}
          width="100%"
          sx={{ objectFit: "contain" }}
        />
      </Box>

      {/* Second Card */}
      <Box
        height={{ xs: "350px", md: "260px" }}
        width="100%"
        display="flex"
        flexDirection={{ xs: "column-reverse", md: "row" }}
        p="14px"
        borderRadius="12px"
        sx={{
          backgroundImage: "url(/blueBg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component="img"
          src="/acer.svg"
          height={{ xs: "50%", md: "100%" }}
          width={{ xs: "100%", md: "50%" }}
          sx={{ objectFit: "contain" }}
        />

        <Box
          width={{ xs: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          p={{ xs: "14px", md: "16px" }}
        >
          <Typography variant="h5" color="#fff" fontWeight="600">
            Acer RTX Studio Laptop
          </Typography>
          <Typography color="#eee" fontSize="14px" mt={1} mb={2}>
            High-performance laptop with RTX graphics for creators and gamers.
          </Typography>
          <Button
            disableTouchRipple
            onClick={() => navigate("/shop")}
            sx={{
              bgcolor: "#000",
              color: "#fff",
              borderRadius: "8px",
              px: 2,
              py: 1,
              "&:hover": { bgcolor: "#222" },
            }}
          >
            <ArrowForward sx={{ mr: 1 }} />
            <Typography>Shop now</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvCards;
