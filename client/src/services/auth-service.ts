import jwtDecode from 'jwt-decode';
import { UserStorage } from './user-storage-service';
import { httpService, HttpError } from './http.service';
import { User } from '../models';

interface LoginResponse {
  token: string;
}

type AuthHandler = (user: User | undefined) => void;

class AuthService {
  private handler: AuthHandler | undefined = undefined;

  private userStorage = new UserStorage();

  constructor() {
    httpService.authErrorHandler = () => this.setToken(undefined);
  }

  private setToken(token: string | undefined) {
    if (!token) {
      this.userStorage.token = undefined;
      this.handler?.(undefined);
      return;
    }

    this.userStorage.token = token;

    const decodedUser = jwtDecode<{ user: User }>(token).user;
    this.handler?.(decodedUser);
  }

  get currentUser() {
    const token = this.userStorage.token;

    if (!token) {
      return undefined;
    }

    return jwtDecode<{ user: User }>(token).user;
  }

  setHandler(handler: AuthHandler | undefined) {
    this.handler = handler;
  }

  async login(user: User) {
    try {
      const { token } = await httpService.post<LoginResponse>('/login', {
        body: user
      });

      this.setToken(token);

      return token;
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        throw new Error('Invalid auth code');
      }

      throw error;
    }
  }

  async register(user: User) {
    const { token } = await httpService.post<LoginResponse>('/register', {
      body: user
    });

    this.setToken(token);

    return token;
  }

  logout() {
    this.setToken(undefined);
  }
}

export const authService = new AuthService();
