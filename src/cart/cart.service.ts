import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToCart(body: { productId: number; quantity: number }) {
    const { productId, quantity } = body;

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error('Product not found');

    if (!Number.isInteger(quantity) || quantity <= 0) throw new Error('Quantity must be a positive integer');

    const cartItem = this.cartItemRepo.create({ product, quantity });
    return await this.cartItemRepo.save(cartItem);
  }

  async getCart() {
    const cartItems = await this.cartItemRepo.find({ relations: ['product'] });

    const result = cartItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: +item.product.price,
      totalPrice: +item.product.price * item.quantity,
    }));

    const totalQuantity = result.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = result.reduce((sum, item) => sum + item.totalPrice, 0);

    return {
      items: result,
      totalQuantity,
      totalPrice,
    };
  }

  async removeFromCart(id: number) {
    const result = await this.cartItemRepo.delete(id);
    if (result.affected === 0) throw new Error('Cart item not found');
    return { message: 'Item removed' };
  }

  // async onModuleInit() {  ใช้สำหรับ add data ตรงๆในนี้
  //   const count = await this.cartItemRepo.count();
  //   if (count === 0) {
  //     await this.cartItemRepo.insert([
  //       { productId: 1, quantity: 2 },
  //       { productId: 2, quantity: 1 },
  //     ]);
  //   }
  // }
}
