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

const RANDOM_IMAGES = [
  'https://media.yourschoolgames.com/images/Athletics_1.width-550.jpg',
  'https://thumbs.dreamstime.com/b/athletics-hurdle-jumping-summer-games-icon-set-d-isometric-athlete-olympics-sporting-championship-international-athletics-73533390.jpg',
  'https://images.ctfassets.net/hnk2vsx53n6l/5b1youyakrZOR43viEgDGx/7fbada0bdd5bc8f29a9121e1da1dbf16/OAC_Page_Update_October_2021_Cover_2880x1230px.jpeg?fm=webp',
  'https://nordicsport.com.au/cdn/shop/files/nordic-mainbanner1_1800x.jpg?v=1640152414',
  'https://www.tdk.com/tdkcorpdr/jp/athletic/img/wca_tdk/image01.jpg',
  'https://www.qldathletics.org.au/qlda/includes/themes/MuraBootstrap3/assets/new_assets/img/membership/2023%20Boys%20Sprint%20Nats.jpg',
  'https://images.twinkl.co.uk/tr/image/upload/illustation/Baton-Exchange-Relay-Running--Athletics-Twinkl-Move-PE.png',
  'https://i.ytimg.com/vi/x8U8-HKFadk/maxresdefault.jpg',
  'https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/2023/05/06003805/World-Athletics-Day-2023.png'
]

async function main() {
  const user = {
    email: 'admin@admin.net',
    password: 'admin',
    role: Role.ADMIN,
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
        image: RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)],
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
