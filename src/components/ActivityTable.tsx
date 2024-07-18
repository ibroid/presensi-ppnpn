import { IonCol, IonGrid, IonProgressBar, IonRow, IonText } from "@ionic/react";
import { Activity } from "../interfaces/IResponse";


export type ActivityTableProps = {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  stateActivity: Activity[],
}

export default function ActivityTable({
  error, errorMessage, loading, stateActivity
}: ActivityTableProps
) {

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

      {loading && <IonRow><IonProgressBar color={"violet"} type="indeterminate" /></IonRow>}
      {error && <IonRow className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}


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