import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  uid: string;
  photoURL: string;
  displayName: string;
  logOutUser: () => void;
  logIn: (payload: any) => void;
}

const initialStateValues: any = {
  isLoggedin: false,
  uid: "",
  photoURL: "",
  displayName: "",
};

export const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,

        logOutUser: () =>
          set({
            ...initialStateValues,
          }),

        logIn: (payload: any) => {
          console.log(payload, "payload");
          set({
            ...payload,
          });
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export const getAuthState = () => {
  return authStore.getState();
};
