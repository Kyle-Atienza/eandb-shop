import { create } from "zustand";

interface OptionsState {
  drawer: boolean;
  toggleDrawer: (val?: boolean) => void;
  closeDrawer: () => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  drawer: false,
  toggleDrawer: (val?: boolean) =>
    set((state) => ({ drawer: val ? val : !state.drawer })),
  closeDrawer: () => set({ drawer: false }),
}));
