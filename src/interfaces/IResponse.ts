export interface IJabatanResponse {
    id: number;
    nama_jabatan: string;
    created_at: Date
}

export interface IPegawaiResponse {
    "id": number,
    "fullname": string,
    "jabatan_id": number,
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
}