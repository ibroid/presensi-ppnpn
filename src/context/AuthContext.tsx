import * as React from "react";
import { IAuthContext } from "../interfaces/IContext";
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

export type AuthContextType = {
	state: any,
	dispatch: React.Dispatch<any>
}

export const AuthContext = React.createContext<AuthContextType>({
	state: {
		isLoading: true, token: null, user: null
	},
	dispatch: () => { }
})

const authReducer = (state: any, action: { type: "SET_LOADING" | "SET_TOKEN" | "SET_USER", payload?: any }) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_TOKEN":
			if (action.payload == null) {
				Preferences.remove({ key: 'token' });
			} else {
				Preferences.set({
					key: 'token',
					value: action.payload,
				});
			}
			return { ...state, token: action.payload };
		case "SET_USER":
			return { ...state, user: action.payload };
	}
};

type AuthContextProviderProps = {
	children: React.ReactNode
};

const InitialValue: IAuthContext<null | User> = {
	isLoading: true,
	token: null,
	user: null
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
	const [state, dispatch] = React.useReducer(authReducer, InitialValue);


	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
