import { IonAvatar, IonChip, IonHeader, IonLabel, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { DefaultHeaderProps } from "../interfaces/IProps";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../style/header.css";


export default function DefaultHeader({ title }: DefaultHeaderProps) {
  const { state, dispatch } = useContext(AuthContext)
  const [alert] = useIonAlert()
  const route = useIonRouter()

  return (
    <IonHeader class="ion-no-border">
      <IonToolbar color={'rose'} >
        <IonTitle slot="start">{title}</IonTitle>
        {state.token && <IonChip className="ion-margin-end" slot='end' onClick={() => {
          alert({
            animated: true,
            backdropDismiss: true,
            header: 'Logout ?',
            message: "Anda akan keluar dan harus login kembali saat menggunakan aplikasi",
            buttons: [
              {
                text: "Batal",
                role: "cancel",
              },
              {
                text: "Logout",
                handler: () => {
                  dispatch({ type: "SET_TOKEN", payload: null })
                  dispatch({ type: "SET_USER", payload: null })
                  route.push('/auth', "root", "pop")
                }
              }
            ]
          })
        }}>
          <IonAvatar >
            <img alt="Employee avatar" src={state.user?.employee?.photos} />
          </IonAvatar>
          <IonLabel color={"light"}>Logout</IonLabel>
        </IonChip>}

      </IonToolbar>
    </IonHeader>
  )
}