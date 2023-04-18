import { IonItemGroup, IonItemDivider, IonLabel, IonAccordionGroup, IonAccordion, IonItem, IonText } from "@ionic/react";
import { IPresensiDetail, IPresensiListProp } from "../interfaces/IProps";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import PresensiListByDate from "./PresensiListByDate";

export default function PresensiList(prop: IPresensiListProp) {

	const [dates, setDates] = useState<any[]>([]);
	const [expandedPosition, setExpandedPosition] = useState<string>();

	useEffect(() => {

		const monthDate = moment(prop.year + '-' + (prop.month + 1), 'YYYY-MM');

		let daysInMonth = monthDate.daysInMonth();
		const arrDays: any[] = [];

		while (daysInMonth) {
			const current = moment(`${monthDate.format('YYYY-MM')}-${daysInMonth}`, 'YYYY-MM-DD')
			arrDays.push({ tanggal: current.format('YYYY-MM-DD'), hari: current.format('dddd DD MMMM YYYY') });
			daysInMonth--;
		}

		setDates(arrDays);

		console.log('ok render')

	}, []);

	const SetExpanded = useCallback((e: any) => {
		setExpandedPosition(e.detail.value)
		// console.log(e.detail.value)
	}, [])


	return <IonAccordionGroup onIonChange={SetExpanded}>
		{dates.map((row, i) => {
			++i;
			return <IonAccordion value={`${i}OnsIte`} key={i}>
				<IonItem slot="header" color="light">
					<IonLabel>Presensi {row.hari}</IonLabel>
				</IonItem>
				{expandedPosition === `${i}OnsIte` ? <PresensiListByDate date={row.tanggal} pegawaiId={prop.pegawaiId} /> : <div className="ion-padding" slot="content">
					<IonText>Tidak ada Data</IonText>
				</div>}
			</IonAccordion>
		})}
	</IonAccordionGroup>
}
