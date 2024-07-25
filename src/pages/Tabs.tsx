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
import Monitoring from "./Monitoring";
import Laporan from "./Laporan";
import LaporanPegawai from "./LaporanPegawai";

const Tabs: React.FC = () => {
	const { state } = useContext(AuthContext)
	if (state.user == null) {
		return <Redirect to="/auth" />
	}

	if (state.user.employee.employee_level_id > 5) {
		return <TabsEmployee />
	} else {
		return <TabsManager />
	}
}

export function TabsEmployee() {
	return (
		<IonTabs>
			<IonRouterOutlet >
				<Route exact path={"/app"}>
					<Redirect to="/app/presensi" />
				</Route>
				<Route exact path={'/app/presensi'} render={() => <Presensi />} />
				<Route exact path={'/app/aktivitas'} render={() => <Activity />} />
				<Route exact path={'/app/monitoring'} render={() => <Monitoring />} />
				<Route exact path={'/app/laporan'} render={() => <Laporan />} />
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

				<IonTabButton tab="monitoring" href="/app/monitoring">
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

export function TabsManager() {
	return (
		<IonTabs>
			<IonRouterOutlet >
				<Route exact path={"/app"}>
					<Redirect to="/app/monitoring" />
				</Route>
				<Route exact path={'/app/monitoring'} render={() => <Monitoring />} />
				<Route exact path={'/app/laporan'} render={() => <LaporanPegawai />} />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color={'rose'} className="footerContainer">
				<IonTabButton tab="monitoring" href="/app/monitoring">
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