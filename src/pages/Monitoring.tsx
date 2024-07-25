import { IonCol, IonContent, IonGrid, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonRow, IonText, RefresherEventDetail } from "@ionic/react";
import DefaultHeader from "../components/DefaultHeader";
import { useMemo } from "react";
import useMonitoringList from "../hooks/useMonitoringList";
import { PegawaiWithPresenceToday } from "../interfaces/IResponse";

export default function Monitoring() {

  const { data, error, errorMessage, isLoading, fetchMonitor } = useMonitoringList();

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    fetchMonitor().finally(() => event.detail.complete());
  }

  const todayDate = useMemo(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }, [])

  return (
    <IonPage>
      <DefaultHeader title="Monitoring" />
      <IonContent className="ion-padding" fullscreen>
        <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh} >
          <IonRefresherContent className="ion-margin-top" refreshingSpinner="lines" >
          </IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-start">Monitor Presensi</IonCol>
            <IonCol className="ion-text-end">{todayDate}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="auto" className="ion-text-start">Sudah Presensi</IonCol>
            <IonCol size="auto" className="ion-text-start">: {data.total_sudah}</IonCol>
            <IonCol className="ion-text-end">Belum Presensi</IonCol>
            <IonCol size="auto" className="ion-text-center">: {data.total_belum}</IonCol>
          </IonRow>
          <IonRow style={{ backgroundColor: "var(--ion-color-rose)" }} className="ion-no-margin">
            <IonCol size="auto">
              <IonText color={"light"}>No</IonText>
            </IonCol>
            <IonCol>
              <IonText color={"light"}>Nama</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonText color={"light"}>Masuk</IonText>
            </IonCol>
            <IonCol size="auto">
              <IonText color={"light"}>Pulang</IonText>
            </IonCol>
          </IonRow>
          {isLoading && <IonRow><IonProgressBar color={"violet"} type="indeterminate" /></IonRow>}
          {error && <IonRow className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}

          {data?.list?.map((monitor: PegawaiWithPresenceToday, i: number) =>
            <IonRow key={monitor.id} style={{
              border: "2px solid var(--ion-color-violet)",
              backgroundColor: (monitor.masuk) ? "var(--ion-color-lime)" : "var(--ion-color-danger)"
            }}>
              <IonCol size="auto">{i + 1}.</IonCol>
              <IonCol className="ion-text-start">{monitor.fullname}</IonCol>
              <IonCol size="auto" className="ion-text-center">{monitor?.masuk ?? "00:00"}</IonCol>
              <IonCol size="auto" className="ion-text-center">{monitor?.pulang ?? "00:00"}</IonCol>
            </IonRow>)}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}