import {
	IonButton,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
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

	);
};

export default Auth;

