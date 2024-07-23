import { IonButton, IonCol, IonGrid, IonIcon, IonProgressBar, IonRow, IonText } from "@ionic/react";
import SelectReportPeriode from "./SelectReportPeriode";
import { AuthContext } from "../context/AuthContext";
import { useContext, useMemo, useState } from "react";
import useFetchActivity from "../hooks/useFetchActivity";
import { LaporanActivityResponse } from "../interfaces/IResponse";
import { download } from "ionicons/icons";
import { CapacitorHttp } from "@capacitor/core"
export default function ActivityReport() {
  const { state } = useContext(AuthContext)
  const { fetchLaporan, error, errorMessage, loading, data } = useFetchActivity();

  const thisMonth = useMemo(() => {
    return new Date().getMonth();
  }, [])

  const thisYear = useMemo(() => {
    return new Date().getFullYear();
  }, [])

  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  return (
    <IonGrid>
      <IonRow>
        <IonCol>Laporan Kegiatan</IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-start">Nama</IonCol>
        <IonCol size="8" className="ion-text-start">: {state.user?.name}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-start">Periode</IonCol>
        <IonCol size="8" className="ion-text-start">
          <SelectReportPeriode onChange={(val) => {
            setSelectedMonth(parseInt(val))
            fetchLaporan({ bulan: parseInt(val) + 1, tahun: thisYear })
          }} defaultValue={selectedMonth} />
        </IonCol>
      </IonRow>
      <IonRow style={{ backgroundColor: "var(--ion-color-amber)" }}>
        <IonCol>Tanggal</IonCol>
        <IonCol>Waktu</IonCol>
        <IonCol>Kegiatan</IonCol>
        <IonCol>Ket</IonCol>
      </IonRow>

      {loading && <IonRow><IonProgressBar color={"amber"} type="indeterminate" /></IonRow>}
      {error && <IonRow className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}

      {data?.daily_activity?.map((activity: LaporanActivityResponse, i: number) => <IonRow style={{ border: "2px solid var(--ion-color-amber)" }} key={activity.id}>
        <IonCol>{activity.doing_date}</IonCol>
        <IonCol>{activity.doing_time}</IonCol>
        <IonCol>{activity.doing}</IonCol>
        <IonCol>{activity.note}</IonCol>
      </IonRow>)}

      {
        data?.daily_activity && data.daily_activity.length > 0 && <IonRow>
          <IonCol>
            <IonButton color={"amber"} href={`${process.env.REACT_APP_URL_API}/laporan/download_activity?employee_id=${state.user?.employee.id}&bulan=${selectedMonth + 1}&tahun=${thisYear}`}>
              <IonIcon icon={download} slot="start" className="ion-margin-end" color="dark" />
              Download Laporan
            </IonButton>
          </IonCol>
        </IonRow>
      }

      {
        data?.daily_activity?.length === 0 && <IonRow className="ion-text-center"><IonText>Data Tidak Ditemukan</IonText></IonRow>
      }
    </IonGrid>
  )
}