import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import Customer from "@modules/customers/typeorm/entities/Customer";
import OrderProducts from "./OrdersProducts";

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //1 cliente pode estar relacionado a muitos pedidos
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrderProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
};

export default Order;