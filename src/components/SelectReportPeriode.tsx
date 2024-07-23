import { IonSelect, IonSelectOption } from "@ionic/react"
import { useMemo } from "react"

export default function SelectReportPeriode({ defaultValue, onChange }: { defaultValue: number, onChange?: (value: string) => void }) {
  const allMonth = useMemo(() => {
    return [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Augustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]
  }, [])

  return (
    <IonSelect
      interface="alert"
      placeholder="Pilih Bulan"
      value={defaultValue}
      defaultValue={defaultValue}
      fill="outline"
      labelPlacement="floating"
      label="Pilih Bulan"
      shape="round"
      onIonChange={(e) => {
        onChange && onChange(e.detail.value)
      }}
    >
      {allMonth.map((month, index) => (
        <IonSelectOption key={index} value={index}>
          {month}
        </IonSelectOption>
      ))}
    </IonSelect>
  )
}