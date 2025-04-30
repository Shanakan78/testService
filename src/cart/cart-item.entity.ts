import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
//   import { Product } from './product.entity';
  import { Product } from '../product/product.entity';
  
  @Entity()
  export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    productId: number;
  
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
  
    @Column()
    quantity: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  