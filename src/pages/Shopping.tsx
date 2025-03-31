import { Box, Button, Typography, Divider, Stack, Modal } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useStore from "@/store/store";
import { Card } from "@/components";
import axios from "axios";
import { Product } from "@/interface/interfaces";
import MultipleLoading from "@/loadings/MultipleLoading";

const ShoppingPage: React.FC = () => {
  const { carts, setCarts } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const getCarts = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Product[]>("http://localhost:5000/carts");
      setCarts(data);
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const { totalPrice, totalDiscountPrice } = useMemo(() => {
    return carts.reduce(
      (acc, cart) => {
        const price: number = Number(cart?.price ?? 0);
        const discount: number = Number(cart?.inDiscount ?? price);
        const quantity: number = Number(cart?.quantity ?? 1);

        acc.totalPrice += price * quantity;
        acc.totalDiscountPrice += discount * quantity;
        return acc;
      },
      { totalPrice: 0, totalDiscountPrice: 0 },
    );
  }, [carts]);

  const totalSaved: number = useMemo(
    () => Math.max(0, totalPrice - totalDiscountPrice),
    [totalPrice, totalDiscountPrice],
  );
  const totalItems: number = useMemo(
    () => carts.reduce((acc, cart) => acc + Number(cart?.quantity ?? 1), 0),
    [carts],
  );

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} p={4}>
      
      <Box
        flex={3}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? <MultipleLoading count={4}/> : carts.length > 0 ? (
          carts.map((product: Product, idx: number) => (
            <Card product={product} idx={idx} key={product.id} />
          ))
        ) : (
          <Typography variant="h6" textAlign="center">Your cart is empty!</Typography>
        )}
      </Box>

      <Box flex={1} p={4} bgcolor="white" borderRadius={2} boxShadow={3} minWidth="250px"
           sx={{ height: "fit-content" }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Shopping Summary
        </Typography>
        <Divider />
        <Stack spacing={2} mt={2}>
          <Typography variant="body1">Total Items: {totalItems}</Typography>
          <Typography variant="body1">Unique Products: {carts.length}</Typography>
          <Typography variant="body1" color="gray" sx={{ textDecoration: "line-through" }}>
            Original Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="h6" fontWeight={600} color="#002E58">
            Discounted Price: ${totalDiscountPrice.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="green" fontWeight={600}>
            You Saved: ${totalSaved.toFixed(2)}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, bgcolor: "#002E58" }}
          onClick={() => setIsCheckoutOpen(true)}
        >
          Checkout
        </Button>
      </Box>

      {/* Checkout Modal */}
      <Modal open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)}>
        <Box position="absolute"  bottom="20px" right="5%" bgcolor="white"  p={4} borderRadius={2}
             boxShadow={3}  width={{ xs: "80%", sm: "50%", md: "30%" }} >
          <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
            Order Confirmed!
          </Typography>
          <Typography variant="body1" textAlign="center" mb={3}>
            Thank you for your purchase. Your order is being processed.
          </Typography>
          <Button variant="contained" color="primary" fullWidth
                  onClick={() => setIsCheckoutOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ShoppingPage;
