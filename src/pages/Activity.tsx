import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText
} from "@ionic/react";

import { addCircle } from "ionicons/icons";
import { useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import ActivityTable from "../components/ActivityTable";
import useTodayActivityListHook from "../hooks/useTodayActivityListHook";
import ModalActivity from "../components/ModalActivity";

export default function Activities() {

  const { error, loading, activities, errorMessage, fetchActivity } = useTodayActivityListHook()
  const [showModal, setShowModal] = useState(false)

  return (
    <IonPage>
      <DefaultHeader title="Aktivitas" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonText>Aktivitas Hari Ini</IonText>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton
                onClick={() => setShowModal(true)}
                size="small"
                color={"skyblue"}>
                <IonIcon slot="start" icon={addCircle} />
                Tambah</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <ActivityTable loading={loading} error={error} errorMessage={errorMessage} stateActivity={activities} />
        <ModalActivity
          isOpen={showModal}
          close={() => setShowModal(false)}
          saveCallback={() => {
            setShowModal(false)
            fetchActivity()
          }}
        />
      </IonContent>
    </IonPage>
  )
}