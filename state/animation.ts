import { create } from "zustand";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AnimationState {
  isPageLoading: boolean;
  pageOutHref: string;
  router: AppRouterInstance | null;
  animatePageOut: (href: string, router?: AppRouterInstance) => void;
  setIsPageLoading: (val: boolean) => void;
  redirect: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPageLoading: false,
  pageOutHref: "",
  router: null,
  animatePageOut: (href: string, router?: AppRouterInstance) =>
    set({ pageOutHref: href, router }),
  setIsPageLoading: (val: boolean) => set({ isPageLoading: val }),
  redirect: () => {
    const href = useAnimationStore.getState().pageOutHref;
    set({ isPageLoading: true });
    useAnimationStore.getState().router?.push(href);
    set({ pageOutHref: "", router: null });
  },
}));
