import { app } from "../utils/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

// onAuthStateChanged(auth, async (user) => {
//   console.log("onAuthStateChanged", user);
//   if (user) {
//     await addNewUser(user);
//   } else {
//     console.log("no user");
//   }
// });

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
