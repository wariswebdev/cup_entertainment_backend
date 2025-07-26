import { PrismaClient } from '../../generated/prisma';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
