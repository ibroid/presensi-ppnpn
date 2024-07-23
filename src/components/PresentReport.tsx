import { IonButton, IonCol, IonGrid, IonIcon, IonProgressBar, IonRow, IonText } from "@ionic/react"
import { useCallback, useContext, useMemo, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import SelectReportPeriode from "./SelectReportPeriode"
import useFetchLaporan from "../hooks/useFetchLaporan"
import { differenceInMinutes, parse } from "date-fns"
import { download } from "ionicons/icons"
export default function PresentReport() {

  const { state } = useContext(AuthContext)
  const { fetchLaporan, error, errorMessage, loading, data } = useFetchLaporan();

  const thisMonth = useMemo(() => {
    return new Date().getMonth();
  }, [])

  const thisYear = useMemo(() => {
    return new Date().getFullYear();
  }, [])

  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  const totalHour = useMemo((): string => {
    let total = 0;
    data?.forEach((item, i) => {
      if (item.hari !== "Sabtu" && item.hari !== "Minggu") {
        if (item.masuk !== null && item.pulang !== null) {
          const timeFormat = 'HH:mm:ss';

          const masukTime = parse(item.masuk, timeFormat, new Date());
          const pulangTime = parse(item.pulang, timeFormat, new Date());

          total += differenceInMinutes(pulangTime, masukTime);
        }
      }
    })

    const totalHours = Math.floor(total / 60)
    const totalMinutes = totalHours % 60;

    return `${totalHours} jam ${totalMinutes} menit`
  }, [data])



  const sliceTime = useCallback((time: string): string | null => {
    if (!time) return null;
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!time.match(timeFormat)) {
      throw new Error('Input must be in the format HH:MM:SS');
    }
    return time.slice(0, 5);
  }, [])


  return (
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-center">Laporan Presensi Bulanan</IonCol>
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
      <IonRow style={{ backgroundColor: "var(--ion-color-violet)" }}>
        <IonCol>Tanggal</IonCol>
        <IonCol>Masuk</IonCol>
        <IonCol>Pulang</IonCol>
        <IonCol>Ket</IonCol>
      </IonRow>


      {/* Loading Indicator */}
      {loading && <IonRow><IonProgressBar color={"violet"} type="indeterminate" /></IonRow>}

      {/* Error Message */}
      {error && <IonRow style={{ backgroundColor: "var(--ion-color-rose)" }} className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}

      {/* Data */}
      {data?.filter((v) => {
        return v.hari !== "Sabtu" && v.hari !== "Minggu"
      }).map((item) => {
        return {
          ...item,
          masuk: sliceTime(item.masuk),
          pulang: sliceTime(item.pulang),
          tanggal: `${item.hari} ${item.tanggal}`
        }
      }).map((item, index) => (
        <IonRow style={{ border: "2px solid var(--ion-color-violet)" }} key={index}>
          <IonCol>{item.tanggal}</IonCol>
          <IonCol>{item.masuk?.replace(":00", "")}</IonCol>
          <IonCol>{item.pulang?.replace(":00", "")}</IonCol>
          <IonCol>{item.ket}</IonCol>
        </IonRow>
      ))}
      {
        data && <IonRow style={{ border: "2px solid var(--ion-color-violet)" }}>
          <IonCol></IonCol>
          <IonCol>Total</IonCol>
          <IonCol>{totalHour}</IonCol>
          <IonCol></IonCol>
        </IonRow>
      }
      {
        data && data?.length > 0 && <IonRow style={{ backgroundColor: "var(--ion-color-violet)" }}>
          <IonCol>
            <IonButton download="laporan.docx" shape="round" href={`${process.env.REACT_APP_URL_API}/laporan/download?employee_id=${state.user?.employee.id}&bulan=${thisMonth}&tahun=${thisYear}`} >
              <IonIcon slot="start" icon={download} className="ion-margin-end" />
              Download Laporan</IonButton>
          </IonCol>
        </IonRow>
      }
    </IonGrid>
  )
}