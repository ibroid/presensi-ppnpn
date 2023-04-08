import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, ToastOptions, useIonActionSheet, useIonAlert, useIonLoading, useIonToast, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';

import './Tab1.css';

import { useCallback, useState } from 'react';
import '../components/ExploreContainer.css';
import { calendarClear } from 'ionicons/icons';
import { supabase } from '../utils/SupabaseClient';
import { IPegawaiResponse, IPresensiResponse } from '../interfaces/IResponse';
import moment from 'moment';
import 'moment/locale/id';

import { sesiAben, jabatan, imgSesi, setSesi } from '../utils/Helper';
import FormPresensi from '../components/FormPresensi';

const Tab1: React.FC = () => {

  const [presentToast] = useIonToast();

  const [presentAlert] = useIonAlert();
  const [pegawaiList, setPegawaiList] = useState<any[]>();
  const [selectedPegawai, setSelectedPegawai] = useState<IPegawaiResponse>();
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number>(0)
  const [presentLoading, dismissLoading] = useIonLoading();

  const [Moment] = useState<moment.Moment>(() => {
    return moment(Date.now()).locale('id');
  });

  const [spinner, setSpinner] = useState<boolean>(false);

  const [presensi, setPresensi] = useState<any[]>([])

  const NotifToaster = useCallback((position: 'top' | 'middle' | 'bottom', message: string, color: ToastOptions["color"]) => {
    presentToast({
      message: message,
      position: position,
      color: color,
      duration: 3000
    });
  }, [])

  const selectPegawai = useCallback(async () => {
    await presentLoading("Tunggu Sebentar")
    const findPegawaiById: IPegawaiResponse = pegawaiList?.find((val, i) => (val.id === selectedPegawaiId));
    setSelectedPegawai(findPegawaiById);
    supabase.from('presensi').select('*').match(
      {
        ppnpn_id: selectedPegawaiId,
        tanggal: Moment.format('Y-M-D')
      }
    ).then(({ data, error }) => {
      if (error) {
        NotifToaster('top', error.message, 'danger');
      }
      if (data) {
        setPresensi(data)
      }
      dismissLoading()
    })
  }, [selectedPegawaiId])

  const fetchPegawai = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase.from('ppnpn').select('*');
    if (data) {
      setPegawaiList(data);
    }
    if (error) {
      presentAlert({
        header: 'Notifikasi',
        message: 'Koneksi Gagal',
        buttons: ['Kembali']
      })
    }
  }, [])


  useIonViewDidEnter(() => {
    fetchPegawai()

  })

  useIonViewDidLeave(() => {
    setPegawaiList(undefined);
    setPresensi([]);
    setSelectedPegawai(undefined);
  })

  const CallbackAfterPresensi = useCallback((data: any) => {
    console.log(data)
    setPresensi(prev => [...prev, data])
  }, [])

  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'} >
          <IonTitle>Presensi Kehadiran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class='ion-justify-content-center ion-align-items-center'>
            <IonList>
              <IonItem>
                <IonLabel>Pilih Pegawai</IonLabel>
                <IonSelect
                  onIonDismiss={() => {
                    if (selectedPegawaiId === 0) {
                      return NotifToaster('top', 'Pegawai Belum Dipilih', 'danger')
                    }
                    selectPegawai()
                  }}
                  value={setSelectedPegawaiId}
                  class='ion-width-max'
                  onIonChange={(e) => setSelectedPegawaiId(e.target.value)}  >
                  {pegawaiList?.map((row: IPegawaiResponse, i) => <IonSelectOption key={++i} value={row.id}>{row.fullname}</IonSelectOption>)}
                </IonSelect>
              </IonItem>
            </IonList>
          </IonRow>
          <IonRow class='ion-margin ion-justify-content-center ion-align-items-center'>
            <IonCol>
              <div id="NkPulBbLDg7ywAjv6FeZ">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon icon={calendarClear}></IonIcon>
                      <IonText>{Moment.format('dddd DD MMMM yy')}</IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent color={'primary'}>
                    {selectedPegawai?.id
                      ? <FormPresensi pegawai={selectedPegawai} presensi={presensi} callback={CallbackAfterPresensi} />
                      : <IonText><strong> Pegawai Belum Di Pilih</strong></IonText>}
                  </IonCardContent>
                </IonCard>
              </div>
            </IonCol>
          </IonRow>
          <div id="FG6pmT3dZ2uqd9PWnlWo">
            <IonGrid class="ion-no-padding">
              <center>
                <IonText>Riwayat Presensi Anda</IonText>
              </center>
              <IonRow>
                <div className="widget">
                  <div className="ion-padding-horizontal ion-no-padding-vertical">
                    {presensi?.map((row: IPresensiResponse, i) => {
                      return <IonItem key={++i} lines="none" class="ion-padding-vertical">
                        <IonAvatar slot="start">
                          <IonImg src={imgSesi(row.jenis)} />
                        </IonAvatar>
                        <IonLabel>
                          <span className="title">{row.waktu}</span>
                          <span className="sub-title">{sesiAben(row.jenis)}</span>
                        </IonLabel>
                      </IonItem>
                    })}
                  </div>
                </div>
              </IonRow>
            </IonGrid>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

