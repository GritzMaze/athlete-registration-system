import { Documents } from '@prisma/client';
import { BaseDatabaseService } from '.';
import { prisma } from './prisma.service';

class DocumentsService extends BaseDatabaseService<Documents> {
    constructor() {
        super(prisma.documents);
    }
}

export const documentsService = new DocumentsService();