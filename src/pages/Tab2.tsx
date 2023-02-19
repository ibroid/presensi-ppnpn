import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonGrid, IonRow, IonItem, IonAvatar, IonLabel, IonCol } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';
import '../components/ExploreContainer.css'
import './Tab2.css';
import '../global.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Riwayat Presensi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Riwayat Presensi</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="ion-margin">
            <IonDatetime color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
          <IonRow class="ion-margin">
            <h4>Daftar Presensi Tanggal Sekian</h4>
          </IonRow>
        </IonGrid>
        <Virtuoso
          style={{ height: '100%' }}
          data={[
            'Imal',
            'Adi',
            'Rudi',
            'Faiz',
            'Safrudi',
            'Dela',
            'Iwan',
            'Aulia',
            'Yanti',
            'Aldi',
            'Samsuri',
          ]}
          itemContent={(index, data) => {
            return (
              <div style={{ height: '56px' }}>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src="https://picsum.photos/seed/picsum/40/40" />
                  </IonAvatar>
                  <IonLabel>
                    <IonGrid>
                      <IonRow>
                        <IonCol>{data}</IonCol>
                        <IonCol size='2'>07:00</IonCol>
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
