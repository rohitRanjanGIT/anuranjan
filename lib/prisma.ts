import { PrismaClient } from "@/lib/generated/prisma";

/**
 * Prisma client singleton.
 *
 * In development, the client is cached on `globalThis` so that
 * hot-module-reloading doesn't create a new instance every time.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
