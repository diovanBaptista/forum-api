import { User as PrismaUser } from 'generated/prisma';

export class User implements PrismaUser {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}