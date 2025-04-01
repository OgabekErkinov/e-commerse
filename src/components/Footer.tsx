import { Box, Divider, Stack, Typography, Link } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const sections = [
    {
      title: "Company",
      items: [
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Store Locator", path: "/store-locator" },
      ],
    },
    {
      title: "Product",
      items: [
        { name: "Computer & Gaming", path: "/" },
        { name: "Electronic", path: "/" },
        { name: "Mobile Accessories", path: "/" },
        { name: "Smart Devices", path: "/" },
        { name: "Photography & Video", path: "/" },
      ],
    },
    {
      title: "Super Deals",
      items: [
        { name: "Mid-Season Sale", path: "/" },
        { name: "50% off (up to $99)", path: "/" },
        { name: "30% off on all audio items", path: "/" },
      ],
    },
    {
      title: "Customer Service",
      items: [
        { name: "FAQ's", path: "/faq" },
      ],
    },
  ];

  return (
    <Box bgcolor="white" py={5} borderTop="1px solid lightgray">
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent={{ xs: "center", sm: "space-between" }}
        width={{ xs: "90%", lg: "80%" }}
        mx="auto"
        gap={4}
      >
        {sections.map((section, index) => (
          <Stack
            key={index}
            minWidth={{ xs: "100%", sm: "45%", md: "22%" }}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography fontWeight="bold" mb={1}>
              {section.title}
            </Typography>
            {section.items.map((item, i) => (
              <Link
                component={NavLink}
                to={item.path}
                key={i}
                fontSize={14}
                color="gray"
                underline="none"
                sx={{ display: "block", mb: 0.5, '&:hover': { color: "black" } }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 4, bgcolor: "lightgray" }} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        width={{ xs: "90%", lg: "80%" }}
        mx="auto"
        gap={2}
      >
        {/* Social Media */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={600}>Follow Us:</Typography>
          {[Instagram, Twitter, LinkedIn, Facebook].map((Icon, i) => (
            <Icon
              key={i}
              sx={{ cursor: "pointer", fontSize: 22, color: "gray" }}
            />
          ))}
        </Stack>

        {/* Payment Methods */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={600}>Pay Securely with:</Typography>
          {[
            "https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png",
            "https://img.icons8.com/fluent/512/apple-pay.png",
            "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
          ].map((src, i) => (
            <img key={i} src={src} alt={src.split(".")[0]} width={30} />
          ))}
        </Stack>
      </Stack>

      <Box height="10px" textAlign="center" bgcolor="#f5f5f5" py={2} mt={3}>
        <Typography fontSize={12} color="gray">
          @Esports, {new Date().getFullYear()}. All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
