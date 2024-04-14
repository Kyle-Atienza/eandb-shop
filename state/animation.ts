import { create } from "zustand";

interface ProductCardHoveredState {
  top: number;
  left: number;
  width: number;
  height: number;
  setValues: (top: number, left: number, width: number, height: number) => void;
}

export const useProductCardHoveredStore = create<ProductCardHoveredState>(
  (set) => ({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    setValues: (top: number, left: number, width: number, height: number) =>
      set({ top, left, width, height }),
  })
);
