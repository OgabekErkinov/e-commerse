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
import Card from "./Card";
import axios from "axios";

const Recommended = () => {
  const [start, setStart] = useState<number>(0);
  const [isForward, setIsForward] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const computers = products?.filter(
    (product) => product?.category === "Computers",
  );

  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width:900px)");
  const isMd = useMediaQuery("(max-width:1200px)");

  const cardsToShow = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

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

  const handleClick = (step: string): void => {
    if (step === "forward") {
      setIsForward(true);
      setStart((prev) =>
        prev + cardsToShow < computers?.length ? prev + 1 : 0,
      );
    } else {
      setIsForward(false);
      setStart((prev) =>
        prev > 0 ? prev - 1 : computers?.length - cardsToShow,
      );
    }
  };

  return (
    <Box id="computers" height="480px" width="95%" mx="auto" px={4} py={2}>
      <Stack
        height="100%"
        maxWidth="1200px"
        mx="auto"
        justifyContent="space-evenly"
      >
        <Typography fontSize={{ xs: "22px", md: "28px" }} fontWeight="600">
          Recommended for you
        </Typography>

        <Box width="100%" borderRadius="8px" position="relative" p={1}>
          <Box
            position="absolute"
            height="40px"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={isForward ? "#fff" : "#002E58"}
            border="1px solid gray"
            borderRadius="50%"
            left="-20px"
            top="50%"
            sx={{ transform: "translateY(-50%)", cursor: "pointer" }}
          >
            <Button
              onClick={() => handleClick("back")}
              disableTouchRipple
              disableFocusRipple
              sx={{ height: "100%", width: "100%" }}
            >
              <ArrowBack sx={{ color: !isForward ? "#fff" : "blue" }} />
            </Button>
          </Box>

          <Box
            position="absolute"
            height="40px"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={!isForward ? "#fff" : "#002E58"}
            border="1px solid gray"
            borderRadius="50%"
            right="-20px"
            top="50%"
            sx={{ transform: "translateY(-50%)", cursor: "pointer" }}
          >
            <Button
              onClick={() => handleClick("forward")}
              disableTouchRipple
              disableFocusRipple
              sx={{ height: "100%", width: "100%" }}
            >
              <ArrowForward sx={{ color: isForward ? "#fff" : "blue" }} />
            </Button>
          </Box>

          <Box
            display="flex"
            overflow="hidden"
            justifyContent="center"
            gap={2}
            p={2}
          >
            {isLoading
              ? Array.from({ length: cardsToShow }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    width={200}
                    height={300}
                    sx={{ borderRadius: "8px" }}
                  />
                ))
              : computers
                  .slice(start, start + cardsToShow)
                  .map((product, idx) => (
                    <Card product={product} idx={idx} key={idx} />
                  ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Recommended;
