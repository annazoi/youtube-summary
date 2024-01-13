import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonFabButton,
  IonFab,
  IonFabList,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getSummary } from "../../services/summary";
import { addNewUser } from "../../services/user";
import { useMutation, useQuery } from "react-query";
import { logOutOutline } from "ionicons/icons";
import { logoutUser } from "../../services/auth";
import { authStore } from "../../store/auth";

const Home: React.FC = () => {
  const { photoURL } = authStore();

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summaryText, setSummaryText] = useState<string>("");

  const router = useIonRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: getSummary,
    onSuccess: (data) => {
      console.log(data);
      setSummaryText(data.summaryText);
    },
  });

  const handleUrl = (e: CustomEvent) => {
    setVideoUrl(e.detail.value!);
  };

  const summary = () => {
    mutate(videoUrl);
  };

  const logout = async () => {
    try {
      logoutUser();
      router.push("/auth", "forward", "replace");
      // window.location.reload();
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
      <IonContent className="ion-padding">
        <IonItem>
          <img src={photoURL} alt="user" />
        </IonItem>
        <IonItem className="ion-padding ion-margin">
          <IonInput
            placeholder="Enter a URL from youtube"
            value={videoUrl}
            onIonChange={handleUrl}
          ></IonInput>
          <IonButton expand="block" slot="end" onClick={summary}>
            GET SUMMARY
          </IonButton>
        </IonItem>
        <IonLoading isOpen={isLoading} message={"Loading..."} />
        {summaryText && (
          <IonItem>
            <p>Summary</p>
            <p>{summaryText}</p>
          </IonItem>
        )}
        <IonFab slot="fixed" horizontal="end" vertical="top" edge={true}>
          <IonFabButton>
            <IonIcon></IonIcon>
          </IonFabButton>
          <IonFabList side="start">
            <IonFabButton onClick={logout}>
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
