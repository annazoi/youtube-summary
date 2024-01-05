import { db } from "../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { User } from "../types/interfaces";
import { saveUser } from "../utils/storage";

export const addNewUser = async (user: any): Promise<User | null> => {
  try {
    let userToStore: User = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    if (isNewUser(user.metadata.creationTime)) {
      await setDoc(doc(db, "users", user.id), userToStore);
    }
    const finalUser = {
      ...userToStore,
      isLoggedIn: true,
    };
    saveUser(finalUser);
    return finalUser;
  } catch (e: any) {
    console.error("Error adding document: ", e);
    return null;
  }
};

const isNewUser = (creationTime: string) => {
  if (new Date().getTime() - new Date(creationTime).getTime() < 5000) {
    return true;
  }
  return false;
};
