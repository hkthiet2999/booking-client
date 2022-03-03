export interface ILoginResponse {
  user: {
    id: string;
    role: string;
  };
  access_token: string;
}
