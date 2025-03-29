import {
  Box,
  Button,
  Stack,
  Typography,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Product } from "@/interface/interfaces";
import axios from "axios";

const TrendCategory = () => {
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width : 900px)");
  const isMd = useMediaQuery("(max-width: 1100px)");
  const itemsToShow = isXs ? 3 : isSm ? 4 : isMd ? 5 : 6;

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(itemsToShow);
  const [forward, setForward] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("https://json-server-oa7o.onrender.com/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    setEnd(start + itemsToShow);
  }, [start, itemsToShow]);

  const handleClick = (step: string): void => {
    if (step === "forward") {
      setForward(true);
      if (end < products?.length - 1) {
        setStart((prev) => prev + 1);
      } else {
        setStart(0);
      }
    } else {
      setForward(false);
      if (start > 0) {
        setStart((prev) => prev - 1);
      } else {
        setStart(products?.length - itemsToShow);
      }
    }
  };

  return (
    <Box height="320px" width="95%" mx="auto" px={4} py={2} bgcolor="#E7E7E7">
      <Stack
        height="100%"
        maxWidth="1200px"
        mx="auto"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography fontSize={{ xs: "22px", md: "36px" }} fontWeight="600">
          Trending Categories
        </Typography>

        <Box
          height="100%"
          width="100%"
          borderRadius="8px"
          position="relative"
          p={{ xs: 2, md: 3 }}
        >
          {/* Navigation Buttons */}
          <Box
            position="absolute"
            height="40px"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={forward ? "#fff" : "gray"}
            border="1px solid gray"
            borderRadius="50%"
            left="-20px"
            top="50%"
            sx={{
              transform: "translateY(-50%)",
              cursor: "pointer",
              transition: "all 0.5s ease",
            }}
          >
            <Button
              onClick={() => handleClick("back")}
              disableTouchRipple
              disableFocusRipple
              sx={{ height: "100%", width: "100%" }}
            >
              <ArrowBack sx={{ color: forward ? "gray" : "#fff" }} />
            </Button>
          </Box>

          <Box
            position="absolute"
            height="40px"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={!forward ? "#fff" : "gray"}
            border="1px solid gray"
            borderRadius="50%"
            right="-20px"
            top="50%"
            sx={{
              transform: "translateY(-50%)",
              cursor: "pointer",
              transition: "all 0.5s ease",
            }}
          >
            <Button
              onClick={() => handleClick("forward")}
              disableTouchRipple
              disableFocusRipple
              sx={{ height: "100%", width: "100%" }}
            >
              <ArrowForward sx={{ color: !forward ? "gray" : "#fff" }} />
            </Button>
          </Box>

          {/* Product Cards or Skeletons */}
          <Box
            display="flex"
            height="100%"
            overflow="hidden"
            justifyContent="center"
            gap={2}
            p={2}
            sx={{ transition: "all 0.3s ease" }}
          >
            {isLoading
              ? Array.from(new Array(itemsToShow)).map((_, idx) => (
                  <Stack
                    key={idx}
                    alignItems="center"
                    justifyContent="center"
                    width="150px"
                  >
                    <Skeleton variant="circular" width={90} height={90} />
                    <Skeleton
                      variant="text"
                      width={80}
                      height={20}
                      sx={{ mt: 1 }}
                    />
                  </Stack>
                ))
              : products?.slice(start, end).map((product, idx) => (
                  <Stack
                    key={idx}
                    alignItems="center"
                    justifyContent="center"
                    width="150px"
                    data-aos="fade-up"
                    data-aos-delay={idx % 2 === 0 ? "200" : "400"}
                    data-aos-duration="1000"
                  >
                    <Box
                      component="img"
                      src={product?.image}
                      alt={product?.name}
                      width="90px"
                      height="90px"
                      borderRadius="50%"
                      mb={2}
                      sx={{
                        boxShadow:
                          "0 4px 20px rgba(171, 90, 187, 0.4), 0 8px 50px rgba(255, 204, 0, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow:
                            "0 6px 30px rgba(209, 58, 214, 0.5), 0 10px 60px rgba(255, 204, 0, 0.4)",
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    <Typography
                      fontWeight="600"
                      textAlign="center"
                      variant="body2"
                    >
                      {product?.category}
                    </Typography>
                  </Stack>
                ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default TrendCategory;
