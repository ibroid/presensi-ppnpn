import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'pdfmake/build/vfs_fonts';
import { useCallback } from "react";
import { LaporanResponse } from "../interfaces/IResponse";

pdfMake!.vfs = pdfFonts.pdfMake.vfs;

export type PresensiPdfProps = {
  data: LaporanResponse[],
  foto: string | undefined,
  periode: string,
  jabatan: string,
  nama: string
}

export default function usePresensiPdf() {
  const exportPdf = useCallback(async ({ data, foto, periode, jabatan, nama }: PresensiPdfProps) => {
    const filename = `LAPORAN KEGIATAN HARIAN ${periode} - ${jabatan} - ${nama}.pdf`

    pdfMake.createPdf({
      content: [
        {
          table: {
            headerRows: 1,
            widths: [50, '*', 60, '*'],
            body: [
              [
                {
                  text: "Periode"
                },
                {
                  text: `: ${periode}`,
                },
                {
                  text: "Pengelola"
                },
                {
                  text: ": Kepala Sub Bagian Kepegawaian, Organisasi, dan Tata Laksana"
                },
              ],
              [
                {
                  text: "Nama",
                },
                {
                  text: `: ${nama}`,
                },
                {
                  text: "Jabatan",
                },
                {
                  text: `: ${jabatan}`,
                },
              ]
            ]
          },
          layout: 'headerLineOnly',
          margin: [0, 10, 0, 0],
        },
        {
          table: {
            headerRows: 1,
            widths: [20, '*', 50, 70, 70, '*', 40],
            body: [
              [
                {
                  text: "No"
                },
                {
                  text: "Tanggal"
                },
                {
                  text: "Hari"
                },
                {
                  text: "Masuk"
                },
                {
                  text: "Pulang"
                },
                {
                  text: "Total"
                },
                {
                  text: "Ket"
                },
              ],
              ...data.map((item, index) => {
                return [
                  index + 1,
                  item.tanggal,
                  item.hari,
                  item.masuk,
                  item.pulang,
                  item.total,
                  item.ket
                ]
              })
            ]
          },
          alignment: 'center',
          margin: [0, 10, 0, 0],
          style: 'table1'
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                foto ? {
                  image: foto,
                  width: 100
                } : {
                  text: "Gagal Mendapatkan Foto",
                },
                {
                  alignment: 'left',
                  stack: [
                    "Kepala Sub Bagian Kepegawaian, Organisasi, dan Tata Laksana",
                    "Pengadilan Agama Jakarta Utara",
                    " ",
                    " ",
                    " ",
                    " ",
                    "Hiram Sulistio Sibarani, S.Kom.",
                    "NIP. 19770429.201101.1.005"
                  ]
                }
              ]
            ]
          },
          alignment: 'center',
          layout: 'noBorders',
          margin: [0, 50, 0, 0],
        }
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true
        },
        header_2: {
          fontSize: 16,
          bold: true
        },
        table1: {}
      },
      header: {
        margin: [0, 5, 0, 10],
        stack: [
          {
            text: 'LAPORAN KEGIATAN HARIAN PPNPN',
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 0]
          },
          {
            text: 'PENGADILAN AGAMA JAKARTA UTARA',
            style: 'header_2',
            alignment: 'center',
            margin: [0, 0, 0, 0]
          }
        ]
      }
    }).open();
  }, []);

  return { exportPdf };
}