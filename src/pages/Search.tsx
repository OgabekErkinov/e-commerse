import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Product } from "@/interface/interfaces";
import useStore from "@/store/store";
import { Card } from "@/components";

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { searchCategory, searchInputValue } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<Product[]>(
          "http://localhost:5000/products",
        );
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (searchCategory ? product.category === searchCategory : true) &&
      (searchInputValue
        ? product.name.toLowerCase().includes(searchInputValue.toLowerCase())
        : true),
  );

  return (
    <Box p={4} width="100%" height="auto">
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box
        width="90%"
        mx="auto"
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }}
        gap={4}
      >
        {filteredProducts.map((product, idx) => (
          <Card product={product} idx={idx} key={idx} />
        ))}
      </Box>
      {filteredProducts.length === 0 && !loading && (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
};

export default SearchPage;
