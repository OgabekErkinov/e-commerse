import { Product } from "@/interface/interfaces";
import { create } from "zustand";

const getLocalStorage = (key: string, defaultValue: any) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

interface StoreState {
  searchInputValue: string;
  setSearchInputValue: (payload: string) => void;

  searchCategory: string;
  setSearchCategory: (payload: string) => void;

  isLoading: boolean;
  setIsLoading: () => void;

  carts: Product[];
  setCarts: (payload: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;

  favourites: Product[];
  setFavourites: (payload: Product[]) => void;
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
  // Search values
  searchInputValue: "",
  setSearchInputValue: (payload) => set({ searchInputValue: payload }),

  searchCategory: "",
  setSearchCategory: (payload) => set({ searchCategory: payload }),

  isLoading: false,
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),

  // Savat va Sevimlilar
  carts: getLocalStorage("carts", []),
  setCarts: (payload) => {
    localStorage.setItem("carts", JSON.stringify(payload));
    set({ carts: payload });
  },

  addToCart: (product) =>
    set((state) => {
      const updatedCarts = [...state.carts, product];
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      return { carts: updatedCarts };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCarts = state.carts.filter((item) => item.id !== id);
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      return { carts: updatedCarts };
    }),

  favourites: getLocalStorage("favourites", []),
  setFavourites: (payload) => {
    localStorage.setItem("favourites", JSON.stringify(payload));
    set({ favourites: payload });
  },

  addToFavourites: (product) =>
    set((state) => {
      const updatedFavourites = [...state.favourites, product];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),

  removeFromFavourites: (id) =>
    set((state) => {
      const updatedFavourites = state.favourites.filter(
        (item) => item.id !== id,
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),
}));

export default useStore;
