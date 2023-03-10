import {
	IonAvatar,
	IonBackButton,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonToast,
	useIonViewDidEnter
} from "@ionic/react"
import "../style/details.css";
import { arrowBackOutline, ellipsisHorizontal, chatbubbleOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { supabase } from "../utils/SupabaseClient";
import { duration } from "moment";
import { useState } from "react";
import { jabatan } from "../utils/Helper";

interface UserDetailPageProps
	extends RouteComponentProps<{
		id: string;
	}> { }

const Details: React.FC<UserDetailPageProps> = ({ match }) => {

	const [NotifToaster] = useIonToast();
	const [pegawai, setPegawai] = useState<any>();

	useIonViewDidEnter(() => {
		const bootstrapping = async () => {
			const { data, error } = await supabase.from('ppnpn').select('*').eq('id', match.params.id).single()
			if (error) {
				NotifToaster({
					message: 'Terjadi Kesalahan. ' + error.message,
					duration: 2000,
					position: 'top'
				})
			}

			if (data) {
				setPegawai(data)
			}
		}
		bootstrapping()
	})

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color={'tertiary'}>
					<IonButton slot="start">
						<IonBackButton color={'light'} defaultHref="/app/tab3" />
					</IonButton>
					<IonTitle>Statistic Pegawai</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div id="Pw9uiFXE8bJTD0uxttda">
					<IonGrid class="ion-no-padding">
						<IonRow>
							<IonCol size="12">
								<IonCard class="card">
									<IonCardHeader class="ion-no-padding" color={'medium'}>
										{/* <IonItem lines="none" class="">
												<IonButton
													fill="clear"
													color="light"
													size="large"
													class="ion-no-padding"
													mode="ios"
												>
													<IonIcon icon={arrowBackOutline}></IonIcon>
												</IonButton>
												<IonButton
													slot="end"
													fill="clear"
													color="light"
													size="large"
													class="ion-no-padding"
													mode="ios"
												>
													<IonIcon icon={ellipsisHorizontal}></IonIcon>
												</IonButton>
											</IonItem> */}
									</IonCardHeader>
									<IonCardContent>
										<IonRow>
											<IonCol size="12">
												<div className="profile ion-text-center">
													<div className="img">
														<IonAvatar class="large">
															<img
																alt="person's pic"
																src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
															/>
														</IonAvatar>
													</div>
													<div className="name">
														<IonText class="ion-margin-top  ion-text-nowrap">
															<span className="title">{pegawai?.fullname}</span>
														</IonText>
														<IonText class="ion-margin-bottom  ion-text-nowrap">
															<span className="sub-title">{jabatan(pegawai?.jabatan_id)}</span>
														</IonText>
													</div>
													<div className="action">
														<IonButton
															fill="solid"
															color="warning`"
															shape="round"
															mode="ios"
															size="small"
														>
															Riwayat Bulan Ini
														</IonButton>
														<IonButton
															class="ion-no-padding"
															fill="outline"
															color="medium"
															shape="round"
															mode="ios"
															size="small"
														>
															<IonIcon icon={chatbubbleOutline}></IonIcon>
														</IonButton>
													</div>
												</div>
											</IonCol>
										</IonRow>
									</IonCardContent>
								</IonCard>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Details;