import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { isAfter, addHours } from 'date-fns';
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";


interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {

  public async execute({ token, password }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.')
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    //atualiza a senha
    user.password = await hash(password, 8);

    await usersRepository.save(user);

    console.log(user);

  }
}

export default ResetPasswordService;
