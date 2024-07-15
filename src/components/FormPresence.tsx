import { useState } from "react";
import { Presence } from "../interfaces/IResponse";


export default function FormPresence() {
  const [dataPresensiDatang, setDataPresensiDatang] = useState<Presence>();
  const [dataPresensiPulang, setDataPresensiPulang] = useState<Presence>();
  const [selectedPresenceDate, setSelectedPresenceDate] = useState<string | null>();
  return (
    //   <IonItem disabled={loading} button={true} onClick={() => statusOption(1)}>
    //   <IonIcon icon={sunny} color='warning' slot="start"></IonIcon>
    //   <IonLabel>
    //     <h2>Presensi Datang</h2>
    //     {dataPresensiDatang?.present_time ? <p color='danger'>Anda Sudah Presensi</p> : <p color='danger'>Anda Belum Presensi</p>}
    //   </IonLabel>
    //   <p>{dataPresensiDatang?.present_time ?? "Klik Disini"}</p>
    // </IonItem>
    // <IonItem disabled={loading} button={true} onClick={() => statusOption(2)}>
    //   <IonIcon icon={moon} color='primary' slot="start"></IonIcon>
    //   <IonLabel>
    //     <h2>Presensi Pulang</h2>
    //     {dataPresensiPulang?.present_time ? <p color='danger'>Anda Sudah Presensi</p> : <p color='danger'>Anda Belum Presensi</p>}
    //   </IonLabel>
    //   <p>{dataPresensiPulang?.present_time ?? "Klik Disini"}</p>
    // </IonItem>
    <>this is presen</>
  )
}