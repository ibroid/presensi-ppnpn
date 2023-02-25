import sun from '../assets/icon/sun.png'
import sunrise from '../assets/icon/sunrise.png'
import sunset from '../assets/icon/sunset.png'

export function sesiAben(sesi: 1 | 2 | 3) {
    const session = ['', 'Datang', 'Siang', 'Pulang'];
    return session[sesi];
}

export const jabatan = (jabId: number): string => {
    const jabatanList = ['', 'Pramubakti', 'Supir', 'Satpam'];
    return jabatanList[jabId];
}

export function imgSesi(sesi: 1 | 2 | 3) {
    const imgs = ['', sunrise, sun, sunset]
    return imgs[sesi]
}

export function setSesi(hour: number) {
    if (hour > 8 && hour < 12) {
        return 1;
    }

    if (hour > 12 && hour < 13) {
        return 2;
    }

    if (hour > 16) {
        return 3;
    }
}

export function setSesiNama(hour: number) {
    if (hour > 8 && hour < 12) {
        return 'Datang';
    }

    if (hour > 12 && hour < 13) {
        return 'Siang';
    }

    if (hour > 16) {
        return 'Pulang';
    }
}

