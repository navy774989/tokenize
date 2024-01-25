import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { LoginResponse } from "../lib/httpClient/types/Login";
interface UserStoreProps {
  userData?: LoginResponse;
  deviceToken?: string;
  updateUserData: (userData: UserStoreProps["userData"]) => void;
}

export const useUserStore = create<UserStoreProps>((set) => ({
  userData: undefined,
  updateUserData: (userData) => {
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    set({ userData });
  },
}));
