import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import useStore from "@/store/store";
import MultipleLoading from "@/loadings/MultipleLoading";

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

      <Box height='100%' width='100%' display='grid' gap={2}
           gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}>
        {
          isLoading ? <MultipleLoading count={4}/> : 
           favourites?.map((product, idx) => {
            return (
              <Card product={product} idx={idx} key={product?.id}/>
            )
           })

        }

      </Box>
       {!isLoading && favourites?.length < 1 && <Typography variant="h6" sx={{ mt: 4, opacity: 0.7 }}>
          You haven’t added any favourites yet! 
        </Typography> }
    </Box>
  );
};

export default FavouritesPage;
