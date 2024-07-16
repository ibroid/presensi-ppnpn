import {
  IonContent,
  IonPage,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
  useIonActionSheet,
} from '@ionic/react';

import {
  useCallback,
  useContext,
  useState
} from 'react';

import Clock from 'react-live-clock';

import 'moment/locale/id';
import '../global.css';
import { Geolocation, Position } from '@capacitor/geolocation';
import { locate, moon, sunny } from 'ionicons/icons';
import { httpInstance } from '../utils/HttpClient';
import { AuthContext } from '../context/AuthContext';
import { AxiosError } from 'axios';
import { CreatePresenceResponse, Presence } from '../interfaces/IResponse';
import DefaultHeader from '../components/DefaultHeader';
import MapGL from '../components/MapGL';
import NoLocation from '../components/NoLocation';


const Presensi: React.FC = () => {

  const [location, setLocation] = useState<Position>();

  let abortController: { signal: AbortSignal; abort: () => void };
  const [ionToast] = useIonToast();


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

  }, [location])

  useIonViewWillLeave(() => abortController.abort())

  return (
    <IonPage className="pageContainer" >
      <DefaultHeader title='Presensi' />
      <IonContent fullscreen >
        {location ? <MapGL latitude={location.coords.latitude} longitude={location.coords.longitude} /> : <NoLocation />}

      </IonContent>
    </IonPage>
  );
};

export default Presensi;

