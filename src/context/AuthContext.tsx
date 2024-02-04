import * as React from "react";
import { IAuthContext } from "../interfaces/IContext";
import { httpInstance } from "../utils/HttpClient";
import { Preferences } from '@capacitor/preferences';

export type User = {
	id: number,
	name: string,
	identifier: string,
	role_id: number,
	role: {
		role_name: string,
		role_position: "Single" | "Multiple"
	},
	employee: {
		fullname: string,
		photos: string,
		employee_level_id: number,
		employee_level: {
			level_name: string,
			level_position: "Single" | "Multiple"
		}
	}
}

export const AuthContext = React.createContext<{
	state: IAuthContext<null | User>, deState: {
		setLoading: (par: boolean) => void,
		setToken: (token: string) => void,
		checkAuth: () => Promise<null | User>,
		setUser: (user: User) => void
	}
}>({
	state: {
		isLoading: true,
		token: "",
		user: null
	},
	deState: {
		setLoading: function (par: boolean): void {
			throw new Error("Function not implemented.");
		},
		setToken: function (token: string): void {
			throw new Error("Function not implemented.");
		},
		checkAuth: function (): Promise<null | User> {
			return new Promise<null | User>((resolve, reject) => {
				resolve(null);
			})
		},
		setUser(user: User) {
			throw new Error("Function not implemented.");
		},
	}
});

type AuthContextProviderProps = {
	children: React.ReactNode
};


export const AuthProvider = ({ children }: AuthContextProviderProps) => {

	const [state, setState] = React.useState<IAuthContext<null | User>>({
		isLoading: false,
		token: null,
		user: null
	});


	const deState = {
		setLoading: (par: boolean) =>
			setState((prev) => {
				prev.isLoading = par;
				return { ...prev };
			}),
		setToken: async (token: string) => {
			await Preferences.set({
				key: 'token',
				value: token,
			});

			setState((prev) => {
				prev.token = token;
				return { ...prev };
			})
		},
		checkAuth: async () => {
			deState.setLoading(true);
			const { value: token } = await Preferences.get({ key: 'token' });
			if (token) {
				const httpClient = httpInstance(token);
				try {
					const res = await httpClient.get<User>("/user");
					setState({
						isLoading: false,
						token: token,
						user: res.data
					});
				} catch (error) {
					setState({
						isLoading: false,
						token: "",
						user: null
					});
				}
			}
			return null
		},
		setUser(user: User) {
			setState((prev) => {
				prev.user = user;
				return { ...prev };
			});
		}
	};

	return (
		<AuthContext.Provider value={{ state, deState }}>
			{children}
		</AuthContext.Provider>
	);
}