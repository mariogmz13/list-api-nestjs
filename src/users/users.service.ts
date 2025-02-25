import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
            @InjectModel('User') private userModel: Model<User>,
          ) {}
        
          async create(user: User): Promise<User> {
            const newUser = new this.userModel(user);
            return newUser.save();
          }
        
          async getAll(): Promise<User[]> {
            return this.userModel.find().exec();
          }
        
          async getById(id: string): Promise<User | null> {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return user;
          }
        
          async update(id: string, user: User): Promise<User | null> {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
            if (!updatedUser) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return updatedUser;
          }
        
          async delete(id: string): Promise<void> {
            const result = await this.userModel.findByIdAndDelete(id).exec();
            if (!result) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
          }
    

}
