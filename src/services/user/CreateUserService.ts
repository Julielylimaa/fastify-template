import { CreateUserDto, CreateUserData } from "@interfaces/user/ICreateUser";
import { CreateUserRepository } from "@repositories/user/CreateUserRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";
import { HTTPError } from "@config/errors";

export class CreateUserService {
  private createUserRepository: CreateUserRepository;
  private getUserRepository: GetUserRepository;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserRepository: GetUserRepository
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserRepository = getUserRepository;
  }

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.getUserRepository.getByUsername(
      createUserDto.username
    );

    if (existingUser) {
      throw new HTTPError(409, "User with this username already exists");
    }

    const userData: CreateUserData = {
      ...createUserDto,
    };

    return this.createUserRepository.execute(userData);
  }
}
