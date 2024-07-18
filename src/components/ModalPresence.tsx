import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  useIonLoading,
  useIonToast
} from "@ionic/react";
import { useCallback, useContext, useRef, useState } from "react";
import "../style/modal.css";
import { closeOutline, locationOutline } from "ionicons/icons";
import { httpInstance } from "../utils/HttpClient";
import { CreatePresenceResponse } from "../interfaces/IResponse";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";
import { PresentContext } from "../context/PresentContext";

type ModalPresenceProps = {
  isOpen: boolean;
  close: () => void;
}

export default function ModalPresence({ isOpen, close }: ModalPresenceProps) {
  const modal = useRef<HTMLIonModalElement>(null);
  const { state: authState } = useContext(AuthContext);
  const [presentStatus, setPresentStatus] = useState();
  const [loadingStart, loadingClose] = useIonLoading();
  const [toast] = useIonToast();

  const { state: presentState, dispatch } = useContext(PresentContext)

  const getTodayDateYmd = useCallback(() => {
    const date = new Date();
    return date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
  }, [])

  const savePresent = useCallback(() => {
    if (presentStatus === 0) {
      close()
      return;
    }

    loadingStart({
      message: "Loading...",
      spinner: "dots",
    })

    const todayYmd = getTodayDateYmd();


    httpInstance(authState.token).post<CreatePresenceResponse>("/presence", {
      session: presentState.session,
      location: presentState.location?.coords.latitude + " " + presentState.location?.coords.longitude,
      present_date: todayYmd,
      status: presentStatus
    })
      .then((res) => {
        dispatch!({ type: "SET_TODAY_PRESENT", payload: presentState.todayPresence.concat(res.data.data) })
        toast({
          message: res.data.status,
          duration: 5000,
          color: 'success',
          buttons: [
            {
              text: "Tutup",
              role: "cancel",
            }
          ]
        })
      })
      .catch((err: any) => {
        let errorMessage: string = ""
        if (err instanceof AxiosError && err.isAxiosError) {
          errorMessage = err.response?.data.message ?? err.response?.data.error.message;
        } else {
          errorMessage = err.message;
        }

        toast({
          message: errorMessage,
          duration: 5000,
          color: 'danger',
          buttons: [
            {
              text: "Tutup",
              role: "cancel",
            }
          ]
        })
      })
      .finally(() => loadingClose().then(() => close()))



  }, [presentStatus, loadingStart, getTodayDateYmd, authState.token, presentState.session, presentState.location?.coords.latitude, presentState.location?.coords.longitude, presentState.todayPresence, close, dispatch, toast, loadingClose])

  return (
    <IonModal backdropDismiss={false} id="modal-presence" ref={modal} isOpen={isOpen}>
      <div className="wrapper">
        <IonGrid>
          <IonRow id="modal-title" className="ion-justify-content-between align-items-center">
            <IonCol size="auto">
              <IonText color={presentState.session === 1 ? "warning" : "skyblue"}>
                <h4>
                  Pilih Salah Satu
                </h4>
              </IonText>
            </IonCol>
            <IonCol className="ion-no-padding ion-no-margin">
              <IonButton onClick={close} size="small" className="ion-no-margin ion-no-padding" fill="clear" >
                <IonIcon slot="icon-only" icon={closeOutline} color={presentState.session === 1 ? "warning" : "skyblue"} />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonRadioGroup allowEmptySelection onIonChange={e => setPresentStatus(e.detail.value)}>
              <IonGrid id="radio-presence">
                <IonRow>
                  <IonRadio value={1} alignment="start">Hadir</IonRadio>
                </IonRow>
                <IonRow>
                  <IonRadio value={3} alignment="start">Sakit</IonRadio>
                </IonRow>
                <IonRow>
                  <IonRadio value={4} alignment="start">Ijin</IonRadio>
                </IonRow>
                <IonRow>
                  <IonRadio value={2} alignment="start">Cuti</IonRadio>
                </IonRow>
                <IonRow>
                  <IonRadio value={5} alignment="start">Dinas Luar</IonRadio>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            {presentStatus && <IonButton color={presentState.session === 1 ? "warning" : "skyblue"} onClick={savePresent}>
              <IonIcon slot="start" icon={locationOutline} />
              Simpan
            </IonButton>}
          </IonRow>
        </IonGrid>
      </div>
    </IonModal>
  );
}