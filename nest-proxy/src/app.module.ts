import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module'; // CRUD module 
@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // makes env vars accessible everywhere
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
