import { Redirect, Route } from 'react-router-dom';
import {
	IonApp,
	IonRouterOutlet,
	setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from './pages/Tabs';
<<<<<<< HEAD
import Auth from './pages/Auth';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
=======

>>>>>>> main

setupIonicReact();

const Main: React.FC = () => {
<<<<<<< HEAD
=======

>>>>>>> main
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
<<<<<<< HEAD
					<AuthProvider>
						<Route path={"/auth"} component={Auth}></Route>
						<Route path={"/register"} component={Register}></Route>
						<Route exact path="/">
							<Redirect to="/app" />
						</Route>
						<Route path="/app" component={Tabs} />
					</AuthProvider>
=======
					<Route exact path="/">
						<Redirect to='/app' />
					</Route>
					<Route path="/app" component={Tabs} />
>>>>>>> main
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
};

export default Main;
