import { create } from "zustand";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AnimationState {
  isPageLoading: boolean;
  preloading: boolean;
  pageOutHref: string;
  router: AppRouterInstance | null;
  animatePageOut: (href: string, router?: AppRouterInstance) => void;
  setIsPageLoading: (val: boolean) => void;
  setPreloading: (val: boolean) => void;
  redirect: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPageLoading: false,
  preloading: false,
  pageOutHref: "",
  router: null,
  animatePageOut: (href: string, router?: AppRouterInstance) =>
    set({ pageOutHref: href, router }),
  setIsPageLoading: (val: boolean) => set({ isPageLoading: val }),
  setPreloading: (val: boolean) => set({ preloading: val }),
  redirect: () => {
    const href = useAnimationStore.getState().pageOutHref;
    set({ isPageLoading: true });
    useAnimationStore.getState().router?.push(href);
    set({ pageOutHref: "", router: null });
  },
}));
