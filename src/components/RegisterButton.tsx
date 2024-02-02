import { IonButton, IonIcon } from "@ionic/react";
import { create } from "ionicons/icons";
import React from "react";

export default function RegisterButton() {
  return (
    <IonButton
      shape="round"
      expand="block"
      color={"skyblue"}
      className="ion-margin-top"
      routerLink="/register"

    >
      <strong> Daftar</strong>
      <IonIcon
        slot="start"
        icon={create}
        className="ion-margin-end"
      ></IonIcon>
    </IonButton>
  );
}