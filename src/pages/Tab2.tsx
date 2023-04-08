import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonGrid, IonRow, IonItem, IonAvatar, IonLabel, IonCol, useIonViewDidEnter, useIonToast, IonSegment, IonSegmentButton, useIonLoading, useIonViewDidLeave, IonText } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';
import '../components/ExploreContainer.css'
import './Tab2.css';
import '../global.css';
import { supabase } from '../utils/SupabaseClient';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import 'moment/locale/id';
import { IPpnpnWithPresensi, IPresensiResponse, IPresensiWithPpnpnResponse } from '../interfaces/IResponse';
import { sesiColor } from '../utils/Helper';

const Tab2: React.FC = () => {

  const [NotifToaster] = useIonToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [presensiList, setPresensiList] = useState<any[]>([]);
  const [presensiShowList, setPresensiShowList] = useState<any[]>([]);
  const [present, dismiss] = useIonLoading();
  const [selectedSesi, setSelectedSesi] = useState<'1' | '2' | '3'>('1');

  const [Moment, setMoment] = useState<Moment>(() => {
    return moment(Date.now()).locale('id');
  });

  useIonViewDidEnter(() => {
    const bootstrapping = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('ppnpn')
        .select('*, presensi(*)', { count: 'planned' })
        .eq('presensi.tanggal', Moment.format('Y-M-D'))
      if (error) {
        NotifToaster({
          message: 'Terjadi Kesalahan. ' + error.message,
          duration: 2000,
          position: 'top',
          color: 'danger'
        })
      }

      if (data) {
        console.log(data)
        setPresensiShowList(data);
      }
      setLoading(false);
    }
    bootstrapping()
  });

  useIonViewDidLeave(() => {
    setLoading(false);
    setPresensiList([]);
    setPresensiShowList([]);
  })

  useEffect(() => {
    if (loading) {
      present({
        message: 'Loading...',
        spinner: 'circles',
        // duration: 5000
      });
    } else {
      setTimeout(() => {
        dismiss();
      }, 1000);
    }

  }, [loading])

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
                setSelectedSesi('1');
                setLoading(false);
              }}
              presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
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
