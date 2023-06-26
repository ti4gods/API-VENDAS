import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {

  //DESESTRUTURANDO: {name, email }: IRequest
  public async execute({ name, email }: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email addres already used.');
    }

    const customer = customerRepository.create({
      name,
      email
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
