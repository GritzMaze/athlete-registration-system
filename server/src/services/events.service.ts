import { Events, PrismaClient } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';
import { prisma } from './prisma.service';

export class EventsService extends BaseDatabaseService<Events> {

    constructor(prismaClient: PrismaClient = prisma) {
        super(prismaClient.events, prismaClient);
    }
}

export const eventsService = new EventsService();