// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Product } from './product/product.entity';
import { DataSource } from 'typeorm';
// import { LoggingInterceptor } from './common/logging.interceptor';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  const productRepo = dataSource.getRepository(Product);

  const count = await productRepo.count();
  if (count === 0) {
    await productRepo.save([
      { name: 'หมอน', price: 250 },
      { name: 'ผ้าห่ม', price: 500 },
      { name: 'แก้วน้ำ', price: 120 },
    ]);
    console.log('✅ Seeded product data!');
  }

    // ใช้ Interceptors แบบ Global
    app.useGlobalInterceptors(
      // new LoggingInterceptor(),
      new TransformInterceptor(), // ⬅️ ตรงนี้คือ response wrapper
    );

  await app.listen(3000);
}
bootstrap();
