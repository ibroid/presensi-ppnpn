<<<<<<< HEAD
import { IonAvatar, IonGrid, IonImg, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import { IPresensiResponse } from "../interfaces/IResponse"
import { imgSesi, sesiAben } from "../utils/Helper"
=======
import { IonAvatar, IonGrid, IonImg, IonItem, IonLabel, IonLoading, IonRow, IonText, IonToast } from "@ionic/react"
import { IPresensiResponse } from "../interfaces/IResponse"
import { imgSesi, sesiAben } from "../utils/Helper"
import usePresensiList from "../hooks/usePresensiList"
import { useEffect } from "react"
>>>>>>> main

interface IWidgetPresensiListProp {
	presensi: IPresensiResponse[],
}

export default function WidgetPresensiList(prop: IWidgetPresensiListProp) {

	return <div id="FG6pmT3dZ2uqd9PWnlWo">
		<IonGrid class="ion-no-padding">
			<center>
				<IonText>Riwayat Presensi Anda</IonText>
			</center>
			<IonRow>
				<div className="widget">
					<div className="ion-padding-horizontal ion-no-padding-vertical">
						{prop.presensi.map((row: IPresensiResponse, i) => {
<<<<<<< HEAD
							return <IonItem key={++i} lines="none" className="ion-padding-vertical">
=======
							return <IonItem key={++i} lines="none" class="ion-padding-vertical">
>>>>>>> main
								<IonAvatar slot="start">
									<IonImg src={imgSesi(row.jenis)} />
								</IonAvatar>
								<IonLabel>
									<span className="title">{row.waktu}</span>
									<span className="sub-title">{sesiAben(row.jenis)}</span>
								</IonLabel>
							</IonItem>
						})}
					</div>
				</div>
			</IonRow>
		</IonGrid>
	</div>
}