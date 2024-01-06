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
} from "@ionic/react";
import React, { useState } from "react";
import { getSummary } from "../../services/summary";
import { useMutation } from "react-query";

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summaryText, setSummaryText] = useState<string>("");

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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary Finder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
