import { IonDatetime, IonGrid, IonRow, IonText } from "@ionic/react"
import { useCallback } from "react";

interface CallendarProps {
  onDateChanged?: (date: string) => void;
}

export default function ActiveCallendar({ onDateChanged }: CallendarProps) {

  const handleDateChange = useCallback((e: CustomEvent<any>) => {
    const selectedDate = String(e.detail.value).replace('T21:43:00+07:00', '')
    const todayYmd = selectedDate.split("T")[0]
    onDateChanged && onDateChanged(todayYmd);
  }, [onDateChanged]);

  return (
    <IonGrid className='ion-margin-top-sm'>
      <IonText className='ion-text-center'><p>Kalender Kehadiran</p></IonText>
      <IonRow class="ion-no-margin-top ion-justify-content-center ion-align-items-center">
        <IonDatetime
          onIonChange={handleDateChange}
          presentation="date" color={"primary"} showDefaultTimeLabel={false}></IonDatetime>
      </IonRow>
    </IonGrid>
  )
}


