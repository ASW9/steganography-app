export interface StegError {
    message: string;
    code: string;
  }
  
  export interface EncodeResponse {
    success: boolean;
    error?: StegError;
    imageUrl?: string;
  }
  
  export interface DecodeResponse {
    success: boolean;
    message?: string;
    error?: StegError;
  }