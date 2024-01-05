import { app } from "../utils/firebase";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): Promise<any> => {
  return signInWithPopup(auth, googleProvider);
};
