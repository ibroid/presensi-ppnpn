import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonDatetime,
  IonText,
  IonProgressBar,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonChip,
  IonAvatar
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


const Presensi: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useContext(AuthContext);
  const [location, setLocation] = useState<string | null>();
  const [toast] = useIonToast()
  const [dataPresensiDatang, setDataPresensiDatang] = useState<Presence>();
  const [dataPresensiPulang, setDataPresensiPulang] = useState<Presence>();
  const [selectedPresenceDate, setSelectedPresenceDate] = useState<string | null>();

  let abortController: { signal: AbortSignal; abort: () => void };

  const savePresensi = useCallback(async (session: number) => {
    setLoading(true)
    httpInstance(state.token).post<CreatePresenceResponse>("/presence", {
      session: session,
      location: location,
      present_date: selectedPresenceDate
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

      .finally(() => setLoading(false))
  }, [location, selectedPresenceDate])

  const fetchPresensi = useCallback(async (selectedDate: string) => {
    abortController = new AbortController()
    const signal = abortController.signal;
    setLoading(true)

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

      .finally(() => setLoading(false))
  }, [])

  useIonViewDidEnter(() => {
    Geolocation.getCurrentPosition().then((data: Position) => setLocation(`${data.coords.latitude} ${data.coords.longitude}`)).catch((err: any) => setLocation("Gagal Mendapatkan Lokasi. Error: " + err.message))

    const date = new Date();
    const todayYmd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    fetchPresensi(todayYmd)
  }, [])

  useIonViewWillLeave(() => abortController.abort())

  return (
    <IonPage className="pageContainer" >
      <DefaultHeader title='Presensi' />
      <IonContent fullscreen >
        <IonGrid className='ion-margin-top-sm'>
          <IonText className='ion-text-center'><p>Kalender Kehadiran</p></IonText>
          <IonRow class="ion-no-margin-top ion-justify-content-center ion-align-items-center">
            <IonDatetime
              onIonChange={async (e) => {
                const selectedDate = String(e.target.value).replace('T21:43:00+07:00', '')
                const todayYmd = selectedDate.split("T")[0]
                setSelectedPresenceDate(todayYmd)
                fetchPresensi(todayYmd)
              }}
              presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
        </IonGrid>
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>
              <h3>Riwayat Presensi</h3>
              <Clock format={'HH:mm:ss'} ticking={true} timezone='Asia/Jakarta' />
            </IonLabel>
          </IonListHeader>
          {loading ? <IonProgressBar type='indeterminate' ><h1> Loading...</h1></IonProgressBar> : <></>}
          <IonItem disabled={loading} button={true} onClick={() => savePresensi(1)}>
            <IonIcon icon={sunny} color='warning' slot="start"></IonIcon>
            <IonLabel>
              <h2>Presensi Datang</h2>
              {dataPresensiDatang?.present_time ? <p color='danger'>Anda Sudah Presensi</p> : <p color='danger'>Anda Belum Presensi</p>}
            </IonLabel>
            <p>{dataPresensiDatang?.present_time ?? "Klik Disini"}</p>
          </IonItem>
          <IonItem disabled={loading} button={true} onClick={() => savePresensi(2)}>
            <IonIcon icon={moon} color='primary' slot="start"></IonIcon>
            <IonLabel>
              <h2>Presensi Pulang</h2>
              {dataPresensiPulang?.present_time ? <p color='danger'>Anda Sudah Presensi</p> : <p color='danger'>Anda Belum Presensi</p>}
            </IonLabel>
            <p>{dataPresensiPulang?.present_time ?? "Klik Disini"}</p>
          </IonItem>
          <IonItem>
            <IonIcon icon={locate} color='danger' slot="start"></IonIcon>
            <IonLabel>
              <h2>Posisi GPS Anda</h2>
              <p>{location}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Presensi;

