import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
