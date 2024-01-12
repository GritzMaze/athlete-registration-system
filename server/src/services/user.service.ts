import { PrismaClient, Role, Users } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService, CreateInput } from './base-database.service';
import { pick } from 'lodash';

// TODO: Maybe move this to a separate file
// in a folder called interfaces and split
// the interfaces by model-related
export interface UserCreateInput extends CreateInput {
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

  async findByUsername(username: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({
      where: {
        username
      }
    });
  }

  public override async create(data: UserCreateInput): Promise<Partial<Users>> {

    const toCreate = pick(data, ['username', 'password', 'email', 'firstName', 'lastName', 'role']);

    return await this.prisma.users.create({
      data: toCreate,
      select: {id: true, username: true, email: true, createdAt: true, role: true, firstName: true, lastName: true}
    },
    );
  }
}

export const userService = new UserService();