import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonLoading, IonModal, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonToast, useIonLoading, useIonToast } from "@ionic/react";
import { useCallback, useState } from "react";
import { Activity } from "../interfaces/IResponse";
import { useForm } from "react-hook-form";
import { httpInstance } from "../utils/HttpClient";
import { AxiosError } from "axios";
import { closeSharp } from "ionicons/icons";
import { ActivityModel } from "../interfaces/IHooks";
import useCreateActivity from "../hooks/useCreateActivity";


export type ModalActivityProps = {
  isOpen: boolean
  close: () => void
  saveCallback?: (data: ActivityModel) => void
}

export default function ModalActivity({ isOpen, close, saveCallback }: ModalActivityProps) {
  const { handleSubmit, formState: { errors }, register, reset } = useForm<ActivityModel>();

  const { createActivity, postError, postErrorMessage, postLoading, postResponse } = useCreateActivity(() => {
    reset()
    saveCallback && saveCallback(postResponse)
  })


  return (
    <IonModal
      backdropDismiss={false}
      isOpen={isOpen}
      style={{ "--height": "50%", "--width": "80%" }}>
      <IonGrid className="ion-no-padding ion-no-margin">
        <IonRow>
          <IonCol className="ion-text-center">
            <IonText>Form Isian Aktivitas</IonText>
          </IonCol>
          <IonCol size="auto" className="ion-text-end">
            <IonButton onClick={close} fill="clear">
              <IonIcon color="skyblue" icon={closeSharp} />
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-margin ion-padding justify-content-center align-items-center">
          <IonCol>
            <form onSubmit={handleSubmit(createActivity)} style={{ alignItems: "center" }}>
              <IonSelect
                className="ion-invalid ion-touched"
                label="Aktivitas :"
                interface="alert"
                labelPlacement="floating"
                fill="outline"
                shape="round"
                {...register("doing", { required: "Tidak Boleh Kosong" })} >
                <IonSelectOption >Mengepel</IonSelectOption>
                <IonSelectOption >Menyapu</IonSelectOption>
                <IonSelectOption >Mengelap</IonSelectOption>
                <IonSelectOption >Membuang Sampah</IonSelectOption>
              </IonSelect>
              <IonInput
                className="ion-invalid ion-touched"
                label="Waktu :"
                type="time"
                labelPlacement="floating"
                fill="outline"
                errorText={errors.doing_time?.message}
                shape="round"
                {...register("doing_time", { required: "Tidak Boleh Kosong" })} />
              <IonTextarea
                className="ion-margin-top ion-invalid ion-touched ion-margin-bottom"
                labelPlacement="floating"
                fill="outline"
                shape="round"
                errorText={errors.note?.message}
                placeholder="Isi dengan nama ruangan "
                label="Catatan" {...register("note", { required: "Tidak Boleh Kosong" })} />
              <IonButton color={"skyblue"} expand="full" shape="round" type="submit">Simpan Aktivitas</IonButton>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonLoading isOpen={postLoading} message="Mengirim data..." />
      <IonToast isOpen={postError} message={postErrorMessage} color={"danger"} duration={5000}></IonToast>

    </IonModal >
  )

}