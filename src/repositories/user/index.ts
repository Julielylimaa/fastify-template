import prisma from "@config/postgres";
import { CreateUserRepository } from "@repositories/user/CreateUserRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";
import { ListUserRepository } from "@repositories/user/ListUserRepository";
import { UpdateUserRepository } from "./UpdateUserRepository";

export const createUserRepository = new CreateUserRepository(prisma);
export const getUserRepository = new GetUserRepository(prisma);
export const listUserRepository = new ListUserRepository(prisma);
export const updateUserRepository = new UpdateUserRepository(prisma);
