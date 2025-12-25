import { PrismaClient } from '@prisma/client';

// Singleton Prisma client instance
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Test database connection
export async function connectDatabase() {
  try {
    await prisma.$connect();

    // Determine database type from connection string
    const dbUrl = process.env.DATABASE_URL || '';
    const isSupabase = dbUrl.includes('supabase.com');
    const isLocal = dbUrl.includes('localhost');

    const dbType = isSupabase
      ? 'Supabase (Production)'
      : isLocal
        ? 'Local PostgreSQL'
        : 'Database';

    console.log(`[DATABASE] Connected successfully to ${dbType}`);
    console.log(
      `[DATABASE] Environment: ${process.env.NODE_ENV || 'development'}`,
    );

    // Test a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log('[DATABASE] Connection verified');

    return prisma;
  } catch (error) {
    console.error('[DATABASE] Failed to connect:', error);
    throw error;
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log('[DATABASE] Disconnected');
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});

export default prisma;
