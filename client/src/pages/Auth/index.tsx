import Google from "./Google";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { signInWithGoogle } from "../../services/auth";
import { addNewUser } from "../../services/user";
import "./style.css";

interface AuthLogin {
  userLogin: () => void;
}

const Auth: React.FC<AuthLogin> = ({ userLogin }) => {
  const handleLogin = async (user: any) => {
    try {
      const loggedUser = await addNewUser(user);
      if (loggedUser) {
        userLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleSign = async () => {
    try {
      signInWithGoogle().then(async (res) => {
        handleLogin(res.user);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary Finder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="signIn-content">
        <Google onClick={googleSign} />
      </div>
    </IonPage>
  );
};

export default Auth;
