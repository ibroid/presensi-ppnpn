import { IPegawaiResponse, IPresensiResponse } from "./IResponse";

export interface IFormPresensiProp { pegawai: IPegawaiResponse, presensi: IPresensiResponse[], callback: Function }