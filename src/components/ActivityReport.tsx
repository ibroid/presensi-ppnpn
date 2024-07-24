import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonProgressBar,
  IonRow,
  IonText
} from "@ionic/react";

import SelectReportPeriode from "./SelectReportPeriode";
import { AuthContext } from "../context/AuthContext";
import { useContext, useMemo, useState } from "react";
import useFetchActivity from "../hooks/useFetchActivity";
import { download } from "ionicons/icons";
import useActivityPdf from "../hooks/useActivtyPdf";
import useImageToBase64 from "../hooks/useImageToBase64";

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

  const { exportPdf } = useActivityPdf()

  const { imageBase64 } = useImageToBase64();

  const monthList = useMemo(() => {
    return [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ]
  }, [])

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
        <IonCol>Kegiatan</IonCol>
      </IonRow>

      {loading && <IonRow><IonProgressBar color={"amber"} type="indeterminate" /></IonRow>}
      {error && <IonRow className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}

      {data && data?.map((ac, i: number) => <IonRow style={{ border: "2px solid var(--ion-color-amber)" }} key={ac.no}>
        <IonCol>{ac.tanggal}</IonCol>
        <IonCol>
          <ol>
            {
              ac.kegiatan.length > 0 &&
              ac?.kegiatan?.map((k, i) => <li key={k.id}>
                {k.doing} ({k.doing_time})
              </li>)
            }
          </ol>
        </IonCol>
      </IonRow>)}

      {
        data && data.length > 0 && <IonRow>
          <IonCol>
            <IonButton color={"amber"} onClick={
              () => exportPdf(
                {
                  data,
                  foto: imageBase64,
                  periode: `${monthList[selectedMonth]} ${thisYear}`,
                  jabatan: state.user?.employee?.employee_level.level_name,
                  nama: state.user?.name
                }
              )
            }>
              <IonIcon icon={download} slot="start" className="ion-margin-end" color="dark" />
              Download Laporan
            </IonButton>
          </IonCol>
        </IonRow>
      }

      {
        data?.length === 0 && <IonRow className="ion-text-center"><IonText>Data Tidak Ditemukan</IonText></IonRow>
      }
    </IonGrid>
  )
}