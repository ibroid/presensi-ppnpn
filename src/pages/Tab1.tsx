import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';

import './Tab1.css';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import '../components/ExploreContainer.css';
import { useRef } from 'react';

const Tab1: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  const [locationNow, setLocationNow] = useState<string>("Lokasi Belum Ditentukan");


  const getLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    setLocationNow("Pengadilan Agama Jakarta Utara")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class='ion-background-primary'>
          <IonTitle size="large">Presensi Kehadiran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Presensi Kehadiran</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonGrid>
            <IonRow>
              <IonCol size="12" ><strong>{locationNow}</strong></IonCol>
              <IonCol size="12" ><IonCol><p>{locationNow}</p></IonCol></IonCol>
              <IonCol size="12" ><IonSpinner /></IonCol>
              <IonCol size="12" >
                <IonButton onClick={() => getLocation()}>
                  Dapatkan Lokasi
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton routerLink='/app/tab1/details'>
                  Debug Detail
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
