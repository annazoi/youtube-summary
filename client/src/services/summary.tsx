import Axios from "axios";
import { API_URL } from "../constants";
import { db } from "../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const getSummary = async (url: string) => {
  try {
    const response = await Axios.post(`${API_URL}/summary`, { url });
    return response.data;
  } catch (error) {
    return error;
  }
};

// export const getSummaries = async (summary: any) => {
//   try {
//     const docRef = await setDoc(doc(db, "summaries", summary.id), summary);
//     console.log("Document written with ID: ", docRef);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

export const addSummary = async (payload: any) => {
  try {
    let summaryToStore = {
      videoUrl: payload.videoUrl,
      summaryText: payload.summaryText,
      id: payload.id,
    };

    const finalSummary = {
      ...summaryToStore,
      isLoggedIn: true,
    };
    return finalSummary;
  } catch (e: any) {
    console.error("Error adding document: ", e);
    return null;
  }
};
