import { Box, Container, Stack, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      {/* Header */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        data-aos="fade-up"
      >
        About Us
      </Typography>

      {/* Our Mission */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
      >
        <Box flex={1} data-aos="fade-right">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="gray">
            We provide high-quality and modern products. We guarantee
            convenience and reliability for our customers.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/images/about-goal.jpg"
          width="100%"
          height="300px"
          sx={{ objectFit: "cover", borderRadius: "10px", flex: 1 }}
          data-aos="fade-left"
        />
      </Stack>

      {/* Our Products */}
      <Stack
        direction={{ xs: "column", md: "row-reverse" }}
        spacing={4}
        alignItems="center"
        mt={5}
      >
        <Box flex={1} data-aos="fade-left">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Our Products
          </Typography>
          <Typography variant="body1" color="gray">
            Our store offers only original and high-quality products. Each item
            is tested and meets customer demands.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/images/about-products.jpg"
          width="100%"
          height="300px"
          sx={{ objectFit: "cover", borderRadius: "10px", flex: 1 }}
          data-aos="fade-right"
        />
      </Stack>

      {/* How to Order? */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        mt={5}
      >
        <Box flex={1} data-aos="fade-right">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            How to Place an Order?
          </Typography>
          <Typography variant="body1" color="gray">
            1. Select the desired product. <br />
            2. Add it to the cart and choose a payment method. <br />
            3. Confirm the order, and we will deliver it quickly.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/images/about-shopping.jpg"
          width="100%"
          height="300px"
          sx={{ objectFit: "cover", borderRadius: "10px", flex: 1 }}
          data-aos="fade-left"
        />
      </Stack>

      {/* Reliability */}
      <Stack
        direction={{ xs: "column", md: "row-reverse" }}
        spacing={4}
        alignItems="center"
        mt={5}
      >
        <Box flex={1} data-aos="fade-left">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Why Trust Us?
          </Typography>
          <Typography variant="body1" color="gray">
            • 1000+ customers trust us. <br />
            • Guaranteed quality and fast delivery. <br />• 24/7 customer
            support service.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/images/about-trust.jpg"
          width="100%"
          height="300px"
          sx={{ objectFit: "cover", borderRadius: "10px", flex: 1 }}
          data-aos="fade-right"
        />
      </Stack>
    </Container>
  );
};

export default About;
