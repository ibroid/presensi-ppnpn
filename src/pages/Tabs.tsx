import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonIcon,
	IonLabel,
	IonTabButton
} from "@ionic/react";
import { Redirect, Route, } from "react-router";
import Presensi from "./Presensi";
import { listOutline, receiptOutline, barChartOutline, locationOutline } from "ionicons/icons";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Activity from "./Activity";
import "../style/tabs.css";

const Tabs: React.FC = () => {
	const { state } = useContext(AuthContext)
	if (state.user == null) {
		return <Redirect to="/auth" />
	}

	return (
		<IonTabs>
			<IonRouterOutlet >
				<Route exact path={"/app"}>
					<Redirect to="/app/presensi" />
				</Route>
				<Route exact path={'/app/presensi'} render={() => <Presensi />} />
				<Route exact path={'/app/aktivitas'} render={() => <Activity />} />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color={'rose'} className="footerContainer">
				<IonTabButton tab="tab1" href="/app/presensi">
					<IonIcon size="small" icon={locationOutline} />
					<IonLabel>Presensi</IonLabel>
				</IonTabButton>

				<IonTabButton tab="aktivitas" href="/app/aktivitas">
					<IonIcon size="small" icon={listOutline} />
					<IonLabel>Aktivitas</IonLabel>
				</IonTabButton>

				<IonTabButton tab="laporan" href="/app/monitoring">
					<IonIcon size="small" icon={barChartOutline} />
					<IonLabel>Monitoring</IonLabel>
				</IonTabButton>

				<IonTabButton tab="laporan" href="/app/laporan">
					<IonIcon size="small" icon={receiptOutline} />
					<IonLabel>Laporan</IonLabel>
				</IonTabButton>

			</IonTabBar >
		</IonTabs >
	)
}

export default Tabs;