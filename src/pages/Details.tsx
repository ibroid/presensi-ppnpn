import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Details: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButton slot="start">
                        <IonBackButton defaultHref="/app/tab1" />
                    </IonButton>
                    <IonTitle>Debug Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding"></IonContent>
        </IonPage>
    )
}

export default Details;