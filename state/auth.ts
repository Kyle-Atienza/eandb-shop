import { create } from "zustand";

interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User;
  orders: Order[];
}
