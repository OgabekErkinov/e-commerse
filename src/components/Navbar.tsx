import axios from "axios";
import { handleScroll } from "@/libs/libs";
import useStore from "@/store/store";
import { FavoriteBorder, Menu as MenuIcon, ShoppingCart, Close as CloseIcon } from "@mui/icons-material";
import { Box, MenuItem, Menu, Typography, IconButton, Button, useMediaQuery, Badge, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/interface/interfaces";

const Navbar = () => {
  const { setSearchCategory, searchCategory, carts, favourites } = useStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const isMiddleScreen = useMediaQuery("(min-width : 540px)");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLargeScreen) setMenuOpen(false);
  }, [isLargeScreen]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://json-server-oa7o.onrender.com/products");
      const uniqueCategories = Array.from(new Set(response?.data?.map((cat: Product) => cat?.category))) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navLinks = [
    { label: "Home", path: "/", type: "navigate" },
    { label: "Gadgets", path: "gadgets", type: "scroll" },
    { label: "Best sellers", path: "best-sellers", type: "scroll" },
    { label: "Computers", path: "computers", type: "scroll" },
    { label: "Shop", path: "/shop", type: "navigate" },
  ];
  

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <Box position="sticky" zIndex={3} top={0} width='100%'>
      <Box height="60px" width="100%" bgcolor="#002E58" display="flex" justifyContent="center">
        <Box height="100%" width="80%" maxWidth="1400px" display="flex" justifyContent="space-between" alignItems="center">
          <IconButton sx={{ display: { xs: "block", md: "none" }, color: "#fff" }} onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Button onClick={(e) => setAnchorEl(e.currentTarget)} 
                  sx={{ color: "#fff", border: "1px solid white", width: "220px", height: "45px", px: 2, display : isMiddleScreen ? 'block' : 'none'}}>
            {searchCategory || "All Categories"}
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setSearchCategory("all")}>All Categories</MenuItem>
            {isLoading ? <MenuItem disabled>Loading...</MenuItem> : categories?.map((category, idx) => (
              <MenuItem key={idx} onClick={() => setSearchCategory(category)}>{category}</MenuItem>
            ))}
          </Menu>

          <Box display={{ xs: "none", md: "flex" }} alignItems="center" gap={3}>
            {navLinks.map((link, idx) => link.type === "navigate" ? (
              <Link key={idx} to={link.path} style={{ textDecoration: "none" }}>
                <Typography sx={{ cursor: "pointer", color: "#fff", "&:hover": { color: "#002b80" } }}>{link.label}</Typography>
              </Link>
            ) : (
              <Typography key={idx} sx={{ cursor: "pointer", color: "#fff", "&:hover": { color: "#002b80" } }} onClick={() => handleScroll(link.path)}>
                {link.label}
              </Typography>
            ))}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Link to="/favourites" style={{ color: "#fff", position: "relative" }}>
              <Badge badgeContent={favourites?.length} color="error">
                <FavoriteBorder sx={{ color: "#fff" }} />
              </Badge>
            </Link>
            <Link to="/shop" style={{ color: "#fff" }}>
              <Badge badgeContent={carts?.length} color="error">
                <ShoppingCart sx={{ color: "#fff" }} />
              </Badge>
            </Link>
          </Box>
        </Box>
      </Box>

      <Drawer anchor="left" open={menuOpen} onClose={handleCloseMenu}>
        <Box width="250px" role="presentation">
          <Box display="flex" justifyContent="flex-end" p={2}>
            <IconButton onClick={handleCloseMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link, idx) => (
              <ListItem key={idx} component='button' onClick={() => { navigate(link.type === "navigate" ? link.path : "/favourites"); handleCloseMenu(); }}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;