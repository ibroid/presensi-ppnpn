import * as React from "react";
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
	useIonViewDidEnter,
	IonLoading,
	useIonViewWillEnter,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useCallback, useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext, User } from "../context/AuthContext";
import { AxiosError } from "axios";
import RegisterButton from "../components/RegisterButton";
import { GlobalContext } from "../context/GlobalContext";
import "../style/auth.css";
import useCheckAuth from "../hooks/useCheckAuth";

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
	const { dispatch } = useContext(AuthContext)
	const { server_variable } = useContext(GlobalContext)
	const [toast] = useIonToast()
	const route = useIonRouter()
	const [ionLoading, setIonLoading] = useState(false);

	const validSubmit = useCallback(async (data: LoginModel) => {
		setIonLoading(true)

		httpInstance().post<LoginResponse>("/login", data)
			.then(res => {
				dispatch({ type: "SET_USER", payload: res.data.user })
				dispatch({ type: "SET_TOKEN", payload: res.data.token })
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
				setIonLoading(false)
			})
	}, [dispatch, route, toast])

	const { isLoading, error, errorMessage, user, token } = useCheckAuth()
	const router = useIonRouter()

	const setAuthData = useCallback(() => {
		if (error) {
			toast({
				message: errorMessage,
				duration: 3000,
				color: "danger",
				buttons: [{
					text: "Ok",
					role: "cancel",
				}]
			})
		}

		if (!isLoading) {
			if (user !== null) {
				dispatch({ type: "SET_USER", payload: user })
				dispatch({ type: "SET_TOKEN", payload: token })
				router.push("/app", "root", "replace")
			}
		}
	}, [dispatch, error, errorMessage, isLoading, router, toast, user, token])

	useEffect(() => {
		setAuthData();
	}, [setAuthData])


	return (
		<IonPage className="pageContainer">
			<IonHeader className="ion-no-border">
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
				<form onSubmit={handleSubmit(validSubmit)}>
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
				<IonLoading isOpen={ionLoading} message="Loading ..." />
			</IonContent>
		</IonPage >

	);
};

export default Auth;

