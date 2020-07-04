export interface User {
  email: string;
  password: string;
  gender: string;
  lastName: string;
  firstName: string;
  children: [string];
  emailNotification: boolean;
  id?: number;
  roles: [string];
}
