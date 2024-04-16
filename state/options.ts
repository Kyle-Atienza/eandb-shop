import { create } from "zustand";

interface OptionsState {
  cart: boolean;
  toggleCart: () => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  cart: false,
  toggleCart: () => set((state) => ({ cart: !state.cart })),
}));
