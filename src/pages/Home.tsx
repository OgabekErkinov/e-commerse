import { AdvBanner, AdvCards, Banner, BestSelling, Contact, DealDay, InfoBoxes, Navbar, NewComing, Offer,
         Recommended, TrendCategory } from "@/components";
import { Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack height="auto" width="100%" maxWidth="2400px" alignItems="center" gap={2}>
      <Navbar/>
      <Banner />
      <AdvCards />
      <DealDay />
      <Offer />
      <BestSelling />
      <TrendCategory />
      <NewComing />
      <AdvBanner />
      <Recommended />
      <AdvCards />
      <InfoBoxes />
      <Contact />
    </Stack>
  );
};

export default Home;
