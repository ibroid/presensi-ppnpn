import {
	IonAlert,
	IonButton,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonItemDivider,
	IonList,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonLoading,
	useIonRouter
} from "@ionic/react";
import { logIn } from "ionicons/icons";

import { useForm } from "react-hook-form";

type LoginModel = {
	phone: string;
	password: string;
}

const Auth: React.FC = () => {


	const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>()


	const submit = (data: LoginModel) => {

	}

	return (
		<IonPage className="pageContainer">
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
				<form onSubmit={handleSubmit(submit)}>
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
				</form>
				<IonItemDivider></IonItemDivider>


				<IonText className="ion-margin-start" style={{ textAlign: 'center' }}>
					<p>2024. Pengadilan Agama Jakarta Utara</p>
					<p>
						<a rel="noreferrer" target="_blank" href="https://mmaliki.my.id">Visit Developer</a>
					</p>
				</IonText>
			</IonContent>
		</IonPage>

	);
};

export default Auth;

