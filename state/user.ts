import { create } from "zustand";
import axios from "axios";
const API_URL = `${process.env.BASE_URL}/users`;

interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  orders: Order[];
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
  orders: [],
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
        console.log(res);
        set({ user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        console.log(data.get("email"));
        set({ isLoading: false });
      });
  },
  signOut: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
