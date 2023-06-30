import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/entities/repositories/OrderRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {

  public async execute({ customer_id, products }: IRequest): Promise<Order> {

    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.')
    };

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.')
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const chackInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    );

    if (chackInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${chackInexistentProducts[0].id}`
      );
    }


  }
}

export default CreateOrderService;
