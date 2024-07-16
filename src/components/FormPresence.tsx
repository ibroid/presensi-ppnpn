import { useState } from "react";
import { Presence } from "../interfaces/IResponse";


export default function FormPresence() {
  const [dataPresensiDatang, setDataPresensiDatang] = useState<Presence>();
  const [dataPresensiPulang, setDataPresensiPulang] = useState<Presence>();
  const [selectedPresenceDate, setSelectedPresenceDate] = useState<string | null>();


  // const savePresensi = useCallback(async (session: number, status: number) => {

  //   const date = new Date();
  //   const todayYmd =
  //     date.getFullYear() +
  //     "-" +
  //     String(date.getMonth() + 1).padStart(2, "0") +
  //     "-" +
  //     String(date.getDate()).padStart(2, "0");

  //   httpInstance(state.token).post<CreatePresenceResponse>("/presence", {
  //     session: session,
  //     location: location,
  //     present_date: selectedPresenceDate ?? todayYmd,
  //     status: status
  //   })
  //     .then((res) => {
  //       if (res.data.data.session === 1) {
  //         setDataPresensiDatang(res.data.data)
  //       } else {
  //         setDataPresensiPulang(res.data.data)
  //       }

  //       toast({
  //         message: res.data.message,
  //         duration: 5000,
  //         color: 'success',
  //         buttons: [
  //           {
  //             text: "Tutup",
  //             role: "cancel",
  //           }
  //         ]
  //       })
  //     })
  //     .catch((err: any) => {
  //       let errorMessage: string = ""
  //       if (err instanceof AxiosError && err.isAxiosError) {
  //         errorMessage = err.response?.data.message ?? err.response?.data.error.message;
  //       } else {
  //         errorMessage = err.message;
  //       }

  //       toast({
  //         message: errorMessage,
  //         duration: 5000,
  //         color: 'danger',
  //         buttons: [
  //           {
  //             text: "Tutup",
  //             role: "cancel",
  //           }
  //         ]
  //       })
  //     })

  // }, [location, selectedPresenceDate])
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