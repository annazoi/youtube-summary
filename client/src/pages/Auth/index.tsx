import Google from "./Google";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { signInWithGoogle } from "../../services/auth";

const Auth: React.FC = () => {
  // const googleSign = async () => {
  //   try {
  //     signInWithGoogle().then(async (res) => {
  //       // handleLogin(res.user);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page Title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Google />
      </IonContent>
    </IonPage>
  );
};

export default Auth;
