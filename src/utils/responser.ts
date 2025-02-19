import { IResponse } from "./types/response.format";

export default function Responser<T>({
  status,
  message,
  data,
}: {
  status: number;
  message: string;
  data: T;
}): IResponse<T> {
  return {
    _succes: status >= 200 && status < 300 ? true : false,
    _data: data,
    _message: message,
    _metadata: {
      timeStamp: new Date().toISOString(),
      version: process.env.API_VERSION || "v1",
    },
  };
}
