import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/store";

const FavouritesPage = () => {
  const { favourites, setFavourites } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFavourites = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:5000/favourites");
      setFavourites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Your Favourite Products
      </Typography>

      {isLoading ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: "1200px" }}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
            gap={4}
          >
            {[...Array(6)].map((_, idx) => (
              <Skeleton key={idx} variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        </Paper>
      ) : favourites.length > 0 ? (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: "1200px" }}>
          <AnimatePresence>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
              gap={4}
            >
              {favourites.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Card product={product} idx={idx} />
                </motion.div>
              ))}
            </Box>
          </AnimatePresence>
        </Paper>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, opacity: 0.7 }}>
          You haven’t added any favourites yet! 
        </Typography>
      )}
    </Box>
  );
};

export default FavouritesPage;
