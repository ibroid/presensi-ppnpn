import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import 'pdfmake/build/vfs_fonts';
import { useCallback } from "react";
import { LaporanActivityResponse } from "../interfaces/IResponse";

pdfMake!.vfs = pdfFonts.pdfMake.vfs;

export type ActivityPdfProps = {
  data: LaporanActivityResponse[],
  foto: string | undefined,
  periode: string,
  jabatan: string,
  nama: string
}

export default function useActivityPdf() {
  const exportPdf = useCallback(async ({ data, foto, periode, jabatan, nama }: ActivityPdfProps) => {
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
                  text: ": Kepala Sub Bagian Umum dan Keuangan"
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
            widths: [20, '*', 50, '*', '*', '*', 30],
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
                  text: "Kegiatan"
                },
                {
                  text: "Waktu"
                },
                {
                  text: "Catatan"
                },
                {
                  text: "Ket"
                },
              ],
              ...data.map((item, i) => {
                return [
                  {
                    text: item.no
                  },
                  {
                    text: item.tanggal
                  },
                  {
                    text: item.hari
                  },
                  {
                    alignment: 'left',
                    stack: [
                      {
                        ul: item.kegiatan.length > 0 ? item.kegiatan?.map((k, i) => {
                          return {
                            text: k.doing
                          }
                        }) : []
                      }
                    ]
                  },
                  {
                    alignment: 'left',
                    stack: [
                      {
                        ul: item.kegiatan.length > 0 ? item.kegiatan?.map((k, i) => {
                          return {
                            text: k.doing_time
                          }
                        }) : []
                      }
                    ]
                  },
                  {
                    alignment: 'left',
                    stack: [
                      {
                        ul: item.kegiatan.length > 0 ? item.kegiatan?.map((k, i) => {
                          return {
                            text: k.note
                          }
                        }) : []
                      }
                    ]
                  },
                  {
                    text: item.keterangan
                  },
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
                    "Kepala Sub Bagian Umum dan Keuangan",
                    "Pengadilan Agama Jakarta Utara",
                    " ",
                    " ",
                    " ",
                    " ",
                    "Riska Mizalfi, S.Kom., M.H.",
                    "NIP. 19840218.200912.2.003"
                  ]
                }
              ]
            ]
          },
          alignment: 'center',
          layout: 'noBorders',
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
    }).download(`LAPORAN KEGIATAN HARIAN ${periode} - ${jabatan} - ${nama}.pdf`);
  }, []);


  return { exportPdf }
}