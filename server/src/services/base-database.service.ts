import { PrismaClient } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';

export interface CreateInput {
  [key: string]: any;
}

interface Filter {
  skip?: number;
  take?: number;
  orderBy?: any;
  where?: any;
  include?: any;
  select?: any;
}

interface QueryResult<TModel> {
  query: TModel[];
  count: number;
}

interface IBaseDatabaseService<TModel> {
  find(id: number): Promise<TModel | null>;
  findOrThrow(id: number): Promise<TModel>;
  findManyByIds(ids: number[]): Promise<TModel[]>;
  create(data: TModel): Promise<Partial<TModel>>;
  update(id: number, data: TModel): Promise<Partial<TModel>>;
  delete(id: number): Promise<Partial<TModel>>;
  findMany(): Promise<TModel[]>;
  count(): Promise<number>;
  exists(id: number): Promise<boolean>;
  existsWhere(where: any): Promise<boolean>;
  findAll({ skip, take, orderBy, where, include, select  } : Filter): Promise<QueryResult<TModel>>;
}

export abstract class BaseDatabaseService<TModel> implements IBaseDatabaseService<TModel> {
  protected prisma: PrismaClient;
  protected readonly _model;
  constructor(
    protected readonly model: any,
    protected readonly prismaPassed: PrismaClient = prismaService,
    ) {
    this.prisma = prismaPassed;
    this._model = model;
  }

  // TODO: This is supposed to omit fields like the user's password
  // as there is no way to omit it from the prisma query
  // Determine how to handle the types
  protected exclude<TModel, Key extends keyof TModel>(
    user: TModel,
    keys: Key[]
  ): Omit<TModel, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  public async find(id: number): Promise<TModel | null> {
    return await this._model.findUnique({
      where: {
        id
      }
    });
  }

  public async findOrThrow(id: number): Promise<TModel> {
    const model = await this.find(id);

    if (!model) {
      throw new Error(`Model with id ${id} not found`);
    }

    return model;
  }

  public async findManyByIds(ids: number[]): Promise<TModel[]> {
    return await this._model.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }

  public async create(data: TModel): Promise<Partial<TModel>> {
    return await this._model.create(data);
  }

  public async update(id: number, data: TModel): Promise<Partial<TModel>> {
    return await this._model.update({
      where: {
        id
      },
      data
    });
  }

  public async delete(id: number): Promise<Partial<TModel>> {
    return await this._model.delete({
      where: {
        id
      }
    });
  }

  public async findMany(): Promise<TModel[]> {
    return await this._model.findMany();
  }

  public async count(): Promise<number> {
    return await this._model.count();
  }

  public async exists(id: number): Promise<boolean> {
    return !!(await this.find(id));
  }

  public async existsWhere(where: any): Promise<boolean> {
    return !!(await this._model.findFirst({ where }));
  }

  public async findAll({ skip, take, orderBy, where, include, select  } : Filter): Promise<QueryResult<TModel>> {
    const query = await this._model.findMany({ skip, take, orderBy, where, include, select });
    const count = await this._model.count({ where });
    return { query, count };
  }

}
