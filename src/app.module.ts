import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      BooksModule,
      OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
