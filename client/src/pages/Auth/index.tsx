import Google from "./Google";
import {
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { signInWithGoogle, logoutUser } from "../../services/auth";
import { addNewUser } from "../../services/user";
import "./style.css";

interface AuthLogin {
  userLogin: any;
}

const Auth: React.FC<AuthLogin> = ({ userLogin }) => {
  const handleLogin = async (user: any) => {
    try {
      const userExist = await addNewUser(user);
      if (userExist) {
        userLogin(userExist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogin = async (user: any) => {
  //   try {
  //     const loggedUser = await addNewUser(user);
  //     if (loggedUser) {
  //       userLogin();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleSign = async () => {
    try {
      signInWithGoogle().then(async (res) => {
        handleLogin(res.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      logoutUser();
      console.log("logout");
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
      <IonButton onClick={logout}>Logout</IonButton>
    </IonPage>
  );
};

export default Auth;
