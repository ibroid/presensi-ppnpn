import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonList,
	IonInput,
	IonItem,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonText,
	IonToolbar,
	IonProgressBar,
	useIonToast,
	useIonRouter,
	IonGrid,
	IonRow,
	IonCol,
	useIonLoading,
} from "@ionic/react";
import { chevronBackOutline, save } from "ionicons/icons";

import { useContext, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { useHistory } from "react-router-dom";
import usePegawaiList from "../hooks/usePegawaiList";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";

type RegisterForm = {
	employee_id: number;
	identifier: string;
	password: string;
	name: string;
}

const Register: React.FC = () => {
	const [toast] = useIonToast();
	const { deState } = useContext(AuthContext)
	const route = useIonRouter()
	const [loadingStart, loadingClose] = useIonLoading();

	const {
		error: errPegawaiList,
		loading: loadingPegawai,
		pegawais,
	} = usePegawaiList();

	const history = useHistory();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<RegisterForm>();

	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {

		await loadingStart({
			message: "Loading...",
			spinner: "dots",
			duration: 2000
		});

		httpInstance().post("/register", data)
			.then((res) => {
				deState.setUser(res.data.user)
				deState.setToken(res.data.token)
				route.push("/app", "root", "replace")
			})
			.catch(err => {
				let errorMessage = "";
				if (err instanceof AxiosError && err.isAxiosError) {
					errorMessage = err.response?.data.message ?? err.response?.data.error.message
				} else {
					errorMessage = err.message
				}

				toast({
					message: errorMessage,
					duration: 5000,
					color: "danger",
					buttons: [{
						text: "Tutup",
						role: "cancel",
					}]
				})
			})
			.finally(() => loadingClose())
	};

	return (
		<IonPage className="pageContainer">
			<IonHeader>
				<IonToolbar color={"amber"}>
					<IonButtons slot="start" onClick={() => history.goBack()}>
						<IonBackButton
							defaultHref="auth"
							text="Kembali"
							icon={chevronBackOutline}
							color="dark"
						></IonBackButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen class="ion-padding">
				<IonGrid>
					<IonRow className="ion-justify-content-center ion-margin">
						<IonText style={{ textAlign: "center" }}>
							<h3>Register Pengguna Baru</h3>
						</IonText>
					</IonRow>
					<IonRow class="ion-justify-content-between ion-align-items-center">
						<IonCol >
							<form onSubmit={handleSubmit(onSubmit)}>
								<IonSelect
									labelPlacement="floating"
									fill="outline"
									color={"amber"}
									shape="round"
									onIonChange={(e) => {
										if (pegawais && pegawais.length > 0) {
											setValue("name", pegawais.find((x) => x.id === e.target.value)?.fullname ?? "Isi nama panggilan saja");
										}
									}}
									label="Pegawai"
									interface="alert"
									{...register("employee_id", { required: "Tidak boleh kosong" })}
								>
									{pegawais?.map((row: IPegawaiResponse, i: number) => (
										<IonSelectOption key={i} value={row.id}>
											{row.fullname}
										</IonSelectOption>
									))}
								</IonSelect>
								<IonInput
									className="ion-invalid ion-touched"
									color={"amber"}
									labelPlacement="floating"
									fill="outline"
									shape="round"
									placeholder="Auto isi :"
									label="Nama :"
									{...register("name", { required: "Tidak boleh kosong" })}
									type="text"
									errorText={errors.name?.message ?? undefined}
								/>
								<IonInput
									className="ion-invalid ion-touched"
									color={"amber"}
									labelPlacement="floating"
									fill="outline"
									shape="round"
									{...register("identifier", { required: "Tidak boleh kosong" })}
									label="Nomor HP :"
									type="number"
									placeholder="08xxxxxxx"
									errorText={errors.identifier?.message ?? undefined}
								/>
								<IonInput
									className="ion-invalid ion-touched"
									color={"amber"}
									{...register("password", { required: "Tidak boleh kosong" })}
									label="Password :"
									type="password"
									labelPlacement="floating"
									fill="outline"
									shape="round"
									errorText={errors.password?.message ?? undefined}
								/>
								<IonButton
									className="ion-margin-top"
									expand="block"
									shape="round"
									type="submit"
									color={"amber"}>
									<strong>Simpan</strong>
									<IonIcon slot="start" icon={save}></IonIcon>
								</IonButton>
							</form>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Register;

