import {
	IonAvatar,
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react"

import { RouteComponentProps } from "react-router";
import {
	useState
} from "react";

import { jabatan } from "../utils/Helper";

import moment from "moment";
import { usePegawai } from "../hooks/usePegawai";
import PresensiList from "../components/PresensiList";

interface UserDetailPageProps
	extends RouteComponentProps<{
		id: string;
	}> { }


const Details: React.FC<UserDetailPageProps> = ({ match }) => {

	const { pegawai } = usePegawai({ pegawaiId: parseFloat(match.params.id) })

	const [selectedYear, setSelectedYear] = useState(2023);
	const [selectedMonth, setSelectedMonth] = useState(() => {
		return moment(new Date).month();
	})

	const [years] = useState<number[]>(() => {
		const Momment = moment(new Date).locale('id');

		const yearsSet = [];
		for (let i = 1; i >= 0; i--) {
			yearsSet.push(Momment.year() - i);
		}

		return yearsSet;
	});


	return (
		<IonPage className="pageContainer">
			<IonHeader>
				<IonToolbar color={'tertiary'}>
					<IonButtons slot="start">
						<IonBackButton color={'light'} defaultHref="/app/tab3" />
					</IonButtons>
					<IonTitle>Statistic Pegawai</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonItem className="ion-margin-bottom">
					<IonLabel>
						<h1>{pegawai?.data?.fullname}</h1>
						<p> {jabatan(pegawai?.data?.jabatan_id as number)}</p>
					</IonLabel>
					<IonAvatar>
						<img
							alt="person's pic"
							src={pegawai?.data?.photos}
						/>
					</IonAvatar>
				</IonItem>
				<IonRow className="ion-justify-content-center">
					<IonText>Lihat Riwayat Presensi Berdasarkan Periode</IonText>
				</IonRow>
				<IonSelect
					value={selectedMonth}
					aria-label="Pilih Bulan"
					placeholder="Pilih Periode Bulan"
					className="ion-margin-top"
					onIonChange={(e) => setSelectedMonth(e.target.value)}>
					{moment.months().map((row, i) => <IonSelectOption key={++i} value={i}>{row}</IonSelectOption>)}
				</IonSelect>
				<IonSelect
					value={selectedYear}
					placeholder="Pilih Periode Tahun"
					className="ion-margin-top"
					onIonChange={(e) => setSelectedYear(e.target.value)}>
					{years.map((row, i) => <IonSelectOption key={++i} value={row}>{row}</IonSelectOption>)}
				</IonSelect>
				{/* <IonButton expand="block" className="ion-margin">Tampilkan</IonButton> */}
				<PresensiList
					month={selectedMonth}
					year={selectedYear}
					pegawaiId={parseInt(match.params.id)}
				/>

			</IonContent>
		</IonPage>
	)
}

export default Details;