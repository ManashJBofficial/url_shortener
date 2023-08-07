import { PrismaClient } from "@prisma/client";

// Define a custom global object with the prisma property
interface CustomGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Use a type assertion to extend globalThis with the custom global object
declare const global: CustomGlobal;

let prisma: PrismaClient;

// Check if Prisma Client is defined, otherwise create a new instance
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
