import { Box, Button, Stack, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Product } from "@/interface/interfaces";
import axios from "axios";

const BestSelling = () => {
  const [category, setCategory] = useState("Computers");
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
  }, [category]);

  const categories = [
    "Computers",
    "TV & Monitors",
    "Watches & Eyewear",
    "Mobiles & Tablets",
  ];
  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <Box id="best-sellers" width="100%" py={2} my={2}>
      <Typography variant="h4" fontWeight={600} mb={4} data-aos="fade-up">
        The Best Selling Products
      </Typography>

      {/* Categoriya tugmalari */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { height: "4px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setCategory(cat)}
            sx={{
              minWidth: "auto",
              transition: "all 0.3s ease",
            }}
          >
            <Box
              bgcolor={category === cat ? "#002E58" : "transparent"}
              color={category === cat ? "white" : "black"}
              p={1}
              mx="auto"
              my="-10px"
              borderRadius="8px"
              sx={{ transition: "background-color 0.3s ease" }}
            >
              <Typography fontSize={{ xs: "0.8rem", sm: "1rem" }}>
                {cat}
              </Typography>
            </Box>
          </Button>
        ))}
      </Stack>

      {/* Product Grid */}
      <Box
        display="grid"
        justifyContent="center"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        p={4}
        mx="auto"
        bgcolor="#002E58"
      >
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, idx) => (
              <Box key={idx} sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="80%" height={30} sx={{ mt: 1 }} />
                <Skeleton width="60%" height={30} />
              </Box>
            ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <Card product={product} idx={idx} key={idx} />
          ))
        ) : (
          <Typography color="white" textAlign="center" gridColumn="1 / -1">
            No products available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BestSelling;
