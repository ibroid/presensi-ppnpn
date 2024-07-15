import {
  IonContent,
  IonPage,
  IonProgressBar,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
  useIonActionSheet,
  IonGrid,
  IonRow,
  IonCol
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


const Presensi: React.FC = () => {

  const { state } = useContext(AuthContext);
  const [location, setLocation] = useState<Position>();
  const [toast] = useIonToast()
  const [dataPresensiDatang, setDataPresensiDatang] = useState<Presence>();
  const [dataPresensiPulang, setDataPresensiPulang] = useState<Presence>();
  const [selectedPresenceDate, setSelectedPresenceDate] = useState<string | null>();
  const [actionSheet] = useIonActionSheet();

  let abortController: { signal: AbortSignal; abort: () => void };

  const savePresensi = useCallback(async (session: number, status: number) => {

    const date = new Date();
    const todayYmd =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    httpInstance(state.token).post<CreatePresenceResponse>("/presence", {
      session: session,
      location: location,
      present_date: selectedPresenceDate ?? todayYmd,
      status: status
    })
      .then((res) => {
        if (res.data.data.session === 1) {
          setDataPresensiDatang(res.data.data)
        } else {
          setDataPresensiPulang(res.data.data)
        }

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

  }, [location, selectedPresenceDate])

  const statusOption = useCallback((session: number) => {
    actionSheet({
      buttons: [
        {
          text: 'Hadir',
          role: 'destructive',
          data: {
            action: 'cancel',
          },
          handler() {
            savePresensi(session, 1)
          },
        },
        {
          text: 'Tidak Hadir',
          data: {
            action: 'cancel',
          },
          handler() {
            savePresensi(session, 3)
          },
        },
        {
          text: 'Cuti',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler() {
            savePresensi(session, 2)
          },
        },
      ],
    })
  }, [location])

  const fetchPresensi = useCallback(async (selectedDate: string) => {
    abortController = new AbortController()
    const signal = abortController.signal;

    httpInstance(state.token).get<Presence[]>("/presence?date=" + selectedDate, { signal })
      .then((res) => {
        if (res.data.length === 0) {
          setDataPresensiDatang(undefined)
          setDataPresensiPulang(undefined)
          return;
        }

        res.data.forEach((presensi) => {
          if (presensi.session === 1) {
            setDataPresensiDatang(presensi)
          } else {
            setDataPresensiPulang(presensi)
          }
        })
      })
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

  }, [])

  useIonViewDidEnter(() => {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then((data: Position) => setLocation(data))
      .catch((err: any) => {

      })

  }, [location])

  useIonViewWillLeave(() => abortController.abort())

  return (
    <IonPage className="pageContainer" >
      <DefaultHeader title='Presensi' />
      <IonContent fullscreen >
        {location && <MapGL latitude={location.coords.latitude} longitude={location.coords.longitude} />}

      </IonContent>
    </IonPage>
  );
};

export default Presensi;

