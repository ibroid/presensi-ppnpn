import { useCallback, useEffect, useState } from "react";
import { httpInstance } from "../utils/HttpClient";
import { Preferences } from "@capacitor/preferences";

export default function useImageToBase64() {
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);

  const fetchImage = useCallback(async () => {
    try {
      const { value } = await Preferences.get({ key: 'token' });
      const response = await httpInstance(value).get("/employee/picture");
      setImageBase64(response.data.base64Img);

    } catch (error: any) {
    }
  }, [])

  useEffect(() => {
    fetchImage();
  }, [fetchImage])

  return { imageBase64 };
}