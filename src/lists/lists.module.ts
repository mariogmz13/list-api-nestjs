import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schemas/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'lists', schema: ListSchema }])],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
