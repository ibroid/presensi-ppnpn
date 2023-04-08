import { useEffect, useState } from "react";
import {
	IonItem,
	IonAvatar,
	IonImg,
	IonIcon,
	IonLabel,
	IonGrid,
	IonRow,
	IonText,
	IonButton,
	useIonToast,
	ToastOptions,
	useIonActionSheet,
	ActionSheetButton
} from "@ionic/react";

import {
	informationCircleOutline,
	saveOutline,
	arrowUndoOutline
} from 'ionicons/icons';

import { jabatan } from "../utils/Helper";
import { useCallback } from "react";
import { supabase } from '../utils/SupabaseClient';
import Clock from 'react-live-clock';
import moment from 'moment';
import { IFormPresensiProp } from "../interfaces/IProps";


export default function FormPresensi({ pegawai, presensi, callback }: IFormPresensiProp) {


	const [presentToast] = useIonToast();
	const [presentAction] = useIonActionSheet();
	const [presentSessionStatus, setPresentSessionStatus] = useState<boolean>(false);
	const [jenisSesiPresensi, setJenisSesiPresensi] = useState<number>(0);
	const [Moment] = useState<moment.Moment>(() => {
		return moment(Date.now()).locale('id');
	});

	const [buttonSelectSesiText, setButtonSelectSesiText] = useState<string>('Pilih Sesi Presensi');

	useEffect(() => {

		if (presensi.length === 0) {
			console.log("User Belum ada Presensi")
			return setPresentSessionStatus(true);
		}

		if (Moment.hour() <= 8 && Moment.hour() >= 5) {
			if (presensi[presensi.length - 1].jenis === 1) {
				console.log("User udah presensi pagi")
				return setPresentSessionStatus(false);
			} else {
				console.log("User belum presensi pagi")
				return setPresentSessionStatus(true);
			}
		}

		if (Moment.hour() >= 12 && Moment.hour() <= 13) {
			if (presensi[presensi.length - 1].jenis === 2) {
				console.log("User udah presensi siang")
				return setPresentSessionStatus(false);
			} else {
				console.log("User belum presensi siang")
				return setPresentSessionStatus(true);
			}
		}

		if (Moment.hour() >= 15 && Moment.hour() <= 20) {
			if (presensi[presensi.length - 1].jenis === 3) {
				console.log("User udah presensi malam")
				return setPresentSessionStatus(false);
			} else {
				console.log("User belum presensi malam")
				return setPresentSessionStatus(true);
			}
		}

		if (Moment.hour() >= 20 && Moment.hour() <= 23) {
			if (presensi[presensi.length - 1].jenis === 4) {
				console.log("User udah presensi masuk malam")
				return setPresentSessionStatus(false);
			} else {
				console.log("User belu presensi masuk malam")
				return setPresentSessionStatus(true);
			}
		}

	}, [pegawai.id, presensi.length])

	const NotifToaster = useCallback((position: 'top' | 'middle' | 'bottom', message: string, color: ToastOptions["color"]) => {
		presentToast({
			message: message,
			position: position,
			color: color,
			duration: 3000
		});
	}, [])

	const PopUpPilihSesi = useCallback(() => {
		const sesiPramubakti: ActionSheetButton[] = [
			{
				text: 'Masuk (Pagi)',
				handler() {
					setButtonSelectSesiText('Masuk (Pagi)')
					setJenisSesiPresensi(1)
				},
			},
			{
				text: 'Siang',
				handler() {
					setButtonSelectSesiText('Siang')
					setJenisSesiPresensi(2)
				},
			},
			{
				text: 'Pulang (Sore)',
				handler() {
					setButtonSelectSesiText('Pulang (Sore)')
					setJenisSesiPresensi(3)
				},
			},
		];
		const sesiSatpam = [
			{
				text: 'Masuk (Pagi)',
				handler() {
					setButtonSelectSesiText('Masuk (Pagi)')
					setJenisSesiPresensi(1)
				},
			},
			{
				text: 'Pulang (Sore)',
				handler() {
					setButtonSelectSesiText('Pulang (Sore)')
					setJenisSesiPresensi(3)
				},
			},
			{
				text: 'Masuk (Malam)',
				handler() {
					setButtonSelectSesiText('Masuk (Malam)')
					setJenisSesiPresensi(4)
				},
			},
			{
				text: 'Pulang (Pagi)',
				handler() {
					setButtonSelectSesiText('Pulang (Pagi)')
					setJenisSesiPresensi(5)
				},
			},
		];
		presentAction({
			header: 'Pilih salah satu Sesi Presensi',
			buttons: pegawai.jabatan_id <= 2 ? sesiPramubakti : sesiSatpam,
			onDidDismiss(event) {
				saveSesi()
			},
		})

	}, [pegawai.id])

	const saveSesi = useCallback(() => {
		const body = {
			status: 1,
			absen: 0,
			tanggal: Moment.format('Y-M-D'),
			waktu: moment(Date.now()).format('HH:mm:ss'),
			ppnpn_id: pegawai?.id,
			jenis: jenisSesiPresensi
		}
		if (jenisSesiPresensi !== 0) {

			presentAction({
				header: 'Simpan Presensi',
				buttons: [
					{
						text: 'Simpan',
						icon: saveOutline,
						async handler() {
							const { data, error } = await supabase.from('presensi').insert(body).select('*').single()
							if (error) {
								NotifToaster('top', 'Silahkan Coba Lagi Nanti', 'danger')
							}

							if (data) {
								// setPresensi(prev => {
								// 	return [...prev, data];
								// })
								callback(data)
								NotifToaster('top', 'Berhasil', 'success')
							}
						},
					},
					{
						text: 'Cancel',
						role: 'cancel',
						icon: arrowUndoOutline
					},
				],
			})
		}
	}, [pegawai.id, jenisSesiPresensi]);



	return <div>
		<IonItem lines="none">
			<IonAvatar slot="start">
				<IonImg
					onIonError={() => {
						NotifToaster('top', 'Foto gagal dimuat', 'danger');
					}}
					src={pegawai?.photos} alt='foto' />
			</IonAvatar>

			<IonIcon
				slot="end"
				icon={informationCircleOutline}
				size="large"
				class="ion-no-margin"
			></IonIcon>
			<IonLabel>
				{pegawai?.fullname}
				<p>{jabatan(pegawai?.jabatan_id || 0)}</p>
			</IonLabel>
		</IonItem>
		<IonItem>
			<IonGrid>
				<IonRow class='ion-justify-content-center'>
					<Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} />
				</IonRow>
			</IonGrid>
		</IonItem>
		{!presentSessionStatus
			? <IonItem>
				<IonGrid>
					<IonRow class='ion-justify-content-center'>
						<IonText color={'success'}>Tidak ada Presensi saat ini</IonText>
					</IonRow>
				</IonGrid>
			</IonItem>
			:
			<div className="action">
				<IonButton
					fill={'outline'}
					color={'success'}
					onClick={PopUpPilihSesi}
					shape="round"
					class="accept"
					mode="ios">
					{buttonSelectSesiText}
				</IonButton>
				<IonButton
					fill={'solid'}
					color={'tertiary'}
					onClick={saveSesi}
					shape="round"
					class="accept"
					mode="ios"
					disabled={jenisSesiPresensi === 0 ? true : false}
				>
					Simpan Presensi
				</IonButton>
			</div>
		}

	</div>;
}