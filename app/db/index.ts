import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();



if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;