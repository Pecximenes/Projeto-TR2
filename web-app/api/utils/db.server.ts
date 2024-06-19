import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

function initializePrismaClient() {
  if (!globalThis.__db) {
    globalThis.__db = new PrismaClient();
  }

  db = globalThis.__db;
}

initializePrismaClient();

export { db };
