import {
	IonAlert,
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonInput,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonToolbar,
	// useIonViewDidEnter,
	useIonLoading,
	useIonRouter
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

import "../style/auth.css";
import { FormEvent, useContext, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
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
			await supabase.from('ppnpn').select('*')
			const { data, error } = await supabase.auth.signInWithPassword({ phone, password: 'kuyabatok' });

			if (error) {
				throw new Error(error.message);
			}

			const user = await supabase.from('ppnpn').select('*').eq('user_id', data.user?.id)
			console.log(user);
			if (data.session) {
				deState.setToken(data.session.access_token, data.session.refresh_token);
				history.push('/tab1')
			}

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
		<IonPage>
			<IonAlert
				isOpen={open}
				onDidDismiss={() => setOpen(false)}
				header="Perhatian"
				message={notifMessage}
				buttons={['Ok']}
			/>
			<IonHeader
				mode="md"
				class="ion-no-padding ion-no-margin ion-no-border ion-hide-sm-up"
			>
				<IonToolbar>
					<div className="ion-text-center">
						<IonText>Selamat Datang</IonText>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent id="TIapJnqAtCEtfhCAtRzm">
				<div className="ion-text-center">
					<h2 className="ion-padding-0"><strong>Aplikasi Presensi PPNPN</strong></h2>
					<h5 className="ion-padding-0">Pengadilan Agama Jakarta Utara</h5>
				</div>
				<div className="login-bg">
					<IonGrid class="ion-no-padding">
						<IonRow class="ion-justify-content-center">
							<IonCol
								class="card"
								size="12"
								size-sm="6"
								size-md="4"
								size-lg="3"
							>
								<form onSubmit={(e) => handleSubmit(e)}>
									<IonRow class="ion-padding-vertical ion-hide-sm-down">
										<IonCol size="12">
											<IonButton
												color="primary"
												fill="clear"
												class="ion-no-padding ion-no-margin"
											>
												<IonIcon icon={chevronBackOutline}></IonIcon>
											</IonButton>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol size="12">
											<IonImg
												src="https://cdn-icons-png.flaticon.com/512/5968/5968331.png"
												class="logo"
												alt="Company Logo"
											></IonImg>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol size="12">
											<h1 className="title ion-text-center ion-margin-bottom center">
												Silahkan Masuk
											</h1>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol size="12">
											<IonItem >
												<IonInput
													type="text"
													value={phone}
													onIonChange={e => setPhone(String(e.target.value))}
													placeholder="Masukan Nomor Telepon"
												></IonInput>
											</IonItem>
										</IonCol>
									</IonRow>
									<IonRow class="ion-margin-top">
										<IonCol size="12">
											<IonRow class="ion-margin-bottom">
												<IonCol size="12">
													<IonButton
														type="submit"
														fill="solid"
														color="primary"
														class="login-button ion-text-capitalize ion-no-margin"
													>
														Masuk
													</IonButton>
												</IonCol>
											</IonRow>
										</IonCol>
									</IonRow>
									<IonRow class="ion-margin-vertical ion-justify-content-between">
										<IonCol size="12">
											<IonText color="medium" class="ion-text-center">
												<h6>Daftar Bisa Disni</h6>
											</IonText>
											<IonButton onClick={() => history.push('/register')} fill="outline" expand="block">Daftar</IonButton>
											<IonButton onClick={debugLogin} fill="outline" expand="block">Login Debug</IonButton>
										</IonCol>
									</IonRow>
								</form>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
			</IonContent>
		</IonPage >
	);
};

export default Auth;

