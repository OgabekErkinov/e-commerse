import axios from "axios";
import { Product } from "@/interface/interfaces";

export const getProducts = async () =>
  axios.get<Product[]>("https://json-server-oa7o.onrender.com/products");
export const getCarts = async () =>
  axios.get<Product[]>("https://json-server-oa7o.onrender.com/carts");
export const getFavourites = async () =>
  axios.get<Product[]>("https://json-server-oa7o.onrender.com/favourites");

export const deleteCarts = async () =>
  axios.delete("https://json-server-oa7o.onrender.com/carts");
export const deleteCart = async (product: Product) =>
  axios.delete(`https://json-server-oa7o.onrender.com/carts/${product.id}`);
export const clearCarts = async () =>
  axios.delete("https://json-server-oa7o.onrender.com/carts");

export const updateCarts = async ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => axios.patch(`https://json-server-oa7o.onrender.com/carts/${product.id}`, { quantity });

export const updateFavourites = async ({ product }: { product: Product }) =>
  axios.post<Product>("https://json-server-oa7o.onrender.com/favourites", product);

export const deleteFavourite = async (product: Product) =>
  axios.delete(`https://json-server-oa7o.onrender.com/favourites/${product.id}`);
export const clearFavourites = async () =>
  axios.delete("https://json-server-oa7o.onrender.com/favourites");
