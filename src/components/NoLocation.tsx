import { IonImg, IonText } from "@ionic/react"

export default function NoLocation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <IonImg src={require("../assets/images/lost.png")} />
      <h1>Lokasi Tidak Ditemukan</h1>
      <IonText color={"danger"} style={{ textAlign: "center" }}>
        <h5>Izinkan dan nyalakan GPS untuk memulai presensi</h5>
      </IonText>
    </div>
  );
}