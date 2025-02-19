import { PrismaClient } from "@prisma/client";
import LOGGER from "../../config/logger/winston";

const prisma: PrismaClient = new PrismaClient();

export async function verifyConnection() {
  try {
    await prisma.$connect();
    LOGGER.info("Successfully conntected to prisma 🚀");
  } catch (error) {
    await prisma.$disconnect();
    LOGGER.error("Failed to connect prisma 😞");
  }
}

export default prisma;
