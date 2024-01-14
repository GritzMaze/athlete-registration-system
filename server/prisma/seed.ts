import { PrismaClient, Role } from '@prisma/client';
import { EventsService, authService } from '../src/services';

const prisma = new PrismaClient();

const RANDOM_LOCATIONS = [
    'Sofia, Bulgaria',
    'Plovdiv, Bulgaria',
    'Berlin, Germany',
    'London, UK',
    'Paris, France',
    'New York, USA',
    'San Francisco, USA',
    'Los Angeles, USA',
    'Tokyo, Japan',
    'Osaka, Japan',
    'Barcelona, Spain',
    'Madrid, Spain',
    'Rome, Italy',
    'Milan, Italy',
];

const RANDOM_NAMES = [
    'Elan Meeting',
    '54 International Athletics Meeting - Akaddemik',
    'International Meeting - Dobrich',
    'IFAM Indoor - Gent',
    'Meeting Elite en Salle - Miramas',
    'Meeting de Paris - Paris',
    'Meeting de Madrid - Madrid',
    'Meeting de Marseille - Marseille',
    'Meeting de Montreuil - Montreuil',
    'World Athletics Continental Tour - Szekesfehervar',
    'World Athletics Continental Tour - Turku',
    'World Indoor Tour - Boston',
    'World Indoor Tour - Lievin',
    'World Indoor Tour - Madrid'
];

async function main() {
  const user = {
    email: 'admin@admin.net',
    password: 'admin',
    role: Role.MANAGER,
    firstName: 'Admin',
    lastName: 'Admin',
    username: 'admin'
  };

const eventsService = new EventsService(prisma);
const createdUser = await authService.register(user);

  Array.from({ length: 50 }).forEach(async () => {
   const event = {
        name: RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)],
        location: RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)],
        date: new Date(),
        participationFee: Math.random() * 100,
        managerId: createdUser.id || 1
        };
    
        await eventsService.create(event);
   });
}

main()
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
