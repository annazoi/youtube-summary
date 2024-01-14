import Axios from "axios";
import { API_URL } from "../constants";
import { db } from "../utils/firebase";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { uid } from "uid";

export const getSummary = async (url: string) => {
  try {
    const response = await Axios.post(`${API_URL}/summary`, { url });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addSummary = async (payload: any) => {
  try {
    let summaryToStore = {
      videoUrl: payload.videoUrl,
      summaryText: payload.summaryText,
      userId: payload.userId,
    };
    const newSummary = await setDoc(
      doc(db, "summaries", uid()),
      summaryToStore
    );
    return newSummary;
  } catch (e: any) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const getSummaries = async (userId: string) => {
  try {
    let summaries: any[] = [];
    const docRef = collection(db, "summaries");
    const q = query(docRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      summaries.push(doc.data());
    });

    return summaries;
  } catch (e: any) {
    console.error("Error adding document: ", e);
    return [];
  }
};
