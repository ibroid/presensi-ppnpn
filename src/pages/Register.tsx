import {
	IonAlert,
	IonBackButton,
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonList,
	IonInput,
	IonItem,
	IonNote,
	IonPage,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonText,
	IonToolbar,
	useIonViewDidEnter,
	useIonLoading
} from "@ionic/react";
import { chevronBackOutline, save, saveOutline } from "ionicons/icons";

import { FormEvent, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { useHistory } from "react-router-dom";
import usePegawaiList from "../hooks/usePegawaiList";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterForm = {
	ppnpn_id: number;
	phone: string;
	password: string;
}

const Register: React.FC = () => {
	const { error: errPegawaiList, loading: loadingPegawai, pegawai } = usePegawaiList()
	const history = useHistory();
	const [open, setOpen] = useState<boolean>(false);
	const [notifMessage, setNotifMessage] = useState<string>('Notif Message');

	const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

	const onSubmit: SubmitHandler<RegisterForm> = (data) => {
		console.log(data)
	}


	return (
		<IonPage className="pageContainer">
			<IonAlert
				isOpen={open}
				onDidDismiss={() => setOpen(false)}
				header="Perhatian"
				message={notifMessage}
				buttons={['Ok']}
			/>
			<IonHeader>
				<IonToolbar color={"tertiary"}>
					<IonButtons slot="start" onClick={() => history.goBack()}>
						<IonBackButton
							defaultHref="auth"
							text=""
							icon={chevronBackOutline}
							color="light"
						></IonBackButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen class="ion-padding">
				<IonText>
					<h3>Register Pengguna Baru</h3>
				</IonText>
				<form onSubmit={handleSubmit(onSubmit)}>
					<IonList>
						<IonItem>
							<IonSelect label="Pegawai" placeholder="Pilih Disini">
								{pegawai?.data.map((row: IPegawaiResponse, i: number) => (
									<IonSelectOption key={i} value={row.id}>{row.fullname}</IonSelectOption>
								))}
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonInput {...register("phone", { required: true })} label="Nomor HP :" type="number"></IonInput>
						</IonItem>
						<IonItem>
							<IonInput {...register("password", { required: true })} label="Password :" type="password"></IonInput>
						</IonItem>
					</IonList>
					<IonButton type="submit" expand="full" color={"skyblue"}>
						<strong>Simpan</strong>
						<IonIcon slot="start" icon={save}></IonIcon>
					</IonButton>
				</form>
			</IonContent>
		</IonPage >
	);
};

export default Register;

