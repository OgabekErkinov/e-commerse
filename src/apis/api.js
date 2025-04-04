import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// Products APIs
export const getProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axiosInstance.post("/products", product);
  return data;
};

export const updateProduct = async (id, updatedProduct) => {
  const { data } = await axiosInstance.put(`/products/${id}`, updatedProduct);
  return data;
};

export const deleteProduct = async (id) => {
  await axiosInstance.delete(`/products/${id}`);
};

// Users APIs
export const getUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const addUser = async (user) => {
  const { data } = await axiosInstance.post("/users", user);
  return data;
};

export const updateUser = async (id, updatedUser) => {
  const { data } = await axiosInstance.put(`/users/${id}`, updatedUser);
  return data;
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/users/${id}`);
};
