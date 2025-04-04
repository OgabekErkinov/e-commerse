import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const AddProductModal = ({ open, onClose, onAdd, editProduct }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    } else {
      setProduct({ title: "", price: "", category: "", description: "", image: "" });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!product.title || !product.price || !product.category) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }
    onAdd(product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish"}</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Nomi"
          fullWidth
          margin="dense"
          value={product.title}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Narxi ($)"
          type="number"
          fullWidth
          margin="dense"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          select
          name="category"
          label="Kategoriya"
          fullWidth
          margin="dense"
          value={product.category}
          onChange={handleChange}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="description"
          label="Tavsif"
          multiline
          rows={3}
          fullWidth
          margin="dense"
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          name="image"
          label="Rasm URL"
          fullWidth
          margin="dense"
          value={product.image}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Bekor qilish
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Saqlash
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
