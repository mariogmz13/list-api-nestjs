import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from './schemas/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }])
  ],
  providers: [ActivitiesService,],
  controllers: [ActivitiesController],
  // exports: [ActivitiesService]
})
export class ActivitiesModule {}
