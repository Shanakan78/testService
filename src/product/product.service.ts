import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async getAll() {
    return await this.productRepo.find();
  }
}


// async onModuleInit() {
//     const count = await this.repo.count();
//     if (count === 0) {
//       await this.repo.save([
//         { name: 'Keyboard', price: 1000 },
//         { name: 'Mouse', price: 500 },
//         { name: 'Monitor', price: 7000 },
//       ]);
//     }
//   }

  