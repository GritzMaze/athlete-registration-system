import { Registrations, TransactionStatus } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';
import { prisma } from './prisma.service';

class RegistrationService extends BaseDatabaseService<Registrations> {

    constructor() {
        super(prisma.registrations);
    }

    async confirm(id: number) {
        return await prisma.registrations.update({
            where: { id },
            data: { ParticipationFeeStatus: TransactionStatus.COMPLETED }
        });
    }
}

export const registrationService = new RegistrationService();