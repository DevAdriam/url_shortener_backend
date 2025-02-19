interface IResponse<T> {
  _succes: boolean;
  _metadata: {
    version: string;
    timeStamp: string;
  };
  _data: T | null;
  _message: string;
}
