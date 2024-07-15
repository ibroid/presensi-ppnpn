import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';

import { useContext, useState } from 'react';
import { IPegawaiResponse } from '../interfaces/IResponse';
import { PegawaiListContext } from '../context/PegawaiListContext';

const Tab3: React.FC = () => {

  const nav = useIonRouter()

  const pegawaiList = useContext(PegawaiListContext);

  return (
    <IonPage className="pageContainer">
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <IonTitle>Statistic Presensi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList >
          {pegawaiList?.map((row: IPegawaiResponse, i) => {
            return <IonItem
              button
              onClick={() => nav.push('/app/tab3/details/' + row.id, 'forward', 'replace')}
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
