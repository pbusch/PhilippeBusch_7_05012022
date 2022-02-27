export interface User {
  token: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  level?: number;
}
