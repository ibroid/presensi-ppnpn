import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonIcon,
	IonLabel,
	IonTabButton
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Presensi from "./Presensi";
import { calendar, location, statsChart, listOutline } from "ionicons/icons";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Activity from "./Activity";

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

			<IonTabBar slot="bottom" color={'tertiary'} className="footerContainer">
				<IonTabButton tab="tab1" href="/app/presensi">
					<IonIcon icon={location} />
					<IonLabel>Presensi</IonLabel>
				</IonTabButton>

				<IonTabButton tab="aktivitas" href="/app/aktivitas">
					<IonIcon icon={listOutline} />
					<IonLabel>Aktivitas</IonLabel>
				</IonTabButton>

			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs;