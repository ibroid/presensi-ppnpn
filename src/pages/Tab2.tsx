import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonGrid, IonRow, IonItem, IonAvatar, IonLabel, IonCol, useIonViewDidEnter, useIonToast, IonSpinner, IonText, IonSegment, IonSegmentButton, useIonLoading } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';
import '../components/ExploreContainer.css'
import './Tab2.css';
import '../global.css';
import { supabase } from '../utils/SupabaseClient';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import 'moment/locale/id';
import { IPresensiWithPpnpnResponse } from '../interfaces/IResponse';
import { setSesi, setSesiNama } from '../utils/Helper';

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
      const { data, error } = await supabase.from('presensi')
        .select('*, ppnpn(*)')
        .match({ tanggal: Moment.format('Y-M-D') })
        .order('waktu', { ascending: false })
      if (error) {
        NotifToaster({
          message: 'Terjadi Kesalahan. ' + error.message,
          duration: 2000,
          position: 'top',
          color: 'danger'
        })
      }

      if (data) {
        setPresensiList(data)
        const verted = data.filter((val, i) => (val.jenis == '1'))
        setPresensiShowList(verted);
      }
      setLoading(false);
    }
    bootstrapping()
  });

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
    <IonPage>
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
                const { data, error } = await supabase.from('presensi')
                  .select('*, ppnpn(*)')
                  .match({ tanggal: selectedDate })
                  .order('waktu', { ascending: false })
                if (error) {
                  NotifToaster({
                    message: 'Terjadi Kesalahan. ' + error.message,
                    duration: 2000,
                    position: 'top',
                    color: 'danger'
                  })
                }

                if (data) {
                  setPresensiList(data)
                  const verted = data.filter((val, i) => (val.jenis == '1'))
                  setPresensiShowList(verted);
                }
                setSelectedSesi('1');
                setLoading(false);
              }}
              presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
          <IonRow>
            <IonSegment onIonChange={(e: any) => {
              const verted = presensiList.filter((val, i) => (val.jenis == e.target.value))
              setPresensiShowList(verted);
              setSelectedSesi(e.target.value)
            }} value={selectedSesi}>
              <IonSegmentButton value='1'>
                <IonLabel>Datang</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value='2'>
                <IonLabel>Siang</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value='3'>
                <IonLabel>Pulang</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>
        </IonGrid>
        <Virtuoso
          style={{ height: '50%' }}
          data={presensiShowList}
          itemContent={(index, data: IPresensiWithPpnpnResponse) => {
            return (
              <div style={{ height: '56px' }}>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src={data.ppnpn.photos} />
                  </IonAvatar>
                  <IonLabel>
                    <IonGrid>
                      <IonRow>
                        <IonCol>{data.ppnpn.fullname} <p color='success'>{data.waktu.replace('+00', '')}</p></IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonLabel>
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
