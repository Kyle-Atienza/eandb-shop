import { create } from "zustand";
import axios from "axios";
import { useOrdersStore } from "./orders";

const API_URL = `${process.env.BASE_URL}/users`;

interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  signIn: (data: FormData) => void;
  signOut: () => void;
}

const checkSavedUser = (): User | null => {
  const localUser = localStorage.getItem("user");

  if (localUser) {
    const userData = JSON.parse(localUser) as unknown as User;

    return {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      token: userData.token,
    };
  } else {
    return null;
  }
};

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  isError: false,
  user: checkSavedUser() ?? null,
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
        set({ user: res.data });
        // useOrdersStore.setState({ cart: res.data.cart });
        localStorage.setItem("user", JSON.stringify(res.data));
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
