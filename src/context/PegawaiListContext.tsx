import React, { createContext } from "react";
import { IPegawaiResponse } from "../interfaces/IResponse";
import { IonLoading, IonToast } from "@ionic/react";
import usePegawaiList from "../hooks/usePegawaiList";

export const PegawaiListContext = createContext<IPegawaiResponse[] | undefined>([{
    id: 0,
    fullname: "",
    jabatan_id: 0,
    created_at: new Date,
    updated_at: null,
    photos: ""
}])

type PegawaiListProp = {
    children: React.ReactNode
}

export const PegawaiListProvider = ({ children }: PegawaiListProp) => {

    const { error, loading, pegawai } = usePegawaiList();

    return <PegawaiListContext.Provider value={pegawai?.data}>
        {children}
        <IonLoading
            isOpen={loading}
            message={'Loading...'}
            duration={5000}
        />
        <IonToast
            isOpen={error}
            message={"Error : " + pegawai?.message}
            duration={1500}
            position='top'
            color={'danger'}
        />
    </PegawaiListContext.Provider>
}