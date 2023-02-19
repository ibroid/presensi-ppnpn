import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';

import './Tab1.css';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import '../components/ExploreContainer.css';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const Tab1: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  const [locationNow, setLocationNow] = useState<string>("Lokasi Belum Ditentukan");
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: "",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }


  const getLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    setLocationNow("Pengadilan Agama Jakarta Utara")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
          <capacitor-google-map ref={mapRef} style={{
            display: 'inline-block',
            width: 275,
            height: 400
          }}></capacitor-google-map>
          <button onClick={createMap}>Create Map</button>
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
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
