import Google from "./Google";
import {
  IonAvatar,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { signInWithGoogle } from "../../services/auth";
import "./style.css";
import { authStore } from "../../store/auth";
import { addNewUser } from "../../services/user";
import summary from "../../assets/summary.png";

const Auth: React.FC = () => {
  const router = useIonRouter();

  const { logIn } = authStore((state) => state);

  const googleSign = async () => {
    try {
      signInWithGoogle().then(async (res) => {
        handleLogin(res.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user: any) => {
    try {
      const userInfo = await addNewUser(user);
      if (userInfo) {
        logIn(userInfo);
        router.push("/home", "forward", "replace");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Summary Finder
          </IonTitle>
          <IonAvatar
            slot="start"
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "10px",
              margin: "10px",
            }}
          >
            <img
              src="https://www.youtubesummarized.com/logo.svg"
              alt="avatar"
            />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="auth-container">
          <div className="img-auth-container">
            <img
              src="https://miro.medium.com/v2/resize:fit:1200/1*xOPEyGvaGKRja-k3eDyCMw.png"
              alt=""
              style={{ height: "100%", borderRadius: "15px" }}
            />
          </div>
          <div className="auth-card">
            <IonTitle
              className="ion-no-padding"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "black",
                letterSpacing: "2px",
              }}
            >
              Sign In
            </IonTitle>
            <Google onClick={googleSign} />
            <img
              src={summary}
              alt=""
              style={{
                // padding: "20px",
                width: "100%",
                height: "400px",
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
