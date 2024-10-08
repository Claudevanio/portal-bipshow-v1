import { AxiosRequestHeaders, AxiosResponseHeaders, ResponseType } from 'axios';

export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpClientInput<T> = {
  url: string;
  method: HttpMethod;
  params?: any;
  body?: T;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
};

export type HttpClientOutput<T> = {
  statusCode: HttpStatusCode;
  body: T;
  headers: AxiosResponseHeaders;
};
