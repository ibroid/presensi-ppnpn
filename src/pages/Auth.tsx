import {
	IonAlert,
	IonButton,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonInput,
	IonItem,
	IonItemDivider,
	IonList,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	// useIonViewDidEnter,
	useIonLoading,
	useIonRouter
} from "@ionic/react";
import { chevronBackOutline, create, eye, logIn, save } from "ionicons/icons";

import { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth: React.FC = () => {

	const { deState } = useContext(AuthContext);
	const history = useHistory();
	const [open, setOpen] = useState<boolean>(false);
	const [notifMessage, setNotifMessage] = useState<string>('Notif Message. ');
	const [phone, setPhone] = useState<string>('');
	const [present, dismiss] = useIonLoading();

	const nav = useIonRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		if (phone == '') {
			setNotifMessage('Silahkan Penuhi Form Berikut')
			return setOpen(true);
		}
		await present({
			message: 'Mohon Tunggu...',
			spinner: 'circles'
		})

		try {

		} catch (error: any) {
			setNotifMessage(prev => prev += String(error.message))
			setOpen((true))
		}

		await dismiss()
	}

	const debugLogin = async () => {
		await present({
			message: 'Loading...',
			duration: 3000
		})
		nav.push('/app', 'root', 'replace')
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
			<IonHeader >
				<IonToolbar color="tertiary">
					<IonTitle>Login Pengguna</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid fixed={true}>
					<IonRow>
						<IonText>
							<h1>Selamat Datang di Aplikasi Presensi PPNPN</h1>
						</IonText>
					</IonRow>
				</IonGrid>
				<IonText>
					<h4>Silahkan login untuk melanjutkan 🖥️</h4>
				</IonText>
				<IonList className="ion-margin-top">
					<IonItem>
						<IonInput label="Nomor HP :" type="number"></IonInput>
					</IonItem>
					<IonItem>
						<IonInput label="Password :" type="password"></IonInput>
					</IonItem>
				</IonList>
				<IonButton shape="round" expand="block" color={"tertiary"} className="ion-margin-top">
					Masuk
					<IonIcon slot="start" icon={logIn} className="ion-margin-end"></IonIcon>
				</IonButton>
				<IonItemDivider></IonItemDivider>
				<IonButton
					shape="round"
					expand="block"
					color={"skyblue"}
					className="ion-margin-top"
					routerLink="/register"

				>
					<strong> Daftar</strong>
					<IonIcon
						slot="start"
						icon={create}
						className="ion-margin-end"
					></IonIcon>
				</IonButton>

				<IonText style={{ textAlign: 'center' }}>
					<p>2024. Pengadilan Agama Jakarta Utara</p>
					<p>
						<a rel="noreferrer" target="_blank" href="https://mmaliki.my.id">Visit Developer</a>
					</p>
				</IonText>
			</IonContent>
		</IonPage >
	);
};

export default Auth;

