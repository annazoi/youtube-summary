import Google from "./Google";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { signInWithGoogle } from "../../services/auth";
import "./style.css";
import { authStore } from "../../store/auth";
import { addNewUser } from "../../services/user";

interface AuthLogin {
  userLogin: () => void;
}

const Auth: React.FC = () => {
  const router = useIonRouter();

  const { logIn } = authStore((state) => state);

  const googleSign = async () => {
    try {
      signInWithGoogle().then(async (res) => {
        handleLogin(res.user);
        console.log(res, "res");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user: any) => {
    try {
      const userInfo = await addNewUser(user);
      console.log(userInfo, "userInfo");
      if (userInfo) {
        logIn(userInfo);
        router.push("/home", "forward", "replace");
        window.location.reload();
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary Finder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div className="ion-text-center ion-padding">
                {/* <img src={FCC} alt="FCC Logo" width={"50%"} /> */}
              </div>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              {/* <IonImg src={Logo} alt="logo" class="ion-padding"></IonImg> */}
              <IonCard>
                <IonCardContent>
                  <h1 className="signIn-content">Sign In</h1>
                  <div className="signIn-contact">
                    <Google onClick={googleSign} />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
