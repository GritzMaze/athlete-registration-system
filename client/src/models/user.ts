export enum Role {
    ATHLETE = 'ATHLETE',
    COACH = 'COACH',
    ADMIN = 'ADMIN'
}

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password?: string;
    Role?: Role;
    firstName?: string;
    lastName?: string;
    }