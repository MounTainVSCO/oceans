import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Check if test user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (existingUser) {
    console.log('✅ Test user already exists');
    return;
  }

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      isPro: false,
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create a sample site
  const site = await prisma.site.create({
    data: {
      name: 'My Portfolio',
      slug: 'my-portfolio',
      userId: user.id,
      isPublic: true,
    },
  });

  console.log('✅ Created sample site:', site.name);
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
