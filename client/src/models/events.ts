import { User } from './user';

export interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    managerId: number;
    }