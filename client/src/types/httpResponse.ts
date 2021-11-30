export default interface HTTPResponse<T> {
  isOk: boolean;
  errorData?: {
    message: string;
    statusCode: number;
  };
  data?: T;
}
