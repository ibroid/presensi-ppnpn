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
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import { calendar, location, statsChart } from "ionicons/icons";
import Details from "./Details";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Tabs: React.FC = () => {
	const { state } = useContext(AuthContext)
	if (!state.user) {
		return <Redirect to="/auth" />
	}

	return (
		<IonTabs>
			<IonRouterOutlet >
				<Route exact path={'/app/presensi'} component={Presensi} />
				<Route exact path={'/app/tab2'} component={Tab2} />
				<Route exact path={'/app/tab3'} component={Tab3} />
				<Route exact path={'/app/tab3/details/:id'} component={Details} />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" color={'tertiary'} className="footerContainer">
				<IonTabButton tab="tab1" href="/app/presensi">
					<IonIcon icon={location} />
					<IonLabel>Presensi</IonLabel>
				</IonTabButton>

				<IonTabButton tab="tab2" href="/app/tab2">
					<IonIcon icon={calendar} />
					<IonLabel>Riwayat</IonLabel>
				</IonTabButton>

				<IonTabButton tab="tab3" href="/app/tab3">
					<IonIcon icon={statsChart} />
					<IonLabel>Statistic</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs;