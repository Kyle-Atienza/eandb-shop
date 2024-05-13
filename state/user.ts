import { create } from "zustand";
import axios from "axios";
import { useOrdersStore } from "./orders";
import { useOptionsStore } from "./options";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;

const localUserData = (user: User) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: user.token,
    defaults: user.defaults,
  };
};

interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  signIn: (data: FormData) => void;
  updateMe: (data: FormData) => void;
  signOut: () => void;
  checkSavedUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  isError: false,
  user: null,
  checkSavedUser: () => {
    const localUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (localUser) {
      const userData = JSON.parse(localUser) as User;

      set({
        user: localUserData(userData),
      });
    } else {
      set({ user: null });
    }
  },
  signIn: async (data: FormData) => {
    set({ isLoading: true, isError: false });

    await axios({
      method: "post",
      url: `${API_URL}/signin`,
      data: {
        email: data.get("email"),
        password: data.get("password"),
      },
    })
      .then((res) => {
        set({ user: localUserData(res.data) });
        localStorage.setItem("user", JSON.stringify(localUserData(res.data)));
        useOptionsStore.getState().closeDrawer();
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  updateMe: async (data: FormData | JSON) => {
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .put(`${API_URL}/profile`, data, config)
      .then((res) => {
        console.log(res);
        // handle this
        /* set({ user: localUserData(res.data) });
        localStorage.setItem("user", JSON.stringify(localUserData(res.data))); */
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  signOut: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
