import * as React from "react";
import { IAuthContext } from "../interfaces/IContext";
import { Storage } from "@ionic/storage";

export const AuthContext = React.createContext<{
	state: IAuthContext, deState: {
		setLoading: (par: boolean) => void,
		setToken: (token: string, refresh: string) => void,
		checkAuth: () => Promise<void>
	}
}>({
	state: {
		isLoading: true,
		token: ""
	},
	deState: {
		setLoading: function (par: boolean): void {
			throw new Error("Function not implemented.");
		},
		setToken: function (token: string, refresh: string): void {
			throw new Error("Function not implemented.");
		},
		checkAuth: function (): Promise<void> {
			throw new Error("Function not implemented.");
		}
	}
});

type AuthContextProviderProps = {
	children: React.ReactNode
};


export const AuthProvider = ({ children }: AuthContextProviderProps) => {
	const [state, setState] = React.useState<IAuthContext>({
		isLoading: true,
		token: ""
	})

	const [storage, setStorage] = React.useState<Storage>();

	React.useEffect(() => {
		const bootstrapping = async (): Promise<void> => {
			const newStorage = new Storage({
				name: 'kuyabatokdb'
			});

			const storage = await newStorage.create();

			setStorage(storage)
		}

		bootstrapping()
	}, [])

	const deState = {
		setLoading: (par: boolean) => setState(prev => {
			prev.isLoading = par;
			return { ...prev }
		}),
		setToken: (token: string, refresh: string) => setState(prev => {
			prev.token = token;
			storage?.set('refresh', refresh);
			return { ...prev };
		}),
		checkAuth: async () => {
			const refresh_token: string = await storage?.get('refresh');
			console.log(refresh_token)


		}
	}

	return <AuthContext.Provider value={{ state, deState }} >{children}</AuthContext.Provider>
}