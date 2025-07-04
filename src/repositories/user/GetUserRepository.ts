import { PrismaClient } from "@prisma/client";

export class GetUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
