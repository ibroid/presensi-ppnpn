import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, ToastOptions, useIonActionSheet, useIonAlert, useIonLoading, useIonToast, useIonViewDidEnter } from '@ionic/react';

import './Tab1.css';
import Clock from 'react-live-clock';
import { useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { calendarClear, informationCircleOutline, saveOutline, arrowUndoOutline } from 'ionicons/icons';
import { supabase } from '../utils/SupabaseClient';
import { IPegawaiResponse } from '../interfaces/IResponse';
import moment from 'moment';
import 'moment/locale/id';
import sun from '../assets/icon/sun.png'
import sunrise from '../assets/icon/sunrise.png'
import sunset from '../assets/icon/sunset.png'

const Tab1: React.FC = () => {
  const [presentToast] = useIonToast();
  // const [locationNow, setLocationNow] = useState<string>("Lokasi Belum Ditentukan");
  const [presentAlert] = useIonAlert();
  const [notifMessage, setNotifMessage] = useState<string>('Pemberitahuan. ');
  const [pegawaiList, setPegawaiList] = useState<any[]>();
  const [selectedPegawai, setSelectedPegawai] = useState<IPegawaiResponse>();
  const [present, dismiss] = useIonLoading();
  const [Loading, setLoading] = useState<boolean>(false);
  const [presentAction] = useIonActionSheet();
  const [Moment] = useState<moment.Moment>(() => {
    return moment(Date.now()).locale('id');
  });

  const [presensi, setPresensi] = useState<any[]>()


  const selectPegawai = (e: any) => {
    const id = e.target.value
    const findPegawaiById: IPegawaiResponse = pegawaiList?.find((val, i) => (val.id === id));
    // console.log(selectedPegawai);
    setSelectedPegawai(findPegawaiById);
  }

  const NotifToaster = (position: 'top' | 'middle' | 'bottom', message: string, color: ToastOptions["color"]) => {
    presentToast({
      message: message,
      position: position,
      color: color
    });
  };

  const jabatan = (jabId: number): string => {
    const jabatanList = ['', 'Pramubakti', 'Supir', 'Satpam'];
    return jabatanList[jabId];
  }

  useEffect(() => {
    if (Loading) {
      present({
        message: 'Loading...',
        spinner: 'circles',
        // duration: 5000
      });
    } else {
      dismiss();
    }
  }, [Loading])

  useIonViewDidEnter(() => {
    const bootstrapping = async (): Promise<void> => {
      const { data, error } = await supabase.from('ppnpn').select('*');
      if (data) {
        setPegawaiList(data);
      }
      if (error) {
        setNotifMessage(prev => prev += error.message)
        presentAlert({
          header: 'Notifikasi',
          message: notifMessage,
          buttons: ['Kembali']
        })
      }
    }

    bootstrapping()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'tertiary'} class='ion-background-primary'>
          <IonTitle size="large">Presensi Kehadiran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class='ion-justify-content-center ion-align-items-center'>
            <IonList>
              <IonItem>
                <IonLabel>Pilih Pegawai</IonLabel>
                <IonSelect class='ion-width-max' onIonChange={selectPegawai}  >
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
                  <IonCardContent>
                    {selectedPegawai && selectedPegawai?.id
                      ? <>
                        <IonItem lines="none">
                          <IonAvatar slot="start">
                            <IonImg
                              onIonImgDidLoad={() => setLoading(false)}
                              onIonImgWillLoad={() => setLoading(true)}
                              src={selectedPegawai?.photos} alt='foto' />
                          </IonAvatar>
                          <IonIcon
                            slot="end"
                            icon={informationCircleOutline}
                            size="large"
                            class="ion-no-margin"
                          ></IonIcon>
                          <IonLabel>
                            {selectedPegawai?.fullname}
                            <p>{jabatan(selectedPegawai.jabatan_id)}</p>
                          </IonLabel>
                        </IonItem>
                        <IonItemDivider />
                        <IonItem>
                          <IonGrid>
                            <IonRow class='ion-justify-content-center'>
                              <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </IonRow>
                          </IonGrid>
                        </IonItem>
                        <div className="action">
                          <IonButton
                            onClick={() => {
                              presentAction({
                                header: 'Simpan Presensi',
                                buttons: [
                                  {
                                    text: 'Simpan',
                                    icon: saveOutline,
                                    async handler() {
                                      setLoading(true);
                                      const { data, error } = await supabase.from('presensi').insert({
                                        status: 1,
                                        absen: 0,
                                        tanggal: Moment.format('Y-M-D'),
                                        waktu: moment(Date.now()).format('HH:mm:ss'),
                                        ppnpn_id: selectedPegawai.id
                                      }).select()
                                      if (error) {
                                        setNotifMessage(error.message)
                                      }

                                      if (data) {
                                        setPresensi(data)
                                      }
                                      setLoading(false);
                                      NotifToaster('top', 'Berhasil', 'success')
                                    },
                                  },
                                  {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    icon: arrowUndoOutline
                                  },
                                ],
                              })
                            }}
                            shape="round"
                            class="accept"
                            mode="ios">
                            Presensi
                          </IonButton>
                          <IonButton
                            shape="round"
                            fill="outline"
                            color="danger"
                            mode="ios"
                          >
                            Absen
                          </IonButton>
                        </div></>
                      : <IonText><strong> Pegawai Belum Di Pilih</strong></IonText>}


                  </IonCardContent>
                </IonCard>
              </div>
            </IonCol>
          </IonRow>
          <IonRow class='ion-margin ion-justify-content-center ion-align-items-center'>
            <IonCol>
              <div id="FG6pmT3dZ2uqd9PWnlWo">
                <IonGrid class="ion-no-padding">
                  <IonRow>
                    <IonCol size="12">
                      <div className="widget">
                        <div className="ion-padding">
                          <IonItem lines="none" class="ion-padding-vertical">
                            <IonAvatar slot="start">
                              <IonImg src={sunset} />
                            </IonAvatar>
                            <IonLabel>
                              <span className="title">17:12</span>
                              <span className="sub-title">Pulang</span>
                            </IonLabel>
                          </IonItem>
                          <IonItem lines="none" class="ion-padding-vertical">
                            <IonAvatar slot="start">
                              <IonImg src={sun} />
                            </IonAvatar>
                            <IonLabel>
                              <span className="title">
                                12:31
                              </span>
                              <span className="sub-title"> Siang</span>
                            </IonLabel>
                          </IonItem>
                          <IonItem lines="none" class="ion-padding-vertical">
                            <IonAvatar slot="start">
                              <IonImg src={sunrise} />
                            </IonAvatar>
                            <IonLabel>
                              <span className="title">
                                08:43
                              </span>
                              <span className="sub-title"> Masuk</span>
                            </IonLabel>
                          </IonItem>
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

