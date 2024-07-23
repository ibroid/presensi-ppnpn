export interface IJabatanResponse {
    id: number;
    nama_jabatan: string;
    created_at: Date
}

export interface IPegawaiResponse {
    "id": number,
    "fullname": string,
    "employee_level_id": number,
    "created_at": Date,
    "updated_at": null | Date,
    "photos": string
}

export interface IPresensiResponse {
    absen: number;
    created_at: string;
    id: 4;
    ppnpn_id: number;
    status: 1;
    tanggal: string;
    updated_at: null | string;
    waktu: string;
    jenis: 1 | 2 | 3 | 4 | 5
}

export interface IPresensiWithPpnpnResponse {
    absen: number;
    created_at: string;
    id: 4;
    ppnpn_id: number;
    status: 1;
    tanggal: string;
    updated_at: null | string;
    waktu: string;
    jenis: 1 | 2 | 3;
    ppnpn: IPegawaiResponse
}

export interface IPpnpnWithPresensi {
    "id": number,
    "fullname": string,
    "jabatan_id": number,
    "created_at": Date,
    "updated_at": null | Date,
    "photos": string,
    presensi: IPresensiResponse[]
}

export type Presence = {
    id: number;
    status: number;
    session: number;
    present_date: Date;
    present_time: string;
    employee_id: number;
    created_at: Date;
    updated_at: Date;
    location: string;
}

export type CreatePresenceResponse = {
    status: string;
    message: string;
    data: Presence;
}

export type Activity = {
    id: number;
    doing: string;
    doing_time: string;
    note: string;
    doing_date: Date;
    created_at: Date;
    updated_at: Date;
}
export type Monitor = {
    list: PegawaiWithPresenceToday[];
    total_sudah: number;
    total_belum: number;
}

export type PegawaiWithPresenceToday = {
    id: number;
    fullname: string;
    photos: string;
    employee_level_id: number;
    created_at: Date;
    updated_at: Date | null;
    masuk: string | null;
    pulang: string | null;
}

export type LaporanResponse = {
    no: number;
    tanggal: string;
    hari: string;
    masuk: string;
    pulang: string;
    total: string;
    ket: string;
}

export type LaporanActivityResponse = {
    id: number;
    doing: string;
    doing_time: string;
    note: string;
    doing_date: string;
    created_at: Date;
    updated_at: Date;
}