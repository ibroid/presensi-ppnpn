import { useCallback, useEffect, useState } from "react";
import { httpInstance } from "../utils/HttpClient";
import { Preferences } from "@capacitor/preferences";

export default function useImageToBase64(manual?: boolean) {
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);

  const fetchImage = useCallback(async (employee_id?: number) => {
    try {
      const { value } = await Preferences.get({ key: 'token' });
      const response = await httpInstance(value).post("/employee/picture",
        employee_id ? { employee_id } : {}
      );
      setImageBase64(response.data.base64Img);

    } catch (error: any) {
    }
  }, [])

  useEffect(() => {
    if (!manual) {
      fetchImage();
    }
  }, [fetchImage, manual])

  return { imageBase64, fetchImage };
}