import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonIcon,
	IonLabel,
	IonTabButton
} from "@ionic/react";
import { Redirect, Route } from "react-router";
<<<<<<< HEAD
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
=======
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import { calendar, location, statsChart } from "ionicons/icons";
import Details from "./Details";


const Tabs: React.FC = () => {
	return (
		<IonTabs>
			<IonRouterOutlet >
				<Route exact path={'/app/tab1'} component={Tab1} />
				<Route exact path={'/app/tab2'} component={Tab2} />
				<Route exact path={'/app/tab3'} component={Tab3} />
				<Route exact path={'/app/tab3/details/:id'} component={Details} />
				<Route exact path={'/app'}>
					<Redirect to="/app/tab1" />
				</Route>
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color={'tertiary'} className="footerContainer">
				<IonTabButton tab="tab1" href="/app/tab1">
>>>>>>> main
					<IonIcon icon={location} />
					<IonLabel>Presensi</IonLabel>
				</IonTabButton>

<<<<<<< HEAD
				<IonTabButton tab="aktivitas" href="/app/aktivitas">
					<IonIcon icon={listOutline} />
					<IonLabel>Aktivitas</IonLabel>
				</IonTabButton>

=======
				<IonTabButton tab="tab2" href="/app/tab2">
					<IonIcon icon={calendar} />
					<IonLabel>Riwayat</IonLabel>
				</IonTabButton>

				<IonTabButton tab="tab3" href="/app/tab3">
					<IonIcon icon={statsChart} />
					<IonLabel>Statistic</IonLabel>
				</IonTabButton>
>>>>>>> main
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs;