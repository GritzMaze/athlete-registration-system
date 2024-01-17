import { Users } from '@prisma/client';
import { jwtService } from './jwt.service';
import { UserCreateInput, userService } from '.';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { DuplicatedUsernameError } from './errors/duplicated-user.error';
import { InvalidCredentialsError, UserNotExistError } from './errors';

export class AuthService {
  async login(user: Users): Promise<string> {
    const serverUser = await userService.findByUsername(user.username);

    if (!serverUser) {
      throw new UserNotExistError('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(user.password, serverUser.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const payload = { 
      user: {
        username: user.username,
        id: serverUser.id,
        email: serverUser.email,
        role: serverUser.role
    }
  };

    return await jwtService.sign(payload);
  }

  async validateUser(payload: any): Promise<any> {
    return await userService.find(payload.id);
  }

  async register(user: UserCreateInput): Promise<Partial<Users>> {
    const existingUser = await userService.findByUsername(user.username);

    if (existingUser) {
      throw new DuplicatedUsernameError('Username already exists');
    }
    const saltRounds = config.get('bcrypt.saltRounds');
    const toRegister = { ...user };
    toRegister.password = await bcrypt.hash(user.password, saltRounds);

    return await userService.create(toRegister);
  }
}

export const authService = new AuthService();