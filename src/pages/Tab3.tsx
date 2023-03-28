import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter
} from '@ionic/react';
import './Tab3.css';
import { supabase } from '../utils/SupabaseClient';
import { useEffect, useState } from 'react';
import { IPegawaiResponse } from '../interfaces/IResponse';

const Tab3: React.FC = () => {

  const [present, dismiss] = useIonLoading();
  const [loading, setLoading] = useState<boolean>();
  const [NotifToaster] = useIonToast();
  const [pegawaiList, setPegawaiList] = useState<any[]>([]);
  const nav = useIonRouter()

  useEffect(() => {

  }, [loading])

  useIonViewDidEnter(() => {
    const bootstrapping = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('ppnpn').select('*')
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
        setPegawaiList(data)
      }
      setLoading(false);
    }

    bootstrapping()
  }, [])

  useEffect(() => {
    if (loading) {
      present({
        message: 'Loading...',
        spinner: 'circles',
      });
    } else {
      setTimeout(() => {
        dismiss();
      }, 1000);
    }

    return () => {
      setPegawaiList([]);
      setLoading(false);
    }
  }, [loading])

  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <IonTitle>Statistic Presensi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList >

          {pegawaiList.map((row: IPegawaiResponse, i) => {
            return <IonItem
              button
              // href='/app/tab3/details'
              onClick={() => nav.push('/app/tab3/details/' + row.id, 'forward', 'push')}
              key={++i}>
              <IonLabel >{row.fullname}</IonLabel>
            </IonItem>
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
