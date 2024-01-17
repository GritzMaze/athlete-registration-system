export enum Role {
    ATHLETE = 'ATHLETE',
    COACH = 'COACH',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
}

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    }