import { Events, PrismaClient } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';
import { prisma } from './prisma.service';

export class EventsService extends BaseDatabaseService<Events> {

    constructor(prismaClient: PrismaClient = prisma) {
        super(prismaClient.events, prismaClient);
    }

    getRegistrations(id: number) {
        return this.prisma.events.findUnique({
            where: {
                id: id
            },
            include: {
                Registrations: true
            }
        });
    }
}

export const eventsService = new EventsService();