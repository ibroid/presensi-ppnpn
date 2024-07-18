import { createContext, Dispatch, useEffect, useReducer } from "react";
import { Presence } from "../interfaces/IResponse";
import { Position } from "@capacitor/geolocation";
import usePresensiList from "../hooks/usePresensiList";
import { IonGrid, IonProgressBar, IonRow, IonText } from "@ionic/react";

type PresentContextType = {
  state: {
    session: number;
    location?: Position;
    todayPresence: Presence[]
  },
  dispatch?: Dispatch<ReducerActionType<any>>
}

type ReducerActionType<T> = {
  type: "SET_LOCATION" | "SET_TODAY_PRESENT" | "SET_SESSION";
  payload: T;
}

export const PresentContext = createContext<PresentContextType>({
  state: {
    session: 0,
    location: undefined,
    todayPresence: [],
  },
  dispatch: undefined
});

function reducer(state: PresentContextType["state"], action: ReducerActionType<any>) {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload
      }

    case "SET_TODAY_PRESENT":
      return {
        ...state,
        todayPresence: action.payload
      }

    case "SET_SESSION":
      return {
        ...state,
        session: action.payload
      }
  }
}

export function PresentProvider({ children }: { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(reducer, {
    location: null,
    session: 0,
    todayPresence: [],
  });

  const { error, errorMessage, loading, presensi } = usePresensiList();


  useEffect(() => {
    if (!error && !loading) {
      dispatch({
        type: "SET_TODAY_PRESENT",
        payload: presensi
      })
    }
  }, [error, loading, presensi])


  if (loading) {
    return <IonProgressBar type='indeterminate' color={"violet"} />
  }

  if (error) {
    return <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonText>Terjadi kesalahan : {errorMessage}</IonText>
      </IonRow>
    </IonGrid>
  }

  return (
    <PresentContext.Provider value={{ state, dispatch }} >
      {children}
    </PresentContext.Provider>
  );
}