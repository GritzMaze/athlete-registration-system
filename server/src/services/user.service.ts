import { PrismaClient, Role, Users } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';
import { pick } from 'lodash';

// TODO: Maybe move this to a separate file
// in a folder called interfaces and split
// the interfaces by model-related
export interface UserCreateInput {
    username: string;
    password: string;
    role?: Role;
    email?: string;
    firstName?: string;
    lastName?: string;
}

export class UserService extends BaseDatabaseService<Users> {
  constructor(protected readonly prisma: PrismaClient = prismaService) {
    super(prisma);
  }

  async find(id: number): Promise<Users | null> {
    return await this.prisma.users.findUnique({
      where: {
        id
      }
    });
  }

  async findOrThrow(id: number): Promise<Users> {
    const user = await this.find(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async findManyByIds(ids: number[]): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }

  async findByUsername(username: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({
      where: {
        username
      }
    });
  }

  async create(data: UserCreateInput): Promise<Partial<Users>> {

    const toCreate = pick(data, ['username', 'password', 'email']);

    return await this.prisma.users.create({
      data: toCreate,
      select: {id: true, username: true, email: true, createdAt: true }
    },
    );
  }
}

export const userService = new UserService();