import { IonButton, IonCol, IonGrid, IonIcon, IonProgressBar, IonRow, IonText } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import useTodayActivityListHook from "../hooks/useTodayActivityListHook";
import { Activity } from "../interfaces/IResponse";
import { useContext, useEffect } from "react";
import { ActivityContext } from "../context/ActivityContext";

export default function ActivityTable() {


  const { stateActivity } = useContext(ActivityContext)

  return (
    <IonGrid>
      <IonRow
        className="ion-no-margin ion-no-padding"
        style={
          {
            backgroundColor: "var(--ion-color-rose)",
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }}>
        <IonCol className="ion-no-margin" size="auto">No</IonCol>
        <IonCol>Kegiatan</IonCol>
        <IonCol>Waktu</IonCol>
        <IonCol>Catatan</IonCol>
      </IonRow>

      {/* {loading && <IonRow><IonProgressBar color={"violet"} type="indeterminate" /></IonRow>}
      {error && <IonRow className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}
       */}

      {stateActivity?.map((activity: Activity, i: number) => {
        return (
          <IonRow key={activity.id}>
            <IonCol className="ion-no-margin" size="auto">{i + 1}</IonCol>
            <IonCol className="ion-no-margin">{activity.doing}</IonCol>
            <IonCol className="ion-no-margin">{activity.doing_time}</IonCol>
            <IonCol className="ion-no-margin">{activity.note}</IonCol>
          </IonRow>
        )
      })}
    </IonGrid>
  );
}