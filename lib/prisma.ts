import { PrismaClient } from '@prisma/client';

//apsauga kad development rezime neprikurt daug prisma clientu
const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

// jei klientas sukurtas naudojam esama
// kitu atveju sukuriam nauja
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
