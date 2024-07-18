import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar, useIonToast, useIonViewDidEnter, useIonViewWillLeave } from "@ionic/react";
import { checkbox, create, bodyOutline, time, document, addCircle } from "ionicons/icons";
import { useForm } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { Activity } from "../interfaces/IResponse";
import DefaultHeader from "../components/DefaultHeader";
import ActivityTable from "../components/ActivityTable";
import { ActivityProvider } from "../context/ActivityContext";
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
            fetchActivity()
            setShowModal(false)
          }}
        />
      </IonContent>
    </IonPage>
  )
}