import { IonItem, IonLabel, IonAvatar, IonImg, IonText, useIonAlert, useIonToast, useIonActionSheet } from "@ionic/react";
import { imgSesi, sesiAben } from "../utils/Helper";
import { IPresensiListByDateProp } from "../interfaces/IProps";
import usePresensiList from "../hooks/usePresensiList";
import { trash } from "ionicons/icons";
import { useCallback, useState } from "react";


export default function PresensiListByDate({ date, pegawaiId }: IPresensiListByDateProp) {

	const [prompt] = useIonAlert()
	const [NotifToaster] = useIonToast()
	const [actionSheet] = useIonActionSheet()
	const [refetch, setRefetch] = useState(0)
	const [proccess, setProccess] = useState(false)

	const hapusDataPresensi = useCallback(
		(id: number) => {
			prompt({
				header: 'Apa anda yakin ?',
				buttons: [
					{
						text: 'Batal',
						role: 'cancel',
					},
					{
						text: 'Yakin',
						role: 'confirm',
						handler: async () => {
							setProccess(true)

							setRefetch(prev => prev + 1);
							setTimeout(() => {
								setProccess(false);
							}, 2000)
						},
					},
				],
			})
		}
		, [])

	const UbahPresensi = useCallback(async (id: number) => {
		actionSheet({
			header: 'Ubah Status Presensi Anda',
			buttons: [
				{
					text: 'Ubah ke Presensi Datang',
					handler() {
						UbahJenisPresensi(id, 1);
					},
				},
				{
					text: 'Ubah ke Presensi Siang',
					handler() {
						UbahJenisPresensi(id, 2);
					},
				},
				{
					text: 'Ubah ke Presensi Pulang',
					handler() {
						UbahJenisPresensi(id, 3);
					},
				},
				{
					text: 'Ubah ke Presensi Datang (Shift Malam)',
					handler() {
						UbahJenisPresensi(id, 4);
					},
				},
				{
					text: 'Ubah ke Presensi Pulang (Shift Malam)',
					handler() {
						UbahJenisPresensi(id, 5);
					},
				},
				{
					text: 'Hapus Presensi Ini',
					icon: trash,
					role: 'destructive',
					handler() {
						hapusDataPresensi(id)
					},
				}
			],
			onDidDismiss: ({ detail }) => console.log(detail),
		})
	}, []);

	const UbahJenisPresensi = useCallback((id: number, jenis: number) => {
		setProccess(true);

	}, []);

	const { presensi, loading } = usePresensiList({
		date, pegawaiId,
		timestamp: refetch
	})


	if (loading) {
		return <div className="ion-padding" slot="content">
			<IonText>Loading...</IonText>
		</div>
	}

	if (proccess) {
		return <div className="ion-padding" slot="content">
			<IonText>Memperbaharui...</IonText>
		</div>
	}

	return <div className="ion-padding" slot="content">
		{presensi?.data.length !== 0 ? presensi?.data.map((row, i) => {
			return <IonItem button key={++i} onClick={() => UbahPresensi(row.id)}>
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