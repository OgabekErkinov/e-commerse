import { AdvBanner, AdvCards, Banner, BestSelling, Contact, DealDay, InfoBoxes, NewComing, Offer,
         Recommended, TrendCategory } from "@/components";
import { Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack height="auto" width="100%" maxWidth="1800px" alignItems="center" gap={2}>
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
