import { app } from "../utils/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { addNewUser } from "./user";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    addNewUser(user);
    return;
  }
});

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): Promise<any> => {
  return signInWithPopup(auth, googleProvider);
};

export const getLoggedUser = () => {
  return auth.currentUser;
};

export const logoutUser = () => {
  auth.signOut().then(() => {});
};
