import { useCallback } from "react";

export default function PresenceToday() {
  // const fetchPresensi = useCallback(async (selectedDate: string) => {
  //   abortController = new AbortController()
  //   const signal = abortController.signal;

  //   httpInstance(state.token).get<Presence[]>("/presence?date=" + selectedDate, { signal })
  //     .then((res) => {
  //       if (res.data.length === 0) {
  //         setDataPresensiDatang(undefined)
  //         setDataPresensiPulang(undefined)
  //         return;
  //       }

  //       res.data.forEach((presensi) => {
  //         if (presensi.session === 1) {
  //           setDataPresensiDatang(presensi)
  //         } else {
  //           setDataPresensiPulang(presensi)
  //         }
  //       })
  //     })
  //     .catch((err: any) => {
  //       if (err.code === "ERR_CANCELED") {
  //         return;
  //       }
  //       let errorMessage: string = ""
  //       if (err instanceof AxiosError && err.isAxiosError) {
  //         errorMessage = err.response?.data.message ?? err.response?.data.error.message;
  //       } else {
  //         errorMessage = err.message;
  //       }

  //       toast({
  //         message: errorMessage,
  //         duration: 5000,
  //         color: 'danger',
  //         buttons: [
  //           {
  //             text: "Tutup",
  //             role: "cancel",
  //           }
  //         ]
  //       })
  //     })

  // }, [])
}