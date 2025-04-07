import { handleScroll } from "@/libs/libs";
import { Map } from "@/modals";
import useStore from "@/store/store";
import { Search } from "@mui/icons-material";
import { Box, Divider, Input, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const { searchInputValue, setSearchInputValue } = useStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Box height="100px"  display="flex" justifyContent="center" alignItems="center" >
        <Box
          width="90%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          columnGap={1}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1} sx={{ cursor: "pointer" }}
               onClick={() => navigate("/")}
          >
            <Box component="img" src="/Vector.svg"
                 sx={{ height: { xs: "36px", md: "42px" } }}
            />
            <Typography
              fontSize={{ xs: "18px", md: "24px" }}
              fontWeight="600"
              display={{ xs: "none", md: "block" }}
            >
              GanGet
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box
            display="flex"
            alignItems="center"
            border="1px solid #0B014B"
            borderRadius="8px"
            overflow="hidden"
          >
            <Input
              placeholder="Search products"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              disableUnderline
              sx={{ bgcolor: "#fff", height: "40px", p: 1, width: "260px" }}
            />
            <Box
              bgcolor="#0B014B"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => navigate("/search")}
            >
              <Search sx={{ color: "#fff" }} />
            </Box>
          </Box>

          {/* Right Section */}
          <Box display="flex" alignItems="center" justifyContent="flex-end"
               sx={{ gap: 2 }}
          >
            <Box
              display={{ xs: "none", md: "flex" }}
              alignItems="center"
              gap={1}
              sx={{ cursor: "pointer" }}
              onClick={() => handleScroll("deals")}
            >
              <Box
                component="img"
                src="/icon-park_back.svg"
                sx={{ height: "50px" }}
              />
              <Typography fontSize="16px">Amazing deals</Typography>
            </Box>

            <Divider
              sx={{
                bgcolor: "#000",
                height: "40%",
                width: "1px",
                display: { xs: "none", md: "block" },
              }}
            />

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              <Box
                component="img"
                src="/icon-park_local-two.svg"
                sx={{ height: "50px" }}
              />
              <Typography display={{ xs: "none", md: "block" }} fontSize="16px">
                Find a store
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal - Location Map */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ outline: "none" }}>
          <Map />
        </Box>
      </Modal>
    </>
  );
};

export default Searchbar;
