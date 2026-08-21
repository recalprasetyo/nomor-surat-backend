export interface ResponseType<T> {
  statusCode: number;
  message: string | string[];
  data?: T;
  timestamp: string;
  path: string;
}
