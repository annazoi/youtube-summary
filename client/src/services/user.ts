import { db } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { User } from "../types/interfaces";

export const addNewUser = async (user: any): Promise<User | null> => {
  try {
    let userToStore: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    if (isNewUser(user.metadata.creationTime)) {
      const newUser = await setDoc(doc(db, "users", user.uid), userToStore);
      console.log("Document written with ID: ", newUser);
    }
    const finalUser = {
      ...userToStore,
      isLoggedIn: true,
    };
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
