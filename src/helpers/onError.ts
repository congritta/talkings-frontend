import {AxiosError} from "axios";
import consola from "consola";
import {createNotification} from "./notifications";
import {DateTime} from "luxon";

export default function onError(error: Error | AxiosError | unknown) {

  let errorMessage: string = `Неизвестная ошибка (${error})`;
  let errorCode: number | null = null;

  if(error instanceof Error)
  {errorMessage = error.message ?? String(error);}

  if(error instanceof AxiosError) {

    if(error.response) {
      errorCode = error.response.status;

      // Here is getting error message from server
      errorMessage = error.response.data;
    }
    else {
      errorMessage = error.message;
    }
  }

  consola.error(error);
  createNotification({
    status: "error",
    expireDate: DateTime.now().plus({seconds: 5}).toISO(),
    title: `Error${errorCode ? ` #${errorCode}` : ""}`,
    description: errorMessage
  });
}
