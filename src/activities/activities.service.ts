import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {

    constructor(
        @InjectModel('Activity') private activityModel: Model<Activity>,
      ) {}
    
      async create(activity: Activity): Promise<Activity> {
        const newActivity = new this.activityModel(activity);
        return newActivity.save();
      }
    
      async getAll(): Promise<Activity[]> {
        return this.activityModel.find().exec();
      }
    
      async getById(id: string): Promise<Activity | null> {
        const activity = await this.activityModel.findById(id).exec();
        if (!activity) {
          throw new NotFoundException(`Actividad con ID ${id} no encontrado`);
        }
        return activity;
      }
    
      async update(id: string, activity: Activity): Promise<Activity | null> {
        const updatedActivity = await this.activityModel.findByIdAndUpdate(id, activity, { new: true }).exec();
        if (!updatedActivity) {
          throw new NotFoundException(`Actividad con ID ${id} no encontrado`);
        }
        return updatedActivity;
      }
    
      async delete(id: string): Promise<void> {
        const result = await this.activityModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException(`Actividad con ID ${id} no encontrado`);
        }
      }

}
