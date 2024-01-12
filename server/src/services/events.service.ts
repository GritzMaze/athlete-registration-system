import { Events } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';
import { prisma } from './prisma.service';

class EventsService extends BaseDatabaseService<Events> {

    constructor() {
        super(prisma.events);
    }
}

export const eventsService = new EventsService();