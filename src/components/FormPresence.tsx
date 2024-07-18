import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react";
import { locationSharp } from "ionicons/icons";
import "../style/presensi.css";
import ModalPresence from "./ModalPresence";
import { useContext, useState } from "react";
import { PresentContext } from "../context/PresentContext";

export default function FormPresence() {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { dispatch, state } = useContext(PresentContext);
  function startPresent(session: number) {
    dispatch!({ type: "SET_SESSION", payload: session });
    setModalOpen(true);
  }

  return (
    <IonGrid>
      <IonRow className="table-header">
        <IonCol>Sesi</IonCol>
        <IonCol>Waktu</IonCol>
        <IonCol>Aksi</IonCol>
      </IonRow>
      <div className="table-body">
        <IonRow className="align-items-center">
          <IonCol>
            <IonText color="warning">
              Masuk
            </IonText>
          </IonCol>
          <IonCol>
            <IonText>
              {state.todayPresence?.find((p) => {
                return p.session === 1
              })?.present_time ?? "Belum Presensi"}
            </IonText>
          </IonCol>
          <IonCol>
            <IonButton onClick={() => startPresent(1)} color={"amber"} >
              <IonIcon slot="start" icon={locationSharp}></IonIcon>
              Check
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="align-items-center">
          <IonCol>
            <IonText color="skyblue">
              Pulang
            </IonText>
          </IonCol>
          <IonCol>
            <IonText>
              {state.todayPresence?.find((p) => {
                return p.session === 2
              })?.present_time ?? "Belum Presensi"}
            </IonText>
          </IonCol>
          <IonCol>
            <IonButton onClick={() => startPresent(2)} >
              <IonIcon slot="start" icon={locationSharp}></IonIcon>
              Check
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
      <ModalPresence close={() => setModalOpen(false)} isOpen={modalOpen} />
    </IonGrid>
  )
}