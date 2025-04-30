import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(body);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Delete(':id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeFromCart(id);
  }
}
