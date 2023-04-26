export interface CommonResponse {
  status?: "success" | "error";
  statusCode: number;
  message?: string;
  data?: any;
}