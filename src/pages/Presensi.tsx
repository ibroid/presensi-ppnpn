import {
  IonContent,
  IonPage,
  useIonToast,
  useIonViewDidEnter,
  IonGrid,
  IonRow,
  IonText
} from '@ionic/react';

import {
  useState
} from 'react';

import Clock from 'react-live-clock';

import 'moment/locale/id';
import '../global.css';
import { Geolocation, Position } from '@capacitor/geolocation';
import DefaultHeader from '../components/DefaultHeader';
import MapGL from '../components/MapGL';
import NoLocation from '../components/NoLocation';
import FormPresence from '../components/FormPresence';
import { PresentProvider } from '../context/PresentContext';
import usePresensiList from '../hooks/usePresensiList';


const Presensi: React.FC = () => {

  const [location, setLocation] = useState<Position>();
  const [ionToast] = useIonToast();

  const { presensi } = usePresensiList();


  useIonViewDidEnter(() => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((data: Position) => setLocation(data))
      .catch((err: any) => {
        ionToast({
          message: "Tidak ada lokasi yang ditemukan. Lokasi harus menyala saat melakukan presensi",
          duration: 2000,
          position: "bottom",
          color: "danger"
        })
      })

  }, [])

  return (
    <IonPage className="pageContainer" >
      <DefaultHeader title='Presensi' />
      <IonContent fullscreen >
        {location
          ? <LocationReady location={location} />
          : <NoLocation />}
        {presensi?.map((row: any) => <p key={row.id}>{row.waktu}</p>)}
      </IonContent>
    </IonPage>
  );
};

function LocationReady({ location }: Position | any) {

  return (
    <IonGrid className='ion-margin-top'>
      <IonRow class='ion-justify-content-center'>
        <IonText>Lokasi anda berada di bawah ini</IonText>
        <MapGL latitude={location.coords.latitude} longitude={location.coords.longitude} />
      </IonRow>
      <IonRow className='ion-justify-content-center'>
        <IonText color={"danger"}>
          <h3>
            <Clock format={'HH:mm:ss'} ticking={true} />
          </h3>
        </IonText>
      </IonRow>
      <IonRow className='ion-justify-content-center'>
        <PresentProvider>
          <FormPresence />
        </PresentProvider>
      </IonRow>
    </IonGrid>
  )
}

export default Presensi;

