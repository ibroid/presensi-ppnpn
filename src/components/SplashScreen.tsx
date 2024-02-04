import { IonApp, IonContent, IonPage, IonText } from "@ionic/react";
import "../global.css";
import { App } from '@capacitor/app';
import { useEffect, useState } from "react";

export default function SplashScreen(
  { error: errorCheckVersion, errorMessage: errorCheckVersionMessage }:
    { error: boolean, errorMessage: string }) {

  useEffect(() => {
    if (errorCheckVersion) {
      setTimeout(async () => {
        try {
          await App.exitApp();
        } catch (error) {

        }
      }, 5000);
    }
  }, [errorCheckVersion])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <img
          style={{ borderRadius: "20%", boxShadow: "1px 2px 10px #fff" }}
          width={100}
          src={require("../assets/images/icon.png")}
          alt="logo"
        />
      </div>
      <div>
        <IonText className="ion-text-center" style={{ fontFamily: "Rubik" }}>
          {
            !errorCheckVersion ? <p>Memeriksa Versi Aplikasi ...</p> : <p>Terjadi Kesalahan : {errorCheckVersionMessage}.<br /> Aplikasi akan ditutup</p>
          }
        </IonText>
      </div>
    </div>
  );
}
