import { IPegawaiResponse, IPresensiResponse } from "./IResponse";

export interface IFormPresensiProp { pegawai: IPegawaiResponse }

export interface IUsePresensiList {
    pegawaiId: number;
    date: string | undefined;
    timestamp: number;
}

export interface IUsePresensiListByMonth {
    pegawaiId: number;
    timestamp: number;
    month: number;
    year: number;
}

export interface IUsePegawaiProp {
    pegawaiId: number;
}

export interface IPresensiListProp {
    month: number;
    year: number;
    pegawaiId: number
}

export interface IPresensiListByDateProp {
    date: string
    pegawaiId: number;
}

export interface IPresensiDetail { row: any, i: number, pegawaiId: number }

export type DefaultHeaderProps = {
    title: string
}