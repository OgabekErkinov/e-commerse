import { create } from "zustand";

interface AlertState {
  message: string;
  color: string;
  isAlert: boolean;
  showAlert: (message: string, color: string) => void;
}

const useAlert = create<AlertState>((set) => ({
  message: "",
  color: "",
  isAlert: false,

  showAlert: (message, color) => {
    set({ message, color, isAlert: true });
    setTimeout(() => {
      set({ isAlert: true });
    }, 2500);
  },
}));

export default useAlert;
