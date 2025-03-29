import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, List, ListItem, ListItemIcon, Stack, Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { ArrowForward, FiberManualRecord } from "@mui/icons-material";
import { Product } from "@/interface/interfaces";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://json-server-oa7o.onrender.com/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box id="/home" width={{ xs: "100%", md: "70%" }} ml="auto" p={2}>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        autoplay
        pagination={{ clickable: true }}
        style={
          { "--swiper-pagination-color": "#005AFF" } as React.CSSProperties
        }
      >
        {isLoading ? (
          <SwiperSlide>
            <Box
              bgcolor="#F2F2F2"
              height={{ xs: "auto", sm: "400px" }}
              borderRadius="12px"
              width="100%"
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box height="100%" width={{ xs: "100%", sm: "50%" }} p={2}>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="60%" height={50} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={100} />
                  <Skeleton variant="rectangular" width="150px" height={40} />
                </Stack>
              </Box>
              <Skeleton variant="rectangular" width="50%" height="100%" />
            </Box>
          </SwiperSlide>
        ) : (
          products
            ?.filter((p) => p?.category === "TV & Monitors")
            .map((product, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  bgcolor="#F2F2F2"
                  height="400px"
                  borderRadius="12px"
                  width="100%"
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Stack
                    height="100%"
                    width={{ xs: "100%", sm: "50%" }}
                    alignItems="flex-start"
                    justifyContent={{ xs: "space-evenly", md: "center" }}
                    p="24px 12px 12px 24px"
                  >
                    <Typography variant="h6" color="blue">
                      {product?.name}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontSize={{ xs: "24px", sm: "36px" }}
                    >
                      {product?.description}
                    </Typography>
                    <Box
                      width="100%"
                      height="auto"
                      display={{ xs: "none", md: "flex" }}
                    >
                      {[
                        ["Medically accurate", "Instant feedback"],
                        ["Wi-Fi+ Bluetooth", "Easy to use"],
                      ].map((list, index) => (
                        <List key={index}>
                          {list.map((item, i) => (
                            <ListItem key={i}>
                              <ListItemIcon sx={{ minWidth: "20px" }}>
                                <FiberManualRecord
                                  sx={{ fontSize: "8px", color: "blue" }}
                                />
                              </ListItemIcon>
                              <Typography>{item}</Typography>
                            </ListItem>
                          ))}
                        </List>
                      ))}
                    </Box>
                    <Button>
                      <Box
                        height="40px"
                        width="150px"
                        bgcolor="#002E58"
                        borderRadius="8px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick = {() => navigate('/shop')}
                      >
                        <ArrowForward sx={{ color: "#fff" }} />
                        <Typography color="#fff" fontWeight="600">
                          Shop now
                        </Typography>
                      </Box>
                    </Button>
                  </Stack>
                  <Box
                    component="img"
                    src={product?.image}
                    alt="Slide 1"
                    height={{ xs: "50%", sm: "90%" }}
                    width="40%"
                    m="auto"
                    borderRadius={2}
                  />
                </Box>
              </SwiperSlide>
            ))
        )}
      </Swiper>
    </Box>
  );
};

export default Banner;
