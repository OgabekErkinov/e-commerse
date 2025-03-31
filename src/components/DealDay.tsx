import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography, Skeleton, useMediaQuery } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CountdownTimer from "./CountDownTimer";
import Card from "./Card";
import { Product } from "@/interface/interfaces";

const DealDay = () => {
  const [start, setStart] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width:900px)");
  const isMd = useMediaQuery("(max-width:1100px)");
  const cardsToShow = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("https://json-server-oa7o.onrender.com/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleClick = (direction: "forward" | "back") => {
    setStart((prev) => {
      if (direction === "forward") {
        return prev + 1 + cardsToShow <= products.length ? prev + 1 : 0;
      }
      return prev > 0 ? prev - 1 : products.length - cardsToShow;
    });
  };

  return (
    <Box id="deals" height="620px" width="95%" mx="auto" px={4} py={4}>
      <Stack height="100%" maxWidth="1200px" mx="auto" justifyContent="space-around" alignItems="center">
        <Typography fontSize={{ xs: "22px", md: "36px" }} fontWeight="600">
          Deal of the Day
        </Typography>

        <Box width="100%" border="1px solid blue" borderRadius="8px" position="relative" p={{ xs: 2, md: 3 }}>
          {/* Countdown Timer */}
          <Box position="absolute" top="-20px" left="50%" sx={{ transform: "translateX(-50%)" }}>
            <CountdownTimer targetDate="2026-12-31T23:59:59" />
          </Box>

          {/* Navigation Buttons */}
          {["back", "forward"].map((direction) => (
            <Box
              key={direction}
              position="absolute"
              height="40px"
              width="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#002E58"
              border="1px solid gray"
              borderRadius="50%"
              sx={{
                cursor: "pointer",
                top: "50%",
                transform: "translateY(-50%)",
                [direction === "back" ? "left" : "right"]: "-20px",
              }}
            >
              <Button onClick={() => handleClick(direction as "forward" | "back")} disableTouchRipple disableFocusRipple sx={{ height: "100%", width: "100%" }}>
                {direction === "back" ? <ArrowBack sx={{ color: "#fff" }} /> : <ArrowForward sx={{ color: "#fff" }} />}
              </Button>
            </Box>
          ))}

          {/* Product Cards */}
          <Box display="flex" overflow="hidden" justifyContent="center" gap={2} p={2}>
            {isLoading
              ? Array.from({ length: cardsToShow }).map((_, idx) => (
                  <Skeleton key={idx} variant="rectangular" width={200} height={300} sx={{ borderRadius: "8px" }} />
                ))
              : products?.slice(start, start + cardsToShow).map((product, idx) => (
                  <Card product={product} idx={idx} key={idx} />
                ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DealDay;