require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Testing doctor creation with Prisma 7...');
  try {
    const doctor = await prisma.doctor.create({
      data: {
        name: 'DR. TEST PRISMA 7',
        type: 'AUTO-REGISTRO'
      }
    });
    console.log('✅ Success! Doctor created:', doctor);
  } catch (error) {
    console.error('❌ Error during creation:', error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
