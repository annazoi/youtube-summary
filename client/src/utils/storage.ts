import { User } from "../types/interfaces";
import { login, logout } from "../validation/auth/authSlice";
import store from "../validation/store";

export const saveUser = async (user: User) => {
  store.dispatch(login(user));
  localStorage.setItem("user", JSON.stringify(user));
};
