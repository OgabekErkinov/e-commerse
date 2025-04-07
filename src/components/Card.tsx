import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FavoriteBorderOutlined, Favorite, Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { Product } from "@/interface/interfaces";
import useStore from "@/store/store";
import useAlert from "@/store/alertStore";

type CardProps = {
  product: Product;
  idx: number;
};

const BASE_URL = "https://json-server-oa7o.onrender.com";

const Card: React.FC<CardProps> = ({ product, idx }) => {
  const { showAlert } = useAlert();
  const { setCarts, setFavourites } = useStore();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    AOS.init();
    const fetchData = async () => {
      try {
        const [favRes, cartRes] = await Promise.all([
          axios.get<Product[]>(`${BASE_URL}/favourites`),
          axios.get<{ id: string; quantity: number }[]>(`${BASE_URL}/carts`),
        ]);

        setIsFavorite(favRes.data.some((fav) => fav.id === product.id));
        const existingItem = cartRes.data.find((cartItem) => cartItem.id === product.id);
        setCartCount(existingItem ? existingItem.quantity : 0);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [product.id]);

  const toggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${BASE_URL}/favourites/${product.id}`);
        showAlert("Product removed from favorites successfully!", "green");
      } else {
        await axios.post(`${BASE_URL}/favourites`, product);
        showAlert("Product added to favorites successfully!", "green");
      }
      const updatedFavourites = await axios.get<Product[]>(`${BASE_URL}/favourites`).then(res => res.data);
      setFavourites(updatedFavourites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      showAlert("Error updating favorites!", "red");
    }
  }, [isFavorite, product, setFavourites, showAlert]);

  const handleCartChange = useCallback(async (quantity: number) => {
    if (quantity < 0) return;
    try {
      const { data } = await axios.get<{ id: string; quantity: number }[]>(`${BASE_URL}/carts`);
      const cartItem = data.find((item) => item.id === product.id);
      const cartData = { ...product, quantity };

      if (quantity === 0) {
        await axios.delete(`${BASE_URL}/carts/${product.id}`);
        showAlert(`${product.name} removed from cart`, "blue");
      } else if (cartItem) {
        await axios.put(`${BASE_URL}/carts/${product.id}`, cartData);
        showAlert(`${product.name} updated in cart`, "green");
      } else {
        await axios.post(`${BASE_URL}/carts`, cartData);
        showAlert(`${product.name} added to cart`, "green");
      }

      const updatedCarts = await axios.get(`${BASE_URL}/carts`).then(res => res.data);
      setCarts(updatedCarts);
      setCartCount(quantity);
    } catch (error) {
      showAlert("Error updating cart!", "red");
    }
  }, [product, setCarts, showAlert]);

  return (
    <Box display="flex" flexDirection="column" position="relative" borderRadius="8px" overflow="hidden"
         border="1px solid gray" height="340px" maxWidth="250px" width="100%" mx="auto" bgcolor="#F2F2F2"
         data-aos="fade-up" data-aos-delay={50 * idx}
         sx={{ transition: "0.3s ease", "&:hover": { transform: "scale(1.05)" } }}>
      <IconButton onClick={toggleFavorite} sx={{ position: "absolute", top: 10, right: 10 }}>
        {isFavorite ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}
      </IconButton>

      {product.image && (
        <Box component="img" src={product.image} height="50%" width="80%"
             mx="auto" mt={1} sx={{ objectFit: "contain", bgcolor: "#F2F2F2" }} />
      )}

      <Stack height="50%" p={2} justifyContent="space-between" bgcolor="#fff">
        <Box>
          <Typography variant="h6">{product.category}</Typography>
          <Typography fontSize="16px">{product.name}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "gray", textDecoration: "line-through" }}>{product.price}$</Typography>
          <Typography fontWeight="bold" color="#002E58" fontSize="24px">{product.inDiscount}$</Typography>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center"
             sx={{ position: "absolute", bottom: 10, right: 10 }}>
        <IconButton onClick={() => handleCartChange(cartCount - 1)} disabled={cartCount === 0}>
          <Remove />
        </IconButton>
        <Typography>{cartCount}</Typography>
        <IconButton onClick={() => handleCartChange(cartCount + 1)}>
          <Add />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Card;
