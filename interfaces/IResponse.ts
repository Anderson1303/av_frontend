export type TPagination = {
  itemsPerPage: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export type TError = {
  code: number;
  message: string;
}

export type TMessage = {
  index: number;
  message: string;
}

export interface IResponse<T> {
  error?: TError;
  messages?: TMessage[];
  success: boolean;
  pagination?: TPagination;
  data?: T;
}

export type TResponse = { [key: string]: string }