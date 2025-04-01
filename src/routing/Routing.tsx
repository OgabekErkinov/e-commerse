import { About, Favourites, Home, Search, Shop, FAQ, StoreLocator} from "@/pages";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path = "/faq" element = {<FAQ/>}/>
      <Route path="/store-locator" element = {<StoreLocator/>}/>
      <Route path="*" element = {<NotFound/>}/>
    </Routes>
  );
};

export default Routing;
