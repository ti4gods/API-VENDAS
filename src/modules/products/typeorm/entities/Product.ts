import OrderProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products') //Referncia a tabela criada
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; //uuid

  @OneToMany(() => OrderProducts, order_products => order_products.product)
  order_products: OrderProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
