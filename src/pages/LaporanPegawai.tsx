import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonLoading, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import DefaultHeader from "../components/DefaultHeader";
import { useCallback, useMemo, useState } from "react";
import SelectReportPeriode from "../components/SelectReportPeriode";
import usePegawaiList from "../hooks/usePegawaiList";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { download } from "ionicons/icons";
import useFetchLaporan from "../hooks/useFetchLaporan";
import { differenceInMinutes, parse } from "date-fns";
import usePresensiPdf from "../hooks/usePresensiPdf";
import useImageToBase64 from "../hooks/useImageToBase64";


export default function LaporanPegawai() {
  const [segment, setSegment] = useState("present")
  const { pegawais } = usePegawaiList();

  return (
    <IonPage>
      <DefaultHeader title="Laporan" />
      <IonContent fullscreen className="ion-padding">
        <IonSegment
          mode="ios"
          value={segment}
          style={{ backgroundColor: "var(--ion-color-violet)" }}
          onIonChange={(e) => setSegment(e.detail.value?.toString() ?? "present")}
        >
          <IonSegmentButton value="present" >
            <IonLabel>Kehadiran</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="activity">
            <IonLabel>Kegiatan</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {
          segment === "present" ? <PresentReport pegawai={pegawais} /> : <ActivityReport />
        }
      </IonContent>
    </IonPage >
  )
}

export function PresentReport({ pegawai }: any) {
  const thisMonth = useMemo(() => {
    return new Date().getMonth();
  }, [])

  const thisYear = useMemo(() => {
    return new Date().getFullYear();
  }, [])

  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

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

  const { exportPdf } = usePresensiPdf()
  const { imageBase64, fetchImage } = useImageToBase64(true)

  const { fetchLaporan, error, errorMessage, loading, data } = useFetchLaporan(true);

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

  const [selectedPegawai, setSelectedPegawai] = useState<any>(null);

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
        <IonCol className="ion-text-start">Pegawai</IonCol>
        <IonCol size="8" className="ion-text-start">
          <IonSelect
            labelPlacement="floating"
            fill="outline"
            placeholder="Pilih Nama"
            color={"amber"}
            shape="round"
            onIonChange={(e) => setSelectedPegawai(e.detail.value)}
            label="Pilih Pegawai"
            interface="alert"
          >
            {pegawai?.map((row: IPegawaiResponse, i: number) => (
              <IonSelectOption key={i} value={row}>
                {row.fullname}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-start">Bulan</IonCol>
        <IonCol size="8">
          <SelectReportPeriode
            onChange={(val) => { setSelectedMonth(parseInt(val)) }}
            defaultValue={selectedMonth} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {
            selectedPegawai && selectedMonth >= 0 &&
            <IonButton
              onClick={() => {
                fetchLaporan({
                  employee_id: selectedPegawai.id,
                  bulan: selectedMonth + 1,
                  tahun: thisYear
                })
                fetchImage(selectedPegawai.id)
              }}
              shape="round"
              color="violet">
              Tampilkan
            </IonButton>
          }
        </IonCol>
      </IonRow>
      {/* Error Message */}
      {error && <IonRow style={{ backgroundColor: "var(--ion-color-rose)" }} className="ion-text-center"><IonText>{errorMessage}</IonText></IonRow>}

      {
        data && <IonRow style={{
          backgroundColor: "var(--ion-color-danger)",
          borderRadius: "15px",
          marginBottom: "15px",
        }}>
          <IonCol className="ion-text-center">Apabila ada presensi yang kosong atau tertinggal, Silahkan hubungi bagian kepegawaian</IonCol>
        </IonRow>
      }

      {/* Data */}
      {data && <IonRow style={{ backgroundColor: "var(--ion-color-violet)" }}>
        <IonCol>Tanggal</IonCol>
        <IonCol>Masuk</IonCol>
        <IonCol>Pulang</IonCol>
        <IonCol>Ket</IonCol>
      </IonRow>}

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
        data && data.length > 0 && <IonRow style={{ border: "2px solid var(--ion-color-violet)" }}>
          <IonCol></IonCol>
          <IonCol>Total</IonCol>
          <IonCol>{totalHour}</IonCol>
          <IonCol></IonCol>
        </IonRow>
      }
      {
        data && data?.length > 0 && <IonRow style={{ backgroundColor: "var(--ion-color-violet)" }}>
          <IonCol>
            <IonButton
              shape="round"
              onClick={() => exportPdf(
                {
                  data,
                  periode: `${monthList[selectedMonth]} ${thisYear}`,
                  foto: imageBase64,
                  jabatan: selectedPegawai.employee_level.level_name,
                  nama: selectedPegawai.fullname
                })}>
              <IonIcon
                slot="start"
                icon={download}
                className="ion-margin-end"
              />
              Download Laporan</IonButton>
          </IonCol>
        </IonRow>
      }
      <IonLoading message="Loading..." isOpen={loading} />
    </IonGrid>
  )
}

export function ActivityReport() {
  const thisMonth = useMemo(() => {
    return new Date().getMonth();
  }, [])
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  return (<IonGrid>
    <IonRow>
      <IonCol className="ion-text-center">Fitur Ini Akan Tersedia Segera 😃</IonCol>
    </IonRow>
    {/* <IonRow>
      <IonCol className="ion-text-start">Nama</IonCol>
      <IonCol size="8" className="ion-text-start">: {state.user?.name}</IonCol>
    </IonRow> */}
    {/* <IonRow>
      <IonCol className="ion-text-start">Periode</IonCol>
      <IonCol size="8" className="ion-text-start">
        <SelectReportPeriode onChange={(val) => {
          setSelectedMonth(parseInt(val))
        }} defaultValue={selectedMonth} />
      </IonCol>
    </IonRow> */}
  </IonGrid>)
}