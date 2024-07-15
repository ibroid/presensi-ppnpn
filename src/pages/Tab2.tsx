import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonGrid,
  IonRow,
  IonItem,
  IonAvatar,
  IonLabel,
  useIonViewDidEnter,
  useIonToast,
  IonText,
  useIonViewWillLeave
} from '@ionic/react';

import { Virtuoso } from 'react-virtuoso';
<<<<<<< HEAD
=======
import { supabase } from '../utils/SupabaseClient';
>>>>>>> main
import { useState } from 'react';
import { IPresensiResponse } from '../interfaces/IResponse';
import { sesiColor } from '../utils/Helper';
import moment, { Moment } from 'moment';

import './Tab2.css';
import '../global.css';
import 'moment/locale/id';

const Tab2: React.FC = () => {

  const [NotifToaster] = useIonToast();
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState<boolean>(false);
>>>>>>> main
  const [presensiShowList, setPresensiShowList] = useState<any[]>([]);
  const [leaveStatus, setLeaveStatus] = useState<boolean>(false);

  const [Moment] = useState<Moment>(() => {
    return moment(Date.now()).locale('id');
  });

  let abortController: { signal: AbortSignal; abort: () => void; };

  useIonViewDidEnter(() => {
<<<<<<< HEAD
    abortController = new AbortController();

=======
    setLoading(true);
    abortController = new AbortController();
    supabase.from('ppnpn')
      .select('*, presensi(*)', { count: 'planned' })
      .eq('presensi.tanggal', Moment.format('Y-M-D'))
      .abortSignal(abortController.signal)
      .then(({ data, error }) => {

        if (error && !leaveStatus) {
          NotifToaster({
            message: 'Terjadi Kesalahan. ' + error.message,
            duration: 2000,
            position: 'top',
            color: 'danger'
          })
        }

        if (data && !leaveStatus) {
          setPresensiShowList(data);
        }

        setLoading(false)
      })
>>>>>>> main

  }, []);

  useIonViewWillLeave(() => {
    abortController.abort()
    setLeaveStatus(true);
<<<<<<< HEAD
=======
    setLoading(false);
>>>>>>> main
    setPresensiShowList([]);
  })


  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <IonTitle>Riwayat Presensi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class="ion-no-margin-top ion-justify-content-center ion-align-items-center">
            <IonDatetime
              onIonChange={async (e) => {
                const selectedDate = String(e.target.value).replace('T21:43:00+07:00', '')
<<<<<<< HEAD
=======
                setLoading(true);
                const { data, error } = await supabase.from('ppnpn')
                  .select('*, presensi(*)')
                  .eq('presensi.tanggal', selectedDate)
                if (error) {
                  NotifToaster({
                    message: 'Terjadi Kesalahan. ' + error.message,
                    duration: 2000,
                    position: 'top',
                    color: 'danger'
                  })
                }

                if (data) {
                  setPresensiShowList(data);
                }
                setLoading(false);
>>>>>>> main
              }}
              presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
          <IonRow className='ion-justify-content-center'>
<<<<<<< HEAD
            {/* {loading ? <IonText><h1> Loading...</h1></IonText> : <></>} */}
=======
            {loading ? <IonText><h1> Loading...</h1></IonText> : <></>}
>>>>>>> main
          </IonRow>
        </IonGrid>
        <Virtuoso
          style={{ height: '50%' }}
          data={presensiShowList}
          itemContent={(index, data: any) => {
            return (
              <div style={{ height: '56px' }}>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src={data.photos} />
                  </IonAvatar>
                  <IonLabel>
                    {data.fullname}
                  </IonLabel>
                  <IonRow className='ion-justify-content-between'>
                    {data.presensi?.map((row: IPresensiResponse, i: number) => {
                      const timeSplitted = row.waktu.split(':')
                      return <IonText color={sesiColor(row.jenis)} key={row.id}>{timeSplitted[0]}:{timeSplitted[1]} |</IonText>
                    })}
                  </IonRow>
                </IonItem>
              </div>
            );
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
