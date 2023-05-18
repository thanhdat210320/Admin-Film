export interface SignInParams {
  username: string;
  password: string;
}
export interface UserParams {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginResponse{
  expiresIn: string,
  accessToken: string,
  expiresInRefresh: string,
  refreshToken: string,
}

export interface Error{
  status: string,
  statusCode: number,
  time: string,
  message: string
}
