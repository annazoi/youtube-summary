import { app } from "../utils/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): Promise<any> => {
  try {
    return signInWithPopup(auth, googleProvider);
  } catch (e: any) {
    console.error("Error signing in with Google: ", e);
    return Promise.reject(e);
  }
};

export const getLoggedUser = () => {
  return auth.currentUser;
};

export const logoutUser = () => {
  auth.signOut().then(() => {});
};
