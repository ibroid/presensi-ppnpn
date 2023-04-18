import { IonItem, IonLabel, IonAvatar, IonImg, IonText } from "@ionic/react";
import { imgSesi, sesiAben } from "../utils/Helper";
import { IPresensiListByDateProp } from "../interfaces/IProps";
import usePresensiList from "../hooks/usePresensiList";
import { useEffect } from "react";

export default function PresensiListByDate({ date, pegawaiId }: IPresensiListByDateProp) {

	const { presensi, loading } = usePresensiList({
		date, pegawaiId,
		timestamp: 0
	})


	if (loading) {
		return <div className="ion-padding" slot="content">
			<IonText>Loading</IonText>
		</div>
	}

	return <div className="ion-padding" slot="content">
		{presensi?.data.length !== 0 ? presensi?.data.map((row, i) => {
			return <IonItem button key={++i} >
				<IonLabel>
					<h1>{row.waktu.replace('+00', '')}</h1>
					<p>Presensi {sesiAben(row.jenis)}</p>
				</IonLabel>
				<IonAvatar>
					<IonImg src={imgSesi(row.jenis)} />
				</IonAvatar>
			</IonItem>
		}) : <IonText>Tidak Ada Presensi</IonText>}
	</div>
}