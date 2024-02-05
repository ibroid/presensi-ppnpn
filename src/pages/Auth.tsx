import {
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
	IonProgressBar,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonToast,
	useIonRouter,
	useIonLoading,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AuthContext, User } from "../context/AuthContext";
import { AxiosError } from "axios";
import RegisterButton from "../components/RegisterButton";
import { GlobalContext } from "../context/GlobalContext";

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
	const [loginLoading, setLoginLoading] = useState<boolean>(false)
	const [toast] = useIonToast()
	const route = useIonRouter()
	const [ionLoadingStart, ionLoadingClose] = useIonLoading()

	const validSubmit = (data: LoginModel) => {
		setLoginLoading(true)

		httpInstance(null).post<LoginResponse>("/login", data)
			.then(res => {
				deState.setUser(res.data.user)
				deState.setToken(res.data.token)
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
				setLoginLoading(false)
				route.push("/app", "root", "replace")
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
				<IonToolbar color="tertiary">
					<IonTitle>Login Pengguna</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonGrid fixed={true}>
					<IonRow>
						<IonText>
							<h1>Selamat Datang di {server_variable.app_name}</h1>
						</IonText>
					</IonRow>
				</IonGrid>
				<IonText>
					<h4>Silahkan login untuk melanjutkan 🖥️</h4>
				</IonText>
				<form onSubmit={handleSubmit(validSubmit, invalidSubmit)}>
					<IonList className="ion-margin-top">
						<IonItem>
							<IonInput className="ion-invalid ion-touched" errorText={errors.phone?.message} label="Telepon :" type="number"
								{...register("phone", {
									required: "Tidak Boleh Kosong",
									maxLength: {
										value: 15,
										message: "Maksimal 15 Karakter"
									}
								})} />
						</IonItem>
						<IonItem>
							<IonInput
								className="ion-invalid ion-touched"
								errorText={errors.password?.message ?? undefined}
								label="Password :"
								type="password"
								{...register("password", { required: "Tidak Boleh Kosong" })} />
						</IonItem>
						{loginLoading && <IonProgressBar type="indeterminate"></IonProgressBar>}
					</IonList>
					<IonButton disabled={loginLoading} type="submit" shape="round" expand="block" color={"tertiary"} className="ion-margin-top">
						Masuk
						<IonIcon slot="start" icon={logIn} className="ion-margin-end"></IonIcon>
					</IonButton>
				</form>
				<IonItemDivider></IonItemDivider>
				{server_variable.allow_registration === "true" && <RegisterButton />}

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

