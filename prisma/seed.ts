import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[SEED] Starting database seed...');

  // Seed Provinces (Canadian Provinces and Territories)
  const provinces = [
    { id: 'AB', name: 'Alberta' },
    { id: 'BC', name: 'British Columbia' },
    { id: 'MB', name: 'Manitoba' },
    { id: 'NB', name: 'New Brunswick' },
    { id: 'NL', name: 'Newfoundland and Labrador' },
    { id: 'NS', name: 'Nova Scotia' },
    { id: 'ON', name: 'Ontario' },
    { id: 'PE', name: 'Prince Edward Island' },
    { id: 'QC', name: 'Quebec' },
    { id: 'SK', name: 'Saskatchewan' },
    { id: 'NT', name: 'Northwest Territories' },
    { id: 'NU', name: 'Nunavut' },
    { id: 'YT', name: 'Yukon' },
  ];

  console.log('[SEED] Seeding provinces...');
  for (const province of provinces) {
    await prisma.province.upsert({
      where: { id: province.id },
      update: {},
      create: province,
    });
  }
  console.log('[SEED] Provinces seeded successfully');

  // Seed Plans
  const plans = [
    {
      id: 1,
      price: 0,
      features: {
        history_days: 7,
        refresh: false,
        logins_number: 1,
      },
    },
    {
      id: 2,
      price: 999,
      features: {
        history_days: 30,
        refresh: true,
        logins_number: 3,
      },
    },
    {
      id: 3,
      price: 2999,
      features: {
        history_days: 90,
        refresh: true,
        logins_number: 10,
      },
    },
  ];

  console.log('[SEED] Seeding plans...');
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.id },
      update: {},
      create: plan,
    });
  }
  console.log('[SEED] Plans seeded successfully');

  console.log('[SEED] Database seeding completed');
}

main()
  .catch((e) => {
    console.error('[SEED] Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
