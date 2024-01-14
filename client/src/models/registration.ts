import dayjs from 'dayjs';
import { TransactionStatus } from './transaction-status';

export interface Registration {
    id?: number;
    email: string;
    name: string;
    birthDate: dayjs.Dayjs;
    gender: string;
    country: string;
    federation: string;
    events: string[];
    participationFeeStatus: TransactionStatus;
    club?: string;
    eventId?: number;
    userId?: number;
    createdAt: string;
    updatedAt: string;
}