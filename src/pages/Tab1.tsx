import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonSpinner, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, ToastOptions, useIonActionSheet, useIonAlert, useIonLoading, useIonToast, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react';

import './Tab1.css';
import Clock from 'react-live-clock';
import { useCallback, useEffect, useState } from 'react';
import '../components/ExploreContainer.css';
import { calendarClear, informationCircleOutline, saveOutline, arrowUndoOutline } from 'ionicons/icons';
import { supabase } from '../utils/SupabaseClient';
import { IPegawaiResponse, IPresensiResponse } from '../interfaces/IResponse';
import moment from 'moment';
import 'moment/locale/id';

import { sesiAben, jabatan, imgSesi, setSesi } from '../utils/Helper';

const Tab1: React.FC = () => {
  const [presentToast] = useIonToast();

  const [presentAlert] = useIonAlert();
  const [pegawaiList, setPegawaiList] = useState<any[]>();
  const [selectedPegawai, setSelectedPegawai] = useState<IPegawaiResponse>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [Loading, setLoading] = useState<boolean>(false);
  const [presentAction] = useIonActionSheet();
  const [Moment] = useState<moment.Moment>(() => {
    return moment(Date.now()).locale('id');
  });

  const [spinner, setSpinner] = useState<boolean>(false);

  const [presensi, setPresensi] = useState<any[]>([])

  const NotifToaster = (position: 'top' | 'middle' | 'bottom', message: string, color: ToastOptions["color"]) => {
    presentToast({
      message: message,
      position: position,
      color: color,
      duration: 3000
    });
  };

  const selectPegawai = (e: any) => {
    const id = e.target.value
    const findPegawaiById: IPegawaiResponse = pegawaiList?.find((val, i) => (val.id === id));
    setSelectedPegawai(findPegawaiById);
    setSpinner(true);
    supabase.from('presensi').select('*').match({ ppnpn_id: id, tanggal: Moment.format('Y-M-D') }).then(({ data, error }) => {
      if (error) {
        NotifToaster('top', error.message, 'danger');
      }
      if (data) {
        setPresensi(data)
      }
      setSpinner(false);
    })
  }

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

  const saveSesi = useCallback(() => {
    const body = {
      status: 1,
      absen: 0,
      tanggal: Moment.format('Y-M-D'),
      waktu: moment(Date.now()).format('HH:mm:ss'),
      ppnpn_id: selectedPegawai?.id,
      jenis: setSesi(Moment.hour())
    }
    presentAction({
      header: 'Simpan Presensi',
      buttons: [
        {
          text: 'Simpan',
          icon: saveOutline,
          async handler() {
            setLoading(true);
            const { data, error } = await supabase.from('presensi').insert(body).select('*').single()
            if (error) {
              NotifToaster('top', 'Silahkan Coba Lagi Nanti', 'danger')
            }

            if (data) {
              setPresensi(prev => {
                return [...prev, data];
              })
              NotifToaster('top', 'Berhasil', 'success')
            }
            setLoading(false);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: arrowUndoOutline
        },
      ],
    })
  }, [selectedPegawai?.id])


  const checkPresent = useCallback((): boolean => {

    if (presensi.length === 0) {
      console.log('1')
      return true;
    }

    if (presensi[presensi.length - 1].jenis === 1 && Moment.hour() < 12) {
      console.log('2')
      return false
    }

    if (presensi[presensi.length - 1].jenis === 2 && Moment.hour() > 12 && Moment.hour() < 13) {
      console.log('3')
      return false
    }

    if (presensi[presensi.length - 1].jenis === 3 && Moment.hour() > 14) {
      console.log('4')
      return false
    }

    return true;
  }
    , [presensi.length])
  useIonViewDidLeave(() => {
    setSelectedPegawai(undefined);
  })


  useEffect(() => {
    fetchPegawai()

    return () => {
      setPegawaiList([]);
      setPresensi([]);
      setSelectedPegawai(undefined);
    }
  }, [fetchPegawai])


  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'} >
          <IonTitle>Presensi Kehadiran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText className='ion-text-center'>
                <p>Form</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-align-items-center'>
            <IonList>
              <IonItem>
                <IonLabel>Pilih Pegawai</IonLabel>
                <IonSelect value={selectedPegawai?.id || 0} class='ion-width-max' onIonChange={selectPegawai}  >
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
                    {selectedPegawai && selectedPegawai?.id
                      ? <>
                        <IonItem lines="none">
                          <IonAvatar slot="start">
                            <IonImg
                              onIonError={() => {
                                NotifToaster('top', 'Foto gagal dimuat', 'danger');
                                setLoading(false);
                              }}
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
                        <IonItem>
                          <IonGrid>
                            <IonRow class='ion-justify-content-center'>
                              <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
                            </IonRow>
                          </IonGrid>
                        </IonItem>
                        {!checkPresent()
                          ? <IonItem>
                            <IonGrid>
                              <IonRow class='ion-justify-content-center'>
                                <IonText color={'success'}>Anda Sudah Presensi</IonText>
                              </IonRow>
                            </IonGrid>
                          </IonItem>
                          : <div className="action">
                            <IonButton
                              fill={'outline'}
                              color={'tertiary'}
                              onClick={saveSesi}
                              shape="round"
                              class="accept"
                              mode="ios">
                              Presensi
                            </IonButton>
                            {/* <IonButton
                              shape="round"
                              fill="outline"
                              color="danger"
                              mode="ios"
                            >
                              Absen
                            </IonButton> */}
                          </div>
                        }
                      </>
                      : <IonText><strong> Pegawai Belum Di Pilih</strong></IonText>}
                  </IonCardContent>
                </IonCard>
              </div>
            </IonCol>
          </IonRow>
          <IonRow class='ion-justify-content-center'>
            {spinner ? <IonSpinner /> : ''}
          </IonRow>
          <div id="FG6pmT3dZ2uqd9PWnlWo">
            <IonGrid class="ion-no-padding">
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

