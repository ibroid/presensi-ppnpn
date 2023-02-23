import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonGrid, IonRow, IonItem, IonAvatar, IonLabel, IonCol } from '@ionic/react';
import { Virtuoso } from 'react-virtuoso';
import '../components/ExploreContainer.css'
import './Tab2.css';
import '../global.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'tertiary'}>
          <IonTitle>Riwayat Presensi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow class="ion-margin-top ion-justify-content-center ion-align-items-center">
            <IonDatetime color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
          </IonRow>
          <IonRow>
            <h4>Daftar Presensi Hari Ini</h4>
          </IonRow>
        </IonGrid>
        <Virtuoso
          style={{ height: '50%' }}
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
            'Aldi',
            'Yanto',
            'Abdullah',
            'Ade',
            'Oci',
            'Syahril',
            'Chakra',
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
