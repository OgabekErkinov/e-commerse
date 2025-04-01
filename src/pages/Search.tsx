import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Product } from "@/interface/interfaces";
import useStore from "@/store/store";
import { Card } from "@/components";
import MultipleLoading from "@/loadings/MultipleLoading";

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { searchInputValue } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<Product[]>(
          "https://json-server-oa7o.onrender.com/products",
        );
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => (product.name.toLowerCase().includes(searchInputValue.toLowerCase().trim()) ||
                  product?.category.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase().trim()))
  );

  return (
    <Box p={4} width="100%" height="auto">
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <Box
        width="90%"
        mx="auto"
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
        gap={4}
      >
        {
         isLoading ? <MultipleLoading count={4}/> :
        filteredProducts?.map((product, idx) => {
          return (
            <Card product={product} idx={idx} key={idx} />
          )
        })}
      </Box>
      {filteredProducts.length === 0 && !isLoading && (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
};

export default SearchPage;
