import { createContext, useEffect, useState } from "react";
import useTodayActivityListHook from "../hooks/useTodayActivityListHook";
import { IonGrid, IonProgressBar, IonRow, IonText } from "@ionic/react";

export type ActivityContextType = {
  stateActivity: any[],
  dispatchActivity: React.Dispatch<any>
}

export const ActivityContext = createContext({
  stateActivity: [],
  dispatchActivity: () => { }
} as ActivityContextType);

export function ActivityProvider({ children }: { children: React.ReactNode }) {

  const { error, loading, activities, errorMessage } = useTodayActivityListHook()
  const [stateActivity, dispatchActivity] = useState([])

  useEffect(() => {
    if (!error && !loading) {
      dispatchActivity(activities)
    }
  }, [loading, error, activities])


  if (loading) {
    return <IonProgressBar type='indeterminate' color={"violet"} />
  }

  if (error) {
    return <IonGrid>
      <IonRow className="ion-justify-content-center"><IonText>{errorMessage}</IonText></IonRow>
    </IonGrid>
  }

  return (
    <ActivityContext.Provider value={{ stateActivity, dispatchActivity }}>
      {children}
    </ActivityContext.Provider>
  )
}