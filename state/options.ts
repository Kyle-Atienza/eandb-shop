import { create } from "zustand";

interface OptionsState {
  cart: boolean;
  toggleCart: (val?: boolean) => void;
  closeCart: () => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  cart: false,
  toggleCart: (val?: boolean) =>
    set((state) => ({ cart: val ? val : !state.cart })),
  closeCart: () => set({ cart: false }),
}));
