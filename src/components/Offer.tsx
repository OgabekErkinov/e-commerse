import { ListAlt } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const offerData = [
  {
    id: 1,
    icon: <ListAlt sx={{ fontSize: { xs: "40px", md: "60px" } }} />,
    title: "Free Return in 30 days",
    subtitle: "No Hassle",
  },
  {
    id: 2,
    icon: <ListAlt sx={{ fontSize: { xs: "40px", md: "60px" } }} />,
    title: "Free Shipping",
    subtitle: "No Hassle",
  },
  {
    id: 3,
    icon: <ListAlt sx={{ fontSize: { xs: "40px", md: "60px" } }} />,
    title: "Thank you points",
    subtitle: "No Hassle",
  },
  {
    id: 4,
    icon: <ListAlt sx={{ fontSize: { xs: "40px", md: "60px" } }} />,
    title: "Secure Payment",
    subtitle: "No Hassle",
  },
];

const Offer = () => {
  return (
    <Box
      height="280px"
      width="96%"
      mx="auto"
      borderRadius="8px"
      display="flex"
      alignItems="center"
      bgcolor="#77F7FF"
      p={3}
    >
      <Box display="flex" height="280px" width="100%" gap={2} overflow="hidden">
        <Box
          width={{ xs: "35%", md: "20%" }}
          height="100%"
          display="flex"
          alignItems="center"
        >
          <Typography fontSize={{ xs: "22px", md: "28px" }} fontWeight="600">
            See what Dedicated <br /> Offer you Have
          </Typography>
        </Box>

        <Marquee style={{ width: "80%", height: "100%" }}>
          {offerData.map((offer) => (
            <Box
              key={offer.id}
              bgcolor="#fff"
              height="100%"
              width="200px"
              mx="25px"
              borderRadius="8px"
              boxShadow={2}
              display="flex"
              justifyContent="center"
            >
              <Stack
                height="100%"
                width="100%"
                alignItems="center"
                justifyContent="space-around"
                p={2}
              >
                <Box sx={{ color: "blue" }}>{offer.icon}</Box>
                <Typography fontWeight="500">{offer.title}</Typography>
                <Typography fontSize="14px" color="gray">
                  {offer.subtitle}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default Offer;
