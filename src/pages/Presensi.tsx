import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  useCallback,
  useContext,
  useState
} from 'react';

import { calendarClear } from 'ionicons/icons';
import { IPegawaiResponse } from '../interfaces/IResponse';
import { PegawaiListContext } from '../context/PegawaiListContext';

import WidgetPresensiList from '../components/WidgetPresensiList';
import moment from 'moment';
import FormPresensi from '../components/FormPresensi';

import 'moment/locale/id';
import './Tab1.css';


const Tab1: React.FC = () => {

  const [selectedPegawai, setSelectedPegawai] = useState<IPegawaiResponse>();
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number>(0)

  const [Moment] = useState<moment.Moment>(() => {
    return moment(Date.now()).locale('id');
  });


  const pegawaiList = useContext(PegawaiListContext);

  const selectPegawai = useCallback(async () => {
    const findPegawaiById = pegawaiList?.find((val, i) => (val.id === selectedPegawaiId));

    setSelectedPegawai(findPegawaiById);
  }, [selectedPegawaiId])

  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'} >
          <IonTitle>Presensi Kehadiran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className='ion-margin-top'>
          <IonSelect
            label='Pilih Pegawai :'
            onIonDismiss={selectPegawai}
            value={setSelectedPegawaiId}
            class='ion-width-max'
            onIonChange={(e) => setSelectedPegawaiId(e.target.value)}  >
            {pegawaiList?.map((row: IPegawaiResponse, i: number) => <IonSelectOption key={++i} value={row.id}>{row.fullname}</IonSelectOption>)}
          </IonSelect>
          {selectedPegawai ? <FormPresensi pegawai={selectedPegawai} /> : <></>}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

