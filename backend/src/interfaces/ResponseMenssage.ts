export interface ResponseMessage {
  message: string;
  detalles?: any;
}

export interface ResponseMessageWithToken extends ResponseMessage {
  token?: string;
}
