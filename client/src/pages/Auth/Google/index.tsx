import { FC } from "react";

interface GoogleLogin {
  onClick: () => void;
}

import { IonIcon, IonLabel, IonButton } from "@ionic/react";
import React from "react";
import { logoGoogle } from "ionicons/icons";

const Google: React.FC<GoogleLogin> = ({ onClick }) => {
  return (
    <IonButton size="large" onClick={onClick}>
      <IonIcon slot="start" icon={logoGoogle} size="large"></IonIcon>
      <IonLabel slot="end">Sign in with Google</IonLabel>
    </IonButton>
  );
};

export default Google;
