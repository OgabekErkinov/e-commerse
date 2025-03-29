import { LocalShipping, PhotoCamera, HeadsetMic } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

const InfoBoxes = () => {
  const infoData = [
    {
      icon: <LocalShipping fontSize="large" sx={{ color: "white" }} />,
      title: "Payment & Delivery",
      desc: "Free shipping for orders over $99",
    },
    {
      icon: <PhotoCamera fontSize="large" sx={{ color: "white" }} />,
      title: "Return & Refund",
      desc: "100% money back guarantee",
    },
    {
      icon: <HeadsetMic fontSize="large" sx={{ color: "white" }} />,
      title: "Quality Support",
      desc: "24/7 online feedback",
    },
  ];

  return (
    <Box width="100%" py={2} bgcolor="#002E58">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        height={{ xs: "auto", sm: "50px" }}
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        {infoData.map((item, index) => (
          <Stack key={index} direction="row" alignItems="center" gap={2} p={2}>
            {item.icon}
            <Stack>
              <Typography fontSize={18} fontWeight={600} color="white">
                {item.title}
              </Typography>
              <Typography
                fontSize={14}
                color="white"
                sx={{ display: { xs: "block", sm: "none", md: "block" } }} // xs va md+ da ko'rinadi, sm da yo'q
              >
                {item.desc}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default InfoBoxes;
