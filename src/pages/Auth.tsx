import {
<<<<<<< HEAD
	IonButton,
=======
	IonAlert,
	IonButton,
	IonCol,
>>>>>>> main
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
<<<<<<< HEAD
	IonInput,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonToast,
	useIonRouter,
	useIonLoading,
	IonImg,
	IonCol,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext, User } from "../context/AuthContext";
import { AxiosError } from "axios";
import RegisterButton from "../components/RegisterButton";
import { GlobalContext } from "../context/GlobalContext";
import "../style/auth.css";

type LoginModel = {
	phone: string;
	password: string;
}

type LoginResponse = {
	user: User;
	token: string;
}

const Auth: React.FC = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>()
	const { deState, state } = useContext(AuthContext)
	const { server_variable } = useContext(GlobalContext)
	const [toast] = useIonToast()
	const route = useIonRouter()
	const [ionLoadingStart, ionLoadingClose] = useIonLoading()

	const validSubmit = async (data: LoginModel) => {

		await ionLoadingStart({
			message: "Loading...",
			spinner: "dots",
			duration: 2000
		})

		httpInstance(null).post<LoginResponse>("/login", data)
			.then(res => {
				deState.setUser(res.data.user)
				deState.setToken(res.data.token)
				route.push("/app", "root", "replace")
			})
			.catch(err => {
				if (err instanceof AxiosError && err.isAxiosError) {
					toast({
						message: err.response?.data.message ?? err.response?.data.error.message,
						duration: 3000,
						color: "danger",
						buttons: [{
							text: "Ok",
							role: "cancel",
						}]
					})
				} else {
					toast({
						message: err.message,
						duration: 3000,
						color: "danger",
						buttons: [{
							text: "Ok",
							role: "cancel",
						}]
					})
				}
			})
			.finally(() => {
				ionLoadingClose()
			})
	}

	const invalidSubmit = () => {
		console.log("is error :", errors)
	}

	useEffect(() => {
		deState.checkAuth()
	}, [])

	useEffect(() => {
		if (state.isLoading) {
			ionLoadingStart({
				duration: 2000,
				message: "Memeriksa User...",
				spinner: "dots"
			})
		} else {
			ionLoadingClose()
			if (state.user) {
				route.push("/app", "root", "replace")
			}
		}
	}, [state.isLoading])

	return (
		<IonPage className="pageContainer">
			<IonHeader >
				<IonToolbar color="rose">
					<IonTitle>Login Pengguna</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding-horizontal">
				<IonGrid fixed={true}>
					<IonRow className="ion-justify-content-center">
						<IonText>
							<h1 className="text-selamat-datang">Selamat Datang di {server_variable.app_name}</h1>
						</IonText>
						<IonImg src={require("../assets/images/attend.png")} alt="logo" />
						<IonText>
							<h4 className="text-selamat-datang">Silahkan login untuk melanjutkan 🖥️</h4>
						</IonText>
					</IonRow>
				</IonGrid>
				<form onSubmit={handleSubmit(validSubmit, invalidSubmit)}>
					<IonInput
						shape="round"
						className="ion-invalid ion-touched"
						errorText={errors.phone?.message}
						labelPlacement="floating"
						fill="outline"
						label="Nomor Telepon :"
						type="number"
						{...register("phone", {
							required: "Tidak Boleh Kosong",
							maxLength: {
								value: 15,
								message: "Maksimal 15 Karakter"
							}
						})} />
					<IonInput
						className="ion-invalid ion-touched"
						labelPlacement="floating"
						shape="round"
						fill="outline"
						errorText={errors.password?.message ?? undefined}
						label="Password :"
						type="password"
						{...register("password", { required: "Tidak Boleh Kosong" })} />
					<IonGrid>
						<IonRow>
							<IonCol>
								<IonButton type="submit" shape="round" color={"violet"} className="ion-margin-top" expand="block">
									<IonIcon slot="start" icon={logIn} className="ion-margin-end"></IonIcon>
									Login
								</IonButton>
							</IonCol>
							<IonCol>
								{server_variable.allow_registration === "true" && <RegisterButton />}
							</IonCol>
						</IonRow>
					</IonGrid>

				</form>

				<IonText className="ion-margin-start" style={{ textAlign: 'center' }}>
					<p>2024. Pengadilan Agama Jakarta Utara</p>
					<p>
						<a rel="noreferrer" target="_blank" href="https://mmaliki.my.id">Visit Developer</a>
					</p>
				</IonText>
			</IonContent>
		</IonPage >

=======
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
>>>>>>> main
	);
};

export default Auth;

