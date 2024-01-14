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
import React, { useState } from "react";
import { getSummary, addSummary, getSummaries } from "../../services/summary";
import { useMutation, useQuery } from "react-query";
import { logOutOutline } from "ionicons/icons";
import { logoutUser } from "../../services/auth";
import { authStore } from "../../store/auth";

const Home: React.FC = () => {
  const { photoURL, uid } = authStore();

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summaryText, setSummaryText] = useState<string>("");
  const [summaries, setSummaries] = useState<any[]>([]);

  const router = useIonRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: getSummary,
  });

  const { data, isLoading: isSummaries } = useQuery({
    queryKey: "getSummaries",
    queryFn: () => getSummaries(uid),
    onSuccess: (data) => {
      setSummaries(data);
    },
  });

  const handleUrl = (e: CustomEvent) => {
    setVideoUrl(e.detail.value!);
  };

  const logout = async () => {
    try {
      logoutUser();
      router.push("/auth", "forward", "replace");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSummary = async () => {
    try {
      mutate(videoUrl, {
        onSuccess: async (data) => {
          setSummaryText(data.summaryText);
          await addSummary({
            videoUrl,
            summaryText: data.summaryText,
            userId: uid,
          });
        },
        onError: (error) => {
          console.log(error);
        },
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
      <IonContent className="ion-padding">
        <IonItem className="ion-padding ion-margin">
          <IonInput
            placeholder="Enter a URL from youtube"
            value={videoUrl}
            onIonChange={handleUrl}
          ></IonInput>
          <IonButton expand="block" slot="end" onClick={handleSummary}>
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
        <IonLoading isOpen={isSummaries} message={"Loading..."} />
        {summaries.length > 0 && (
          <IonItem className="summaries-content">
            <p style={{ fontSize: "30px", display: "flex" }}>
              Previous Summaries
            </p>
            {summaries.map((summary, index) => (
              <div key={index}>
                <p style={{ fontWeight: "600" }}>{summary.videoUrl}</p>
                <p key={index}>{summary.summaryText}</p>
              </div>
            ))}
          </IonItem>
        )}
        <IonFab slot="fixed" horizontal="end" vertical="top" edge={true}>
          <IonFabButton>
            <img src={photoURL}></img>
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
