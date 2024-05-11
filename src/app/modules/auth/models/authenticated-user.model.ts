import { User } from './user.model';

export interface AuthenticatedUser {
  token: string;
  user: User;
}
