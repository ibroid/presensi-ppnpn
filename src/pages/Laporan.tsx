import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import DefaultHeader from "../components/DefaultHeader";
import { useState } from "react";
import PresentReport from "../components/PresentReport";
import ActivityReport from "../components/ActivityReport";
export default function Laporan() {
  const [segment, setSegment] = useState("present")


  return (
    <IonPage>
      <DefaultHeader title="Laporan" />
      <IonContent fullscreen className="ion-padding">
        <IonSegment
          mode="ios"
          value={segment}
          style={{ backgroundColor: "var(--ion-color-violet)" }}
          onIonChange={(e) => setSegment(e.detail.value?.toString() ?? "present")}
        >
          <IonSegmentButton value="present" >
            <IonLabel>Kehadiran</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="activity">
            <IonLabel>Kegiatan</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {
          segment === "present" ? <PresentReport /> : <ActivityReport />
        }
      </IonContent>
    </IonPage >
  )
}

