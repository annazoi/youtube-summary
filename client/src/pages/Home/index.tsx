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
import { getSummary, addSummary } from "../../services/summary";
import { addNewUser } from "../../services/user";
import { useMutation, useQuery } from "react-query";
import { add, logOutOutline } from "ionicons/icons";
import { logoutUser } from "../../services/auth";
import { authStore } from "../../store/auth";
import { useParams } from "react-router";

const Home: React.FC = () => {
  const { photoURL, displayName } = authStore();

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

  const summaries = [];

  const handlSummary = async (summary: any) => {
    try {
      const summaryInfo = await addSummary(summary);
      if (summaryInfo) {
        summaries.push(summaryInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const summary = {
      videoUrl: videoUrl,
      summaryText: summaryText,
      id: "1",
    };
    console.log(summary);
    handlSummary(summary);
  }, [summaryText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary Finder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
            <img src="https://lh3.googleusercontent.com/a/ACg8ocL2lSL1QA_n-1qd_u5lyWsNNodmxd3Bkx4lSDqQ7S5KuPE=s96-c"></img>
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
