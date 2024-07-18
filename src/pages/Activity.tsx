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


type ActivityModel = {
  doing: string;
  doing_time: string;
  note: string;
}



export default function Activities() {
  const { handleSubmit, formState: { errors }, register, reset } = useForm<ActivityModel>();
  const { state } = useContext(AuthContext);
  const [toast] = useIonToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataActivity, setDataActivity] = useState<Activity[]>([]);

  let abortController: { signal: AbortSignal; abort: () => void };

  const validSubmit = (data: ActivityModel) => {
    setLoading(true);
    httpInstance(state.token).post("/activity", data)
      .then((res) => {
        setDataActivity([...dataActivity, res.data.data])
        toast({
          message: res.data.message,
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

      .finally(() => setLoading(false))
  }

  useIonViewDidEnter(() => {
    setLoading(true)

    abortController = new AbortController()
    const signal = abortController.signal

    httpInstance(state.token).get<Activity[]>("/activity", { signal })
      .then((res) => { setDataActivity(res.data) })
      .catch((err: any) => {
        if (err.code === "ERR_CANCELED") {
          return;
        }
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

      .finally(() => setLoading(false))
  })

  useIonViewWillLeave(() => abortController.abort())

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
              <IonButton size="small" color={"skyblue"}>
                <IonIcon slot="start" icon={addCircle} />
                Tambah</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <ActivityProvider>
          <ActivityTable />
        </ActivityProvider>
        {/* <form onSubmit={handleSubmit(validSubmit)}>
          <IonList>
            <IonItem>
              <IonIcon slot="start" icon={create} color={"primary"} />
              <IonListHeader>
                <IonText><p>Form Aktivitas Keberihan</p> </IonText>
              </IonListHeader>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" icon={bodyOutline} color={"tertiary"} size="small" />
              <IonSelect label="Aktivitas :" interface="action-sheet" {...register("doing", { required: "Tidak Boleh Kosong" })} >
                <IonSelectOption >Mengepel</IonSelectOption>
                <IonSelectOption >Menyapu</IonSelectOption>
                <IonSelectOption >Mengelap</IonSelectOption>
                <IonSelectOption >Membuang Sampah</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" icon={time} color={"tertiary"} size="small" />
              <IonInput label="Waktu :" type="time" {...register("doing_time", { required: "Tidak Boleh Kosong" })} />
            </IonItem>
            <IonItem>
              <IonIcon slot="start" icon={document} color={"tertiary"} size="small" />
              <IonTextarea placeholder="Kosongkan apabila tidak ada" label="Catatan" {...register("note")} />
            </IonItem>
            {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
          </IonList>
          <IonButton disabled={loading} expand="full" type="submit">Simpan Aktivitas</IonButton>
        </form> */}
        {/* <IonList>
          <IonItem>
            <IonIcon slot="start" icon={checkbox} color={"primary"} />
            <IonListHeader>
              <IonText><p>Aktivitas Kebersihan Hari Ini</p> </IonText>
            </IonListHeader>
          </IonItem>
          {dataActivity.length === 0 && <IonItem>
            <IonText>Belum ada aktivitas</IonText>
          </IonItem>}
          {dataActivity.map((activity, index) => (
            <IonItem key={index}>
              <IonLabel>
                <IonText>
                  <h3>{++index}. {activity.doing}</h3>
                </IonText>
                <p>{activity.doing_time}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonPage>
  )
}