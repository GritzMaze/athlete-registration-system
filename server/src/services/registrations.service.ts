import { Registrations } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';
import { prisma } from './prisma.service';

class RegistrationService extends BaseDatabaseService<Registrations> {

    constructor() {
        super(prisma.registrations);
    }
}

export const registrationService = new RegistrationService();