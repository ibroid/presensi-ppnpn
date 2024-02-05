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
} from "@ionic/react";
import { chevronBackOutline, save, saveOutline } from "ionicons/icons";

import { useContext, useState } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { useHistory } from "react-router-dom";
import usePegawaiList from "../hooks/usePegawaiList";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { error } from "console";
import { AuthContext } from "../context/AuthContext";

type RegisterForm = {
	employee_id: number;
	identifier: string;
	password: string;
	name: string;
}

const Register: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [toast] = useIonToast();
	const { deState } = useContext(AuthContext)
	const route = useIonRouter()

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

	const onSubmit: SubmitHandler<RegisterForm> = (data) => {
		setLoading(true)
		httpInstance(null).post("/register", data)
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
			.finally(() => setLoading(false))
	};

	return (
		<IonPage className="pageContainer">
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
							<IonSelect
								onIonChange={(e) => {
									if (pegawais && pegawais.length > 0) {
										setValue("name", pegawais.find((x) => x.id === e.target.value)?.fullname ?? "Isi nama panggilan saja");
									}
								}}
								label="Pegawai"
								interface="action-sheet"
								{...register("employee_id", { required: "Tidak boleh kosong" })}
							>
								{pegawais?.map((row: IPegawaiResponse, i: number) => (
									<IonSelectOption key={i} value={row.id}>
										{row.fullname}
									</IonSelectOption>
								))}
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonInput
								{...register("name", { required: "Tidak boleh kosong" })}
								label="Nama :"
								type="text"
							></IonInput>
						</IonItem>
						<IonItem>
							<IonInput
								{...register("identifier", { required: "Tidak boleh kosong" })}
								label="Nomor HP :"
								type="number"
							></IonInput>
						</IonItem>
						<IonItem>
							<IonInput
								{...register("password", { required: "Tidak boleh kosong" })}
								label="Password :"
								type="password"
							></IonInput>
						</IonItem>
						{loading && <IonProgressBar type="indeterminate" />}
					</IonList>
					<IonButton disabled={loading} type="submit" expand="full" color={"skyblue"}>
						<strong>Simpan</strong>
						<IonIcon slot="start" icon={save}></IonIcon>
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default Register;

