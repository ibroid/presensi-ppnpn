import { IonAvatar, IonChip, IonHeader, IonLabel, IonTitle, IonToolbar, useIonAlert, useIonRouter } from "@ionic/react";
import { DefaultHeaderProps } from "../interfaces/IProps";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";



export default function DefaultHeader({ title }: DefaultHeaderProps) {
  const { state, deState } = useContext(AuthContext)
  const [alert] = useIonAlert()
  const route = useIonRouter()

  return (
    <IonHeader>
      <IonToolbar color={'tertiary'} >
        <IonTitle>{title}</IonTitle>
        <IonChip slot='end' onClick={() => {
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
                  deState.setToken(null)
                  deState.setUser(null)
                  route.push('/auth', "root", "replace")
                }
              }
            ]
          })
        }}>
          <IonAvatar >
            <img alt="Employee avatar" src={state.user?.employee?.photos} />
          </IonAvatar>
          <IonLabel color={"light"}>{state.user && state.user.name}</IonLabel>
        </IonChip>
      </IonToolbar>
    </IonHeader>
  )
}