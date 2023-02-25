import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonGrid, IonRow, IonItem, IonAvatar, IonLabel, IonCol, useIonViewDidEnter, useIonToast, IonSpinner, IonText, IonSegment, IonSegmentButton } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';
import '../components/ExploreContainer.css'
import './Tab2.css';
import '../global.css';
import { supabase } from '../utils/SupabaseClient';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import 'moment/locale/id';
import { IPresensiWithPpnpnResponse } from '../interfaces/IResponse';
import { setSesi, setSesiNama } from '../utils/Helper';

const Tab2: React.FC = () => {

  const [NotifToaster] = useIonToast();

  const [presensiList, setPresensiList] = useState<any[]>([]);

  const [Moment, setMoment] = useState<Moment>(() => {
    return moment(Date.now()).locale('id');
  })

  useIonViewDidEnter(() => {
    const bootstrapping = async () => {
      const { data, error } = await supabase.from('presensi')
        .select('*, ppnpn(*)')
        .match({ tanggal: Moment.format('Y-M-D'), jenis: setSesi(Moment.hour()) })
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
        // console.log(data)
        setPresensiList(data)
      }
    }

    bootstrapping()
  })

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
            <IonDatetime presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
          <IonRow>
            <IonSegment onIonChange={(e: any) => {
              console.log(e.target.value)
            }} value={'1'}>
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
          data={presensiList}
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
