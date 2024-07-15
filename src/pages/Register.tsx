import {
<<<<<<< HEAD
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
=======
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
	IonInput,
	IonItem,
	IonNote,
	IonPage,
	IonRow,
>>>>>>> main
	IonSelect,
	IonSelectOption,
	IonText,
	IonToolbar,
<<<<<<< HEAD
	IonProgressBar,
	useIonToast,
	useIonRouter,
	IonGrid,
	IonRow,
	IonCol,
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
				<IonToolbar color={"amber"}>
					<IonButtons slot="start" onClick={() => history.goBack()}>
						<IonBackButton
							defaultHref="auth"
							text="Kembali"
							icon={chevronBackOutline}
							color="dark"
=======
	useIonViewDidEnter,
	useIonLoading
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

import "../style/auth.css";
import { FormEvent, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import { IJabatanResponse } from "../interfaces/IResponse";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
	const history = useHistory();
	const [open, setOpen] = useState<boolean>(false);
	const [notifMessage, setNotifMessage] = useState<string>('Notif Message');
	const [jabatan, setJabatan] = useState<IJabatanResponse[]>();
	const [formValue, setFormValue] = useState<{ fullname: string, jabatan_id: number, phone: string }>({
		fullname: '',
		jabatan_id: 0,
		phone: ''
	});

	useIonViewDidEnter(async () => {
		let jabatan;
		try {
			jabatan = await supabase.from("jabatan").select('*');
			// setJabatan(jabatan?.data!);
		} catch (error: any) {
			setNotifMessage(error.message);
			setOpen(true);
		}
	}, [])


	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (
			!formValue.fullname ||
			!formValue.phone ||
			formValue.jabatan_id == 0
		) {
			setNotifMessage('SIlahkan Penuhi Form Berikut')
			return setOpen(true);
		}
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
					<IonButtons slot="start" onClick={() => history.goBack()}>
						<IonBackButton
							defaultHref="login"
							text=""
							icon={chevronBackOutline}
							color="primary"
>>>>>>> main
						></IonBackButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
<<<<<<< HEAD
			<IonContent fullscreen class="ion-padding">
				<IonGrid>
					<IonRow class="ion-justify-content-between ion-align-items-center">
						<IonCol size="12" sizeXs="12" sizeMd="6" sizeLg="4" sizeXl="3" offsetMd="3" offsetLg="4" offsetXl="4">
							<IonText style={{ textAlign: "center" }}>
								<h3>Register Pengguna Baru</h3>
							</IonText>
						</IonCol>
						<IonCol >
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
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
=======
			<IonContent id="TIapJnqAtCEtfhCAtRzm">
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
											<h1 className="title ion-text-start ion-margin-bottom">
												Buat Akun Anda
											</h1>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol size="12">
											<IonItem >
												<IonInput
													type="text"
													value={formValue.fullname}
													onIonChange={e => setFormValue(prev => ({ ...prev, fullname: String(e.target.value) }))}
													placeholder="Masukan Nama Lengkap"
												></IonInput>
											</IonItem>
										</IonCol>
									</IonRow>
									<IonRow class="ion-margin-top">
										<IonCol size="12">
											<IonItem>
												<IonSelect placeholder="Pilih Jabatan" value={formValue.jabatan_id} onIonChange={e => setFormValue(prev => ({ ...prev, jabatan_id: e.target.value }))}>
													{jabatan?.map((row, i) => <IonSelectOption key={++i} value={row.id}>{row.nama_jabatan}</IonSelectOption>)}
												</IonSelect>
											</IonItem>
										</IonCol>
									</IonRow>
									<IonRow class="ion-margin-top">
										<IonCol size="12">
											<IonItem class="">
												<IonInput
													class="ion-padding-start"
													type="number"
													value={formValue.phone}
													placeholder="Nomor Telepon"
													onIonChange={(e) => setFormValue(prev => ({ ...prev, phone: String(e.target.value) }))}
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
														Daftar
													</IonButton>
												</IonCol>
											</IonRow>
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

export default Register;

