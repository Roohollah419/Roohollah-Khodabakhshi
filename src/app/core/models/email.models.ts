export interface EmailRequest {
  from_name: string;
  from_email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}
